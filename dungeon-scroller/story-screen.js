// Story screen types enum
export const StoryScreenType = {
  TITLE: 'title',
  ENDING: 'ending'
};

// StoryScreen to handle title and ending screens
export class StoryScreen {
  constructor(elem, game, screenType = StoryScreenType.TITLE, options = {}) {
    this.elem = elem;
    this.game = game;
    this.screenType = screenType;
    this.options = options;
    this.completed = false;
    this.animationTimer = null;
    this.isPaused = false; // Track if screen is paused
    this.imagesToLoad = 0; // Track number of images to load
    this.imagesLoaded = 0; // Track number of images loaded
    
    // Setup the screen based on type
    this.setupScreen();
  }
  
  setupScreen() {
    // Clear any existing content
    this.elem.innerHTML = '';
    
    // Create loading screen
    this.createLoadingScreen();
    
    // Create a container for content
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.color = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.textAlign = 'center';
    container.style.width = '80%';
    
    if (this.screenType === StoryScreenType.TITLE) {
      this.elem.style.backgroundColor = '#000';
      
      // Create a container for the monk and eyes
      const monkContainer = document.createElement('div');
      monkContainer.style.position = 'absolute';
      monkContainer.style.bottom = '0';
      monkContainer.style.right = '0';
      monkContainer.style.width = '70%';
      monkContainer.style.height = '0';
      monkContainer.style.paddingBottom = '70%'; // Makes height equal to width (aspect ratio 1:1)
      monkContainer.style.overflow = 'visible'; // Allow elements to overflow
      monkContainer.style.willChange = 'transform'; // Add will-change for better rendering performance
      
      // Add mad monk image to the container
      const madMonk = document.createElement('img');
      madMonk.src = './gfx/madmonk.png';
      madMonk.style.position = 'absolute';
      madMonk.style.bottom = '0';
      madMonk.style.right = '0';
      madMonk.style.width = '100%'; // Take full width of container
      madMonk.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(madMonk);
      
      // Add left eye image - positioned relative to the container
      const leftEye = document.createElement('img');
      leftEye.src = './gfx/left-eye.png';
      leftEye.style.position = 'absolute';
      leftEye.style.bottom = '71.15%'; // Position from bottom of container
      leftEye.style.right = '62.00%';  // Position from right of container
      leftEye.style.width = '5%';  // Width relative to container width
      leftEye.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(leftEye);
      
      // Add right eye image - positioned relative to the container
      const rightEye = document.createElement('img');
      rightEye.src = './gfx/right-eye.png';
      rightEye.style.position = 'absolute';
      rightEye.style.bottom = '75.1%'; // Position from bottom of container
      rightEye.style.right = '44.75%';  // Position from right of container
      rightEye.style.width = '5%';  // Width relative to container width
      rightEye.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(rightEye);
      
      // Add the images to the container
      monkContainer.appendChild(madMonk);
      monkContainer.appendChild(leftEye);
      monkContainer.appendChild(rightEye);
      
      // Store the original positions for the wiggle animation
      this.leftEyeOriginalPosition = { 
        bottom: '71.15%', 
        right: '62.00%' 
      };
      
      this.rightEyeOriginalPosition = { 
        bottom: '75.1%', 
        right: '44.75%' 
      };
      
      // Store references to the eyes for the animation
      this.leftEye = leftEye;
      this.rightEye = rightEye;
      
      // Create the "Dungeon Scroller" title in the top 2/3 of the screen
      const titleContainer = document.createElement('div');
      titleContainer.style.position = 'absolute';
      titleContainer.style.top = '12%';
      titleContainer.style.left = '50%';
      titleContainer.style.transform = 'translateX(-50%)';
      titleContainer.style.textAlign = 'center';
      
      const dungeonText = document.createElement('h1');
      dungeonText.textContent = 'Dungeon';
      dungeonText.style.color = 'yellow';
      dungeonText.style.fontSize = '3.75rem';
      dungeonText.style.margin = '0';
      dungeonText.style.fontFamily = 'Arial, sans-serif';
      // dungeonText.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.7)';
      
      const scrollerText = document.createElement('h1');
      scrollerText.textContent = 'Scroller';
      scrollerText.style.color = 'yellow';
      scrollerText.style.fontSize = '3.75rem';
      scrollerText.style.margin = '0';
      scrollerText.style.fontFamily = 'Arial, sans-serif';
      // scrollerText.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.7)';
      
      // Create down arrow
      const arrowContainer = document.createElement('div');
      arrowContainer.style.marginTop = '1.5rem';
      
      const arrow = document.createElement('div');
      arrow.innerHTML = '↓';
      arrow.style.color = 'yellow';
      arrow.style.fontSize = '4.5rem';
      // arrow.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.7)';
      
      // Add "Seek the Beast" text on the left side
      const seekTextContainer = document.createElement('div');
      seekTextContainer.style.position = 'absolute';
      seekTextContainer.style.left = '5%';
      seekTextContainer.style.bottom = '5%';
      seekTextContainer.style.textAlign = 'left';
      seekTextContainer.style.zIndex = '10';
      seekTextContainer.style.willChange = 'transform'; // Add will-change for better rendering performance
      
      const seekWord = document.createElement('div');
      seekWord.textContent = 'Seek';
      seekWord.style.color = 'white';
      seekWord.style.fontSize = '2.85rem';
      seekWord.style.margin = '0 0 0 1rem';
      seekWord.style.lineHeight = '1.45';
      seekWord.style.fontFamily = 'Arial, sans-serif';
      
      const theWord = document.createElement('div');
      theWord.textContent = 'the';
      theWord.style.color = 'white';
      theWord.style.fontSize = '2.85rem';
      theWord.style.margin = '0 0 0 2rem';
      theWord.style.lineHeight = '1.45';
      theWord.style.fontFamily = 'Arial, sans-serif';
      
      const beastWord = document.createElement('div');
      beastWord.textContent = 'Beast';
      beastWord.style.color = 'red';
      beastWord.style.fontSize = '4rem';
      beastWord.style.margin = '0';
      beastWord.style.lineHeight = '1.275';
      beastWord.style.fontFamily = 'Arial Black, sans-serif';
      beastWord.style.willChange = 'transform'; // Add will-change for better rendering performance
      // Create text outline using multiple text-shadow properties instead of webkitTextStroke
      beastWord.style.textShadow = 
        '-4px -4px 0 #300, ' +  // Top-left
        '4px -4px 0 #300, ' +   // Top-right
        '-4px 4px 0 #300, ' +   // Bottom-left
        '4px 4px 0 #300, ' +    // Bottom-right
        '-4px 0 0 #300, ' +     // Left
        '4px 0 0 #300, ' +      // Right
        '0 -4px 0 #300, ' +     // Top
        '0 4px 0 #300';         // Bottom
      beastWord.style.letterSpacing = '0.1em';
      beastWord.style.fontWeight = 'bold';
      
      // Store the original position for the beast word animation
      this.beastOriginalPosition = { left: '0' };
      this.beastWord = beastWord;
      
      // Add elements to their containers
      titleContainer.appendChild(dungeonText);
      titleContainer.appendChild(scrollerText);
      
      arrowContainer.appendChild(arrow);
      titleContainer.appendChild(arrowContainer);
      
      seekTextContainer.appendChild(seekWord);
      seekTextContainer.appendChild(theWord);
      seekTextContainer.appendChild(beastWord);
      
      // Add containers to the main element
      this.elem.appendChild(titleContainer);
      this.elem.appendChild(seekTextContainer);
      this.elem.appendChild(monkContainer);
      
      // Start the eye wiggle animation
      this.startEyeWiggleAnimation();
      
      // Start the beast word vibration
      this.startBeastVibration();
      
      // Add click event to start the game
      this.elem.addEventListener('click', () => {
        this.completed = true;
        // Callback if provided
        if (this.options.onComplete && typeof this.options.onComplete === 'function') {
          this.options.onComplete();
        }
      });
    } else if (this.screenType === StoryScreenType.ENDING) {
      this.elem.style.backgroundColor = '#000';
      
      // Create a container for the monk and eyes (bottom right)
      const monkContainer = document.createElement('div');
      monkContainer.style.position = 'absolute';
      monkContainer.style.bottom = '0';
      monkContainer.style.right = '0';
      monkContainer.style.width = '70%';
      monkContainer.style.height = '0';
      monkContainer.style.paddingBottom = '70%';
      monkContainer.style.overflow = 'visible';
      monkContainer.style.willChange = 'transform'; // Add will-change for better rendering performance
      
      // Add mad monk image to the container
      const madMonk = document.createElement('img');
      madMonk.src = './gfx/madmonk.png';
      madMonk.style.position = 'absolute';
      madMonk.style.bottom = '0';
      madMonk.style.right = '0';
      madMonk.style.width = '100%';
      madMonk.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(madMonk);
      
      // Add left eye image - positioned relative to the container
      const leftEye = document.createElement('img');
      leftEye.src = './gfx/left-eye.png';
      leftEye.style.position = 'absolute';
      leftEye.style.bottom = '71.15%';
      leftEye.style.right = '62.00%';
      leftEye.style.width = '5%';
      leftEye.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(leftEye);
      
      // Add right eye image - positioned relative to the container
      const rightEye = document.createElement('img');
      rightEye.src = './gfx/right-eye.png';
      rightEye.style.position = 'absolute';
      rightEye.style.bottom = '75.1%';
      rightEye.style.right = '44.75%';
      rightEye.style.width = '5%';
      rightEye.style.willChange = 'transform'; // Add will-change for better rendering performance
      this.trackImageLoading(rightEye);
      
      // Add the images to the container
      monkContainer.appendChild(madMonk);
      monkContainer.appendChild(leftEye);
      monkContainer.appendChild(rightEye);
      
      // Store the original positions for the wiggle animation
      this.leftEyeOriginalPosition = { 
        bottom: '71.15%', 
        right: '62.00%' 
      };
      
      this.rightEyeOriginalPosition = { 
        bottom: '75.1%', 
        right: '44.75%' 
      };
      
      // Store references to the eyes for the animation
      this.leftEye = leftEye;
      this.rightEye = rightEye;
      
      // Create container for "You Fool" text (bottom left)
      const foolTextContainer = document.createElement('div');
      foolTextContainer.style.position = 'absolute';
      foolTextContainer.style.left = '5%';
      foolTextContainer.style.bottom = '5%';
      foolTextContainer.style.textAlign = 'left';
      foolTextContainer.style.zIndex = '10';
      foolTextContainer.style.willChange = 'transform'; // Add will-change for better rendering performance
      
      const youWord = document.createElement('div');
      youWord.textContent = 'You';
      youWord.style.color = 'white';
      youWord.style.fontSize = '3.5rem';
      youWord.style.margin = '0 0 0 1.5rem';
      youWord.style.lineHeight = '1.45';
      youWord.style.fontFamily = 'Arial, sans-serif';
      
      const foolWord = document.createElement('div');
      foolWord.textContent = 'Fool';
      foolWord.style.color = 'red';
      foolWord.style.fontSize = '4rem';
      foolWord.style.margin = '0';
      foolWord.style.lineHeight = '1.275';
      foolWord.style.fontFamily = 'Arial Black, sans-serif';
      foolWord.style.willChange = 'transform'; // Add will-change for better rendering performance
      // Create text outline using multiple text-shadow properties instead of webkitTextStroke
      foolWord.style.textShadow = 
        '-4px -4px 0 #300, ' +  // Top-left
        '4px -4px 0 #300, ' +   // Top-right
        '-4px 4px 0 #300, ' +   // Bottom-left
        '4px 4px 0 #300, ' +    // Bottom-right
        '-4px 0 0 #300, ' +     // Left
        '4px 0 0 #300, ' +      // Right
        '0 -4px 0 #300, ' +     // Top
        '0 4px 0 #300';         // Bottom
      foolWord.style.letterSpacing = '0.1em';
      foolWord.style.fontWeight = 'bold';
      
      // Store the original position for the fool word animation
      this.foolOriginalPosition = { left: '0' };
      this.foolWord = foolWord;
      
      foolTextContainer.appendChild(youWord);
      foolTextContainer.appendChild(foolWord);
      
      // Create container for the "Ha" texts
      const haContainer = document.createElement('div');
      haContainer.style.position = 'absolute';
      haContainer.style.top = '0';
      haContainer.style.left = '0';
      haContainer.style.width = '100%';
      haContainer.style.height = '70%';
      haContainer.style.overflow = 'hidden';
      haContainer.style.zIndex = '20'; // Higher z-index to ensure "Ha" elements appear above the monk
      
      // Add all elements to the main element
      this.elem.appendChild(haContainer);
      this.elem.appendChild(foolTextContainer);
      this.elem.appendChild(monkContainer);
      
      // Store reference to the ha container
      this.haContainer = haContainer;
      
      // Start the eye wiggle animation
      this.startEyeWiggleAnimation();
      
      // Start the fool word vibration (similar to beast vibration)
      this.startFoolVibration();
      
      // Start the "Ha" text animation
      this.startHaAnimation();
      
      // Add click event to end the game
      this.elem.addEventListener('click', () => {
        this.completed = true;
        // Callback if provided
        if (this.options.onComplete && typeof this.options.onComplete === 'function') {
          this.options.onComplete();
        }
      });
    }
    
    // Start with a small delay to ensure all load event listeners are attached
    setTimeout(() => {
      // Check if all images are already loaded (from cache)
      if (this.imagesLoaded === this.imagesToLoad) {
        this.removeLoadingScreen();
      }
    }, 100);
  }
  
