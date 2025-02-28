import { Character } from './character.js';
import { TheAlgorithm } from './the-algorithm.js';
import { buildStatScreen } from './stats-ui.js';

import { CombatScreen } from './combat-screen.js';
import { CaveInScreen } from './cave-in-screen.js';
import { DeathRebirthScreen } from './death-rebirth-screen.js';
import { StoryScreen, StoryScreenType } from './story-screen.js';

import { TheBeast } from './creatures/the-beast.js';

// The Game
class Game {
  constructor() {
    // One-time initialization of DOM references
    this.screensContainer = document.getElementById('screens-container');
    this.trapContainer = document.getElementById('trap-container');
    this.statsOverlay = document.getElementById('stats-overlay');
    
    // Setup event listeners (only needs to happen once)
    this.setupEventListeners();
    
    // Initialize/reset game state
    this.reset();

    // Hack out the fade-in transition the first time the player starts the game
    this.screens[0].elem.style.transition = '';
    this.screens[0].elem.offsetHeight; // Force reflow to ensure the transition takes effect
    this.screens[0].elem.style.opacity = '1';
    this.setCooldown(0);
  }

  // Reset/initialize all game state
  reset() {
    // Create a new player character
    this.player = new Character();
    
    // Create a new algorithm instance
    this.algorithm = new TheAlgorithm();
    
    // Reset game state flags
    this.paused = false;
    this.screens = [];
    this.currentScreenIndex = 0;
    this.isScrolling = false;
    this.isTrapped = false;
    this.inCooldown = false;
    this.isRebirthing = false;
    this.rebirthScreenLevel = 0;
    
    // Create a new beast
    this.theBeast = new TheBeast();
    
    // Reset container position without animation
    const originalTransition = this.screensContainer.style.transition;
    this.screensContainer.style.transition = 'none';
    this.screensContainer.style.transform = 'translateY(0)';
    this.screensContainer.offsetHeight; // Force reflow to ensure the transition removal takes effect
    this.screensContainer.style.transition = originalTransition;
    
    // Clear containers
    this.screensContainer.innerHTML = '';
    this.trapContainer.innerHTML = '';
    
    // Create and play first screen
    const firstScreen = this.createNewScreen(0);
    if (firstScreen) {
      this.screens.push(firstScreen);
      
      // Add fade-in effect for the first screen
      firstScreen.elem.style.transition = 'opacity 750ms ease-in';
      firstScreen.elem.style.opacity = '0';
      firstScreen.elem.offsetHeight; // Force reflow to ensure the transition takes effect
      firstScreen.elem.style.opacity = '1';
      
      // Disable input during (most of) the fade-in animation
      this.setCooldown(550);
      
      // Play the screen
      firstScreen.screen.play();
    }
    
    console.log('Game initialized/reset');
    return this;
  }

  // Utility to get the stored screen object at index (or null if none).
  getScreenObj(index) {
    return this.screens.find(s => s.index === index) || null;
  }

  // Moves the screens-container to show currentScreenIndex.
  updateScreenPositions() {
    // Update each screen's position
    this.screens.forEach(({ elem, index }) => {
      elem.style.top = `${index * 100}%`;
    });
    
    // Set the scrolling flag at the start of any transition
    this.isScrolling = true;
    
    // Determine the transition type based on player health
    if (this.player.stats.health <= 0 && !this.isTrapped) {
      // Player is critically wounded - use crawling animation
      this.performCrawlingTransition();
    } else {
      // Player has positive health or we're forcing normal transition
      this.performNormalTransition();
    }
  }
  
  // Normal smooth transition for healthy player
  performNormalTransition() {
    // Apply smooth transition
    this.screensContainer.style.transition = 'transform 0.25s ease-in-out';
    this.screensContainer.style.transform = `translateY(-${this.currentScreenIndex * 100}%)`;

    // Add transition end listener
    const onTransitionEnd = () => {
      this.isScrolling = false;
      this.screensContainer.removeEventListener('transitionend', onTransitionEnd);
    };
    this.screensContainer.addEventListener('transitionend', onTransitionEnd);
  }
  
