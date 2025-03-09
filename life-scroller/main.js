// Clean version of the Game class
// Import the GameEvent and EventScreen classes
import { GameEvent, EventScreen } from './event-classes.js';

class Game {
  constructor() {
    // One-time initialization of DOM references
    this.screensContainer = document.getElementById('screens-container');
    this.statsOverlay = document.getElementById('stats-overlay');
    
    // Setup event listeners (only needs to happen once)
    this.setupEventListeners();
    
    // Event-related properties
    this.events = null;
    this.gameEvents = []; // Array to store GameEvent instances
    this.eventsLoading = false;
    this.loadEvents();
    
    // Initialize/reset game state
    this.reset();

    // Set initial screen opacity
    this.screens[0].elem.style.opacity = '1';
  }

  // Load events from JSON file
  loadEvents() {
    this.eventsLoading = true;
    fetch('aaa-events.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load events');
        }
        return response.json();
      })
      .then(data => {
        // Create GameEvent instances for each event in the data
        this.events = data;
        this.gameEvents = data.map(eventData => new GameEvent(eventData));
        this.eventsLoading = false;
        console.log('Events loaded successfully');
        
        // Auto-scroll to the first event after events are loaded
        if (this.gameEvents.length > 0) {
          // Add a small delay to ensure the UI is fully rendered
          setTimeout(() => {
            this.scrollDown();
          }, 500);
        }
      })
      .catch(error => {
        console.error('Error loading events:', error);
        this.eventsLoading = false;
      });
  }

  // Reset/initialize all game state
  reset() {
    // Reset game state flags
    this.paused = false;
    this.screens = [];
    this.currentScreenIndex = 0;
    this.isScrolling = false;
    this.inCooldown = false;
    
    // Reset container position without animation
    const originalTransition = this.screensContainer.style.transition;
    this.screensContainer.style.transition = 'none';
    this.screensContainer.style.transform = 'translateY(0)';
    this.screensContainer.offsetHeight; // Force reflow to ensure the transition removal takes effect
    this.screensContainer.style.transition = originalTransition;
    
    // Clear containers
    this.screensContainer.innerHTML = '';
    
    // Create and play first screen
    const firstScreen = this.createNewScreen(0);
    if (firstScreen) {
      this.screens.push(firstScreen);
      
      // Add fade-in effect for the first screen
      firstScreen.elem.style.transition = 'opacity 750ms ease-in';
      firstScreen.elem.style.opacity = '0';
      firstScreen.elem.offsetHeight; // Force reflow to ensure the transition takes effect
      firstScreen.elem.style.opacity = '1';
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
    
    // Use normal transition
    this.performNormalTransition();
  }

  // Perform normal transition between screens
  performNormalTransition() {
    // Apply smooth transition
    this.screensContainer.style.transition = 'transform 0.25s ease-in-out';
    // Transform the container to show currentScreenIndex
    this.screensContainer.style.transform = `translateY(-${this.currentScreenIndex * 100}%)`;
    
    // Listen for transition end to clear scrolling flag
    const onTransitionEnd = () => {
      this.screensContainer.removeEventListener('transitionend', onTransitionEnd);
      this.isScrolling = false;
    };
    this.screensContainer.addEventListener('transitionend', onTransitionEnd);
  }

  // Creates and returns a new screen object at the given index
  createNewScreen(index) {
    if (index < 0) return null;

    // Check if events are loaded
    if (this.eventsLoading) {
      // Create a loading screen
      const elem = document.createElement('div');
      elem.classList.add('game-screen');
      elem.style.top = `${index * 100}%`;
     
      this.screensContainer.appendChild(elem);

      // Create content for the screen
      let svgDisplay = document.createElement('div');
      svgDisplay.style.width = '100%';
      svgDisplay.style.height = '100%';
      svgDisplay.style.display = 'flex';
      svgDisplay.style.justifyContent = 'center';
      svgDisplay.style.alignItems = 'center';
      svgDisplay.style.flexDirection = 'column';
      svgDisplay.style.padding = '0px';
      svgDisplay.style.boxSizing = 'border-box';
      svgDisplay.style.overflow = 'hidden';
      svgDisplay.innerHTML = '<div style="font-size: 24px; text-align: center;">Loading events...</div>';
      elem.appendChild(svgDisplay);

      // Return a simple screen object for loading state
      return { 
        index,
        screen: {
          play: () => {},
          pause: () => {}
        },
        elem
      };
    } else if (this.gameEvents && this.gameEvents.length > 0) {
      // Filter out events that are already used in existing screens
      const usedEventNames = this.screens.map(screen => 
        screen.gameEvent ? screen.gameEvent.name : null
      ).filter(name => name !== null);
      
      // Find available events that haven't been used yet
      const availableEvents = this.gameEvents.filter(event => 
        !usedEventNames.includes(event.name)
      );
      
      // If all events have been used, fall back to using any event
      const eventsToUse = availableEvents.length > 0 ? availableEvents : this.gameEvents;
      
      // Choose a random event from available events
      const randomEventIndex = Math.floor(Math.random() * eventsToUse.length);
      const gameEvent = eventsToUse[randomEventIndex];
      
      // Create an EventScreen instance
      const eventScreen = new EventScreen(gameEvent, index, this.screensContainer);
      
      // Start the event
      eventScreen.play();
      
      // Return screen object with the gameEvent reference for tracking
      const screenObj = eventScreen.getScreenObject();
      screenObj.gameEvent = gameEvent; // Add reference to the event for future filtering
      return screenObj;
    } else {
      // No events loaded or failed to load
      const elem = document.createElement('div');
      elem.classList.add('game-screen');
      elem.style.top = `${index * 100}%`;
     
      this.screensContainer.appendChild(elem);

      // Create content for the screen
      let svgDisplay = document.createElement('div');
      svgDisplay.style.width = '100%';
      svgDisplay.style.height = '100%';
      svgDisplay.style.display = 'flex';
      svgDisplay.style.justifyContent = 'center';
      svgDisplay.style.alignItems = 'center';
      svgDisplay.style.flexDirection = 'column';
      svgDisplay.style.padding = '0px';
      svgDisplay.style.boxSizing = 'border-box';
      svgDisplay.style.overflow = 'hidden';
      svgDisplay.innerHTML = '<div style="font-size: 24px; text-align: center;">No events available</div>';
      elem.appendChild(svgDisplay);

      // Return a simple screen object
      return { 
        index,
        screen: {
          play: () => {},
          pause: () => {}
        },
        elem
      };
    }
  }

  // Switch from the current screen to the new index.
  switchToScreen(newIndex) {
    if (newIndex === this.currentScreenIndex || newIndex < 0) return;

    // Create new screen if it doesn't exist
    if (!this.getScreenObj(newIndex)) {
      const newScreen = this.createNewScreen(newIndex);
      if (newScreen) {
        this.screens.push(newScreen);
      }
    }

    // Pause the current screen
    const currentScreen = this.getScreenObj(this.currentScreenIndex);
    if (currentScreen) {
      currentScreen.screen.pause();
    }

    this.currentScreenIndex = newIndex;

    // Update screen positions
    this.updateScreenPositions();

    // Resume the new screen
    const newScreen = this.getScreenObj(this.currentScreenIndex);
    if (newScreen) {
      newScreen.screen.play();
    }

    // Clean up old screens
    const keepLowerBound = this.currentScreenIndex - 4;
    const toRemove = this.screens.filter(s => s.index < keepLowerBound);
    
    toRemove.forEach(sobj => {
      if (sobj.elem.parentNode) {
        sobj.elem.parentNode.removeChild(sobj.elem);
      }
    });

    this.screens = this.screens.filter(s => s.index >= keepLowerBound);
  }

  // Scroll one screen up (moves content down)
  scrollUp() {
    if (this.isScrolling || this.paused || this.inCooldown) return;

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
    if (this.isScrolling || this.paused || this.inCooldown) return;

    this.switchToScreen(this.currentScreenIndex + 1);
  }

  // Toggle pause/resume.
  togglePause() {
    if (this.inCooldown) return;
    
    this.paused = !this.paused;
    if (this.paused) {
      // Show stats overlay
      this.showStats();
      
      // Pause current screen
      const currentScreen = this.getScreenObj(this.currentScreenIndex);
      if (currentScreen) {
        currentScreen.screen.pause();
      }
    } else {
      // Hide stats overlay
      this.hideStats();
      
      // Resume current screen
      const currentScreen = this.getScreenObj(this.currentScreenIndex);
      if (currentScreen) {
        currentScreen.screen.play();
      }
    }
  }

  // Show stats overlay
  showStats() {
    // Stub function to display stats
    this.statsOverlay.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Game Paused</h2><p>This is a placeholder for stats UI</p></div>';
    this.statsOverlay.classList.add('visible');
  }

  // Hide stats overlay
  hideStats() {
    this.statsOverlay.classList.remove('visible');
  }

  // Add a cooldown to prevent rapid actions
  setCooldown(duration) {
    this.inCooldown = true;
    setTimeout(() => {
      this.inCooldown = false;
    }, duration);
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