  // Create the loading screen - a black div covering the whole screen
  createLoadingScreen() {
    // Create loading screen
    this.loadingScreen = document.createElement('div');
    this.loadingScreen.style.position = 'absolute';
    this.loadingScreen.style.top = '0';
    this.loadingScreen.style.left = '0';
    this.loadingScreen.style.width = '100%';
    this.loadingScreen.style.height = '100%';
    this.loadingScreen.style.backgroundColor = '#000';
    this.loadingScreen.style.zIndex = '1000'; // Higher than anything else
    this.loadingScreen.style.opacity = '1';
    this.loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
    
    // Add loading screen as the first element in the container
    this.elem.appendChild(this.loadingScreen);
  }
  
  // Track loading of an image
  trackImageLoading(imgElement) {
    this.imagesToLoad++;
    
    // If image is already complete (from cache), increment counter
    if (imgElement.complete) {
      this.imageLoaded();
    } else {
      // Otherwise wait for load event
      imgElement.addEventListener('load', () => this.imageLoaded());
      // Also handle error case
      imgElement.addEventListener('error', () => this.imageLoaded());
    }
  }
  
  // Called when an image is loaded
  imageLoaded() {
    this.imagesLoaded++;
    
    // Check if all images are loaded
    if (this.imagesLoaded === this.imagesToLoad) {
      this.removeLoadingScreen();
    }
  }
  