  // Crawling animation for critically wounded player
  performCrawlingTransition() {
    // Calculate positions
    const targetY = -this.currentScreenIndex * 100;
    let startY = 0;
    
    // Extract current position if it exists
    const currentTransform = this.screensContainer.style.transform;
    if (currentTransform && currentTransform.includes('translateY(')) {
      const match = currentTransform.match(/translateY\((-?\d+(?:\.\d+)?)%\)/);
      if (match && match[1]) {
        startY = parseFloat(match[1]);
      }
    }
    
    const totalDistance = targetY - startY;
    const keyframes = `
      @keyframes crawlTransition {
        0% { transform: translateY(${startY}%); animation-timing-function: ease-in-out; }
        33% { transform: translateY(${startY + totalDistance * 0.33}%); animation-timing-function: ease-in-out; }
        67% { transform: translateY(${startY + totalDistance * 0.67}%); animation-timing-function: ease-in-out; }
        100% { transform: translateY(${targetY}%); animation-timing-function: ease-in-out; }
      }
    `;
    let styleElem = document.getElementById('crawl-animation-style');
    if (!styleElem) {
      styleElem = document.createElement('style');
      styleElem.id = 'crawl-animation-style';
      document.head.appendChild(styleElem);
    }
    styleElem.textContent = keyframes;
    
    this.screensContainer.style.transition = 'none';
    this.screensContainer.offsetHeight; // Force a reflow before applying animation
    this.screensContainer.style.animation = 'crawlTransition 1.25s';
    
    // When animation ends, reset and update state
    const onAnimationEnd = () => {
      this.screensContainer.removeEventListener('animationend', onAnimationEnd);
      
      // Remove the animation and set the final transform directly
      this.screensContainer.style.animation = '';
      this.screensContainer.style.transform = `translateY(${targetY}%)`;
      
      // Update scrolling state
      this.isScrolling = false;
    };
    
    this.screensContainer.addEventListener('animationend', onAnimationEnd);
  }

  // Creates and returns a new screen object at the given index
  createNewScreen(index) {
    if (index < 0) return null;

    // Create a new DOM element
    const elem = document.createElement('div');
    elem.classList.add('game-screen');
    elem.style.top = `${index * 100}%`;
    // Random border color for debug purposes
    // elem.style.border = `5px solid #222`;
    // elem.style.boxSizing = 'border-box';
    // elem.style.overflow = 'hidden';
    //
    this.screensContainer.appendChild(elem);

    // For index 0 (first screen), create a title screen
    if (index === 0) {
      return {
        index,
        screen: new StoryScreen(elem, this, StoryScreenType.TITLE),
        elem
      };
    }

    // For all other screens, let TheAlgorithm create the appropriate screen
    const screen = this.algorithm.allocateScreen(this, elem, index);
    
    // Return the new screen object
    return { index, screen, elem };
  }

  // Switch from the current screen to the new index.
  // Pause the old, play the new, discard old ones if needed.
  switchToScreen(newIndex) {
    if (newIndex === this.currentScreenIndex || newIndex < 0 || this.isTrapped) return;

    // If player is dead and trying to scroll up, prevent it
    if (this.isRebirthing && newIndex < this.currentScreenIndex) return;

    // Update skip info for the current screen before switching away
    const currentScreen = this.getScreenObj(this.currentScreenIndex);
    if (currentScreen) {
      this.algorithm.updateSkipInfo(this.currentScreenIndex, currentScreen.screen);
    }

    // Check if current screen is a combat screen with a creature that has a trap
    const hasTrap = currentScreen?.screen instanceof CombatScreen && 
                    currentScreen.screen.creature?.createTrap &&
                    !currentScreen.screen.isCompleted() &&
                    this.algorithm.shouldSpawnTrap();

    // Pause current screen
    if (currentScreen) {
      currentScreen.screen.pause();
    }

    // If player is dead and going down, create DeathRebirthScreen
    if (this.isRebirthing && newIndex > this.currentScreenIndex) {
      // Create new screen element
      const elem = document.createElement('div');
      elem.classList.add('game-screen');
      elem.style.top = `${newIndex * 100}%`;
      elem.style.boxSizing = 'border-box';
      elem.style.overflow = 'hidden';
      this.screensContainer.appendChild(elem);

      let screen;
      
      // For level 0, use a StoryScreen with ENDING type
      if (this.rebirthScreenLevel === 0) {
        screen = new StoryScreen(elem, this, StoryScreenType.ENDING);
      } else {
        // For subsequent levels, use DeathRebirthScreen as before
        screen = new DeathRebirthScreen(elem, this, this.rebirthScreenLevel - 1);
      }
      
      this.screens.push({ index: newIndex, screen, elem });
      
      this.currentScreenIndex = newIndex;
      
      // Increment rebirth screen level for next time
      this.rebirthScreenLevel++;
      
      // If this is the final black screen, restart the game
      if (this.rebirthScreenLevel > 4) {
        // Set a cooldown to prevent immediate interaction
        this.setCooldown(10000);
        
        // Give it a moment to breathe before restarting
        setTimeout(() => {
          console.log('Restarting game...');
          // Reset the game
          this.reset();
        }, 2700);
      }
      
      if (!this.paused) {
        screen.play();
      }
      
      this.updateScreenPositions();
      return;
    }

    // Create new screen if it doesn't exist
    if (!this.getScreenObj(newIndex)) {
      const newScreen = this.createNewScreen(newIndex);
      if (newScreen) {
        this.screens.push(newScreen);
      }
    }

    this.currentScreenIndex = newIndex;

    // Play new screen if not paused and not about to be trapped
    const newScreen = this.getScreenObj(newIndex);
    if (newScreen && !this.paused && !hasTrap) {
      newScreen.screen.play();
    }

    // Update screen positions
    this.updateScreenPositions();

    if (hasTrap) {
      // Temporarily disable screen changes
      this.isTrapped = true;

      // Create a function to handle the trap that will be called when either 
      // the transition or animation completes
      const showTrap = () => {
        // Remove both event listeners to avoid double-triggering
        this.screensContainer.removeEventListener('transitionend', showTrap);
        this.screensContainer.removeEventListener('animationend', showTrap);
        
        // Show the trap
        currentScreen.screen.creature.createTrap(this.trapContainer);
        
        // After a brief pause, go back to the combat screen
        setTimeout(() => {
          this.currentScreenIndex = currentScreen.index;
          this.updateScreenPositions();
          
          // Function to handle returning to combat screen
          const returnToCombat = () => {
            this.screensContainer.removeEventListener('transitionend', returnToCombat);
            this.screensContainer.removeEventListener('animationend', returnToCombat);
            
            // Prepare the combat screen to have the creature attack next
            currentScreen.screen.prepareTrapCounterattack();
            
            // Make sure combat screen is playing
            if (!this.paused) {
              currentScreen.screen.play();
            }

            // Setup fade transition
            this.trapContainer.style.transition = 'opacity 2.5s';
            this.trapContainer.style.opacity = '0';

            // After fade completes
            const onFadeComplete = () => {
              this.trapContainer.removeEventListener('transitionend', onFadeComplete);
              this.trapContainer.innerHTML = '';
              this.trapContainer.style.opacity = '1';
              this.trapContainer.style.transition = '';
              this.isTrapped = false;
            };
            this.trapContainer.addEventListener('transitionend', onFadeComplete);
          };
          
          // Listen for both transition and animation end events
          this.screensContainer.addEventListener('transitionend', returnToCombat);
          this.screensContainer.addEventListener('animationend', returnToCombat);
        }, 400);
      };
      
      // Listen for both transition and animation end events
      this.screensContainer.addEventListener('transitionend', showTrap);
      this.screensContainer.addEventListener('animationend', showTrap);
    } else {
      // Clean up old screens
      const keepLowerBound = this.currentScreenIndex - 4;
      const toRemove = this.screens.filter(s => s.index < keepLowerBound);
      
      toRemove.forEach(sobj => {
        sobj.screen.pause();
        if (sobj.elem.parentNode) {
          sobj.elem.parentNode.removeChild(sobj.elem);
        }
      });

      this.screens = this.screens.filter(s => s.index >= keepLowerBound);

      // Make sure the last kept screen is a cave in
      const caveIn = this.getScreenObj(keepLowerBound);
      if (caveIn && !(caveIn.screen instanceof CaveInScreen)) {
        // Replace with CaveInScreen
        const elem = caveIn.elem;
        elem.innerHTML = '';
        const newScreen = new CaveInScreen(elem, this);
        caveIn.screen = newScreen;
      }
    }
  }