  // Remove the loading screen with a fade effect
  removeLoadingScreen() {
    if (!this.loadingScreen) return;
    
    // Fade out the loading screen
    this.loadingScreen.style.opacity = '0';
    
    // Remove after transition
    setTimeout(() => {
      if (this.loadingScreen && this.loadingScreen.parentNode) {
        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
      }
      this.loadingScreen = null;
    }, 500); // Match the transition duration
  }
  
  play() {
    // Start any animations if needed
    if (this.options.autoCompleteAfter && !this.animationTimer) {
      this.animationTimer = setTimeout(() => {
        this.completed = true;
      }, this.options.autoCompleteAfter);
    }
    
    // If we were previously paused, restart all animations
    if (this.isPaused) {
      // Restart the eye wiggle animations
      this.startEyeWiggleAnimation();
      
      // Restart the beast/fool vibration based on screen type
      if (this.screenType === StoryScreenType.TITLE) {
        this.startBeastVibration();
      } else if (this.screenType === StoryScreenType.ENDING) {
        this.startFoolVibration();
        this.startHaAnimation();
      }
      
      this.isPaused = false;
    }
  }
  
  pause() {
    // Pause any animations
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }
    
    // Set paused flag
    this.isPaused = true;
    
    // Stop the eye wiggle animations
    this.stopEyeWiggleAnimation();
    
    // Stop the beast/fool vibration
    this.stopBeastVibration();
    this.stopFoolVibration();
    
    // Stop the "Ha" animation, but don't clear elements
    this.stopHaAnimation(false);
  }
  
  isInstaSkipped() {
    return this.options.skipEnabled === true;
  }
  
  isCompleted() {
    return this.completed;
  }
  
  // Method to start the eye wiggle animation
  startEyeWiggleAnimation() {
    // Clear any existing animations first
    this.stopEyeWiggleAnimation();
    
    const wiggleAmount = 0.15; // 0.15% wiggle in each dimension
    const wiggleFrequency = 1000 / 12; // 12Hz = every ~83.33ms
    const eyeOffset = wiggleFrequency / 2; // 1/24th of a second offset
    
    // Function to generate a random wiggle within the specified range
    const randomWiggle = () => {
      return (Math.random() * wiggleAmount * 2 - wiggleAmount) + '%';
    };
    
    // Function to update eye position with a random wiggle
    const updateEyePosition = (eye, originalPosition) => {
      const bottomVal = parseFloat(originalPosition.bottom);
      const rightVal = parseFloat(originalPosition.right);
      
      eye.style.bottom = `calc(${originalPosition.bottom} + ${randomWiggle()})`;
      eye.style.right = `calc(${originalPosition.right} + ${randomWiggle()})`;
    };
    
    // Start wiggle for left eye immediately
    this.leftEyeWiggleInterval = setInterval(() => {
      updateEyePosition(this.leftEye, this.leftEyeOriginalPosition);
    }, wiggleFrequency);
    
    // Start wiggle for right eye with offset
    setTimeout(() => {
      this.rightEyeWiggleInterval = setInterval(() => {
        updateEyePosition(this.rightEye, this.rightEyeOriginalPosition);
      }, wiggleFrequency);
    }, eyeOffset);
  }
  
  // Method to start beast word vibration
  startBeastVibration() {
    // Clear any existing vibration
    this.stopBeastVibration();
    
    const vibrationAmount = 0.25; // 0.25% vibration in each dimension
    const vibrationFrequency = 1000 / 12; // 12Hz = every ~83.33ms
    
    // Function to generate a random vibration within the specified range
    const randomVibration = () => {
      return (Math.random() * vibrationAmount * 2 - vibrationAmount) + 'rem';
    };
    
    // Function to update beast word position with random vibration
    const updateBeastPosition = () => {
      if (!this.beastWord) return;
      
      this.beastWord.style.transform = `translate(${randomVibration()}, ${randomVibration()})`;
    };
    
    // Start vibration for beast word
    this.beastVibrationInterval = setInterval(updateBeastPosition, vibrationFrequency);
  }
  
  // Method to stop beast word vibration
  stopBeastVibration() {
    if (this.beastVibrationInterval) {
      clearInterval(this.beastVibrationInterval);
      this.beastVibrationInterval = null;
    }
    
    // Reset to original position if the beast word exists
    if (this.beastWord) {
      this.beastWord.style.transform = 'translate(0, 0)';
    }
  }
  
  // Method to stop the eye wiggle animation
  stopEyeWiggleAnimation() {
    if (this.leftEyeWiggleInterval) {
      clearInterval(this.leftEyeWiggleInterval);
      this.leftEyeWiggleInterval = null;
    }
    
    if (this.rightEyeWiggleInterval) {
      clearInterval(this.rightEyeWiggleInterval);
      this.rightEyeWiggleInterval = null;
    }
    
    // Reset to original positions if the eyes exist
    if (this.leftEye && this.leftEyeOriginalPosition) {
      this.leftEye.style.bottom = this.leftEyeOriginalPosition.bottom;
      this.leftEye.style.right = this.leftEyeOriginalPosition.right;
    }
    
    if (this.rightEye && this.rightEyeOriginalPosition) {
      this.rightEye.style.bottom = this.rightEyeOriginalPosition.bottom;
      this.rightEye.style.right = this.rightEyeOriginalPosition.right;
    }
  }
  
  // Method to start the "Ha" text animation
  startHaAnimation() {
    // Clear any existing animations
    this.stopHaAnimation();
    
    // Store all timeout IDs for later cleanup
    this.haTimeouts = [];
    
    // Function to create a new "Ha" element
    const createHaElement = () => {
      if (!this.haContainer) return;
      
      // Randomize size first (we need this to calculate appropriate positioning)
      const fontSize = Math.floor(Math.random() * 4) + 2; // 2-6rem
      const sizeValue = `${fontSize}rem`;
      
      // Randomize color (whites, reds, yellows)
      const colors = [
        'white', 
        '#ffcccc', 
        '#ffeeee', 
        'red', 
        'darkred', 
        '#ff8888', 
        'yellow', 
        '#ffffaa', 
        '#ffcc00'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Create a temporary element to measure text width
      const measureElement = document.createElement('div');
      measureElement.textContent = 'Ha';
      measureElement.style.position = 'absolute';
      measureElement.style.visibility = 'hidden';
      measureElement.style.fontSize = sizeValue;
      measureElement.style.fontFamily = 'Arial Black, sans-serif';
      measureElement.style.fontWeight = 'bold';
      document.body.appendChild(measureElement);
      
      // Get the width of the text
      const textWidth = measureElement.offsetWidth;
      
      // Remove the measuring element
      document.body.removeChild(measureElement);
      
      // Calculate maximum left position as percentage
      // Container width is 100%, so we need to ensure text doesn't go beyond right edge
      const containerWidth = this.haContainer.offsetWidth;
      const maxLeftPercentage = Math.max(0, 100 - (textWidth / containerWidth * 100));
      
      // Randomize position with adjusted max left position
      const top = Math.floor(Math.random() * 70) + '%';
      const left = Math.floor(Math.random() * maxLeftPercentage) + '%';
      
      // Create the "Ha" element
      const haElement = document.createElement('div');
      haElement.textContent = 'Ha';
      haElement.style.position = 'absolute';
      haElement.style.top = top;
      haElement.style.left = left;
      haElement.style.color = color;
      haElement.style.fontSize = sizeValue;
      haElement.style.fontFamily = 'Arial Black, sans-serif';
      haElement.style.fontWeight = 'bold';
      haElement.style.opacity = '0';
      haElement.style.transition = 'opacity 0.5s ease-in-out';
      
      // Add to container
      this.haContainer.appendChild(haElement);
      
      // Fade in
      setTimeout(() => {
        haElement.style.opacity = '1';
      }, 10);
      
      // Set up disappearance after random time
      const duration = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      const timeout = setTimeout(() => {
        // Fade out
        haElement.style.opacity = '0';
        
        // Remove after fade out
        setTimeout(() => {
          if (this.haContainer && this.haContainer.contains(haElement)) {
            this.haContainer.removeChild(haElement);
          }
        }, 500);
      }, duration);
      
      this.haTimeouts.push(timeout);
    };
    
    // Create initial "Ha" elements
    for (let i = 0; i < 2; i++) {
      createHaElement();
    }
    
    // Create new "Ha" elements periodically
    this.haInterval = setInterval(() => {
      createHaElement();
    }, 200); // New "Ha" every 200ms
  }
  
  // Method to stop the "Ha" animation
  stopHaAnimation(clearElements = true) {
    if (this.haInterval) {
      clearInterval(this.haInterval);
      this.haInterval = null;
    }
    
    // Clear all timeouts
    if (this.haTimeouts) {
      this.haTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
      this.haTimeouts = [];
    }
    
    // Clear all "Ha" elements only if clearElements is true
    if (clearElements && this.haContainer) {
      this.haContainer.innerHTML = '';
    }
  }
  
  // Method to start fool word vibration (similar to beast vibration)
  startFoolVibration() {
    // Clear any existing vibration
    this.stopFoolVibration();
    
    const vibrationAmount = 0.25; // 0.25% vibration in each dimension
    const vibrationFrequency = 1000 / 12; // 12Hz = every ~83.33ms
    
    // Function to generate a random vibration within the specified range
    const randomVibration = () => {
      return (Math.random() * vibrationAmount * 2 - vibrationAmount) + 'rem';
    };
    
    // Function to update fool word position with random vibration
    const updateFoolPosition = () => {
      if (!this.foolWord) return;
      
      this.foolWord.style.transform = `translate(${randomVibration()}, ${randomVibration()})`;
    };
    
    // Start vibration for fool word
    this.foolVibrationInterval = setInterval(updateFoolPosition, vibrationFrequency);
  }
  
  // Method to stop fool word vibration
  stopFoolVibration() {
    if (this.foolVibrationInterval) {
      clearInterval(this.foolVibrationInterval);
      this.foolVibrationInterval = null;
    }
    
    // Reset to original position if the fool word exists
    if (this.foolWord) {
      this.foolWord.style.transform = 'translate(0, 0)';
    }
  }
}