  // Scroll one screen up (moves content down)
  scrollUp() {
    if (this.isScrolling || this.paused || this.isTrapped || this.inCooldown || this.isRebirthing) return;

    // Prevent scrolling back too many screens from the highest reached
    const highestIndex = Math.max(...this.screens.map(s => s.index));
    const minAllowedIndex = Math.max(0, highestIndex - 4);
    
    const newIndex = this.currentScreenIndex - 1;
    if (newIndex >= minAllowedIndex) {
      this.switchToScreen(newIndex);
    }
  }

  // Scroll one screen down (moves content up)
  scrollDown() {
    if (this.isScrolling || this.paused || this.isTrapped || this.inCooldown) return;

    this.switchToScreen(this.currentScreenIndex + 1);
  }

  // Toggle pause/resume.
  togglePause() {
    if (this.inCooldown) return;
    
    this.paused = !this.paused;
    if (this.paused) {
      // Pause the current screen
      const curObj = this.getScreenObj(this.currentScreenIndex);
      if (curObj) {
        curObj.screen.pause();
      }
      // Show stats overlay
      this.showStats();
    } else {
      // Resume the current screen
      const curObj = this.getScreenObj(this.currentScreenIndex);
      if (curObj) {
        curObj.screen.play();
      }
      // Hide stats overlay
      this.hideStats();
    }
  }

  showStats() {
    // Build the stats UI inside #stats-overlay with game instance
    buildStatScreen(this.statsOverlay, this);
    this.statsOverlay.classList.add('visible');
  }

  hideStats() {
    this.statsOverlay.classList.remove('visible');
    // Optionally clear out the stat screen content
    // this.statsOverlay.innerHTML = '';
  }

  // Add a new method to set cooldown for a specified duration
  setCooldown(duration) {
    this.inCooldown = true;
    setTimeout(() => {
      this.inCooldown = false;
    }, duration);
  }

  // Handle player rebirth cycle
  handlePlayerRebirth() {
    this.isRebirthing = true;
    this.rebirthScreenLevel = 0;
    
    // Clear any screens after current index
    const currentIndex = this.currentScreenIndex;
    
    // Get screens to remove
    const screensToRemove = this.screens.filter(s => s.index > currentIndex);
    
    // Properly clean up each screen before removing
    screensToRemove.forEach(sobj => {
      // Pause the screen
      sobj.screen.pause();
      
      // Remove the DOM element
      if (sobj.elem && sobj.elem.parentNode) {
        sobj.elem.parentNode.removeChild(sobj.elem);
      }
    });
    
    // Update the screens array to only include screens up to current index
    this.screens = this.screens.filter(s => s.index <= currentIndex);
    
    console.log('Player has entered the rebirth cycle. Scroll down to continue the journey.');
  }

  // Set up event listeners (keyboard, clicks/taps, swipes).
  setupEventListeners() {
    // Click (or tap) anywhere in #screens-container toggles pause
    this.screensContainer.addEventListener('click', () => {
      this.togglePause();
    });

    // Desktop arrow buttons
    document.getElementById('scroll-up').addEventListener('click', () => {
      this.scrollUp();
    });
    document.getElementById('scroll-down').addEventListener('click', () => {
      this.scrollDown();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'p' || key === ' ') {
        // Space or 'P' toggles pause
        e.preventDefault();
        this.togglePause();
      } else if (key === 'arrowup' || key === 'w' || key === 'k') {
        e.preventDefault();
        this.scrollUp();
      } else if (key === 'arrowdown' || key === 's' || key === 'j') {
        e.preventDefault();
        this.scrollDown();
      }
    });

    // Touch/Swipe logic (simple version)
    let touchStartY = null;
    this.screensContainer.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    this.screensContainer.addEventListener('touchend', (e) => {
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      if (Math.abs(deltaY) > 15) {
        // If deltaY < 0 => swipe up
        if (deltaY < 0) {
          this.scrollDown();
        } else {
          this.scrollUp();
        }
      } else {
        // If not a big swipe, treat like a tap to pause/resume
        // this.togglePause();
      }
      touchStartY = null;
    });
  }
}

// Instantiate the game when the script loads
const game = new Game();
// Make game accessible from the browser console by using window.game
window.game = game;
