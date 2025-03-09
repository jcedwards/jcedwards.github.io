/**
 * GameEvent class - Represents an event from the events JSON file
 * Handles preprocessing of event data for display
 */
class GameEvent {
  constructor(eventData) {
    this.type = eventData.type;
    this.level = eventData.level;
    this.name = eventData.name;
    this.description = eventData.description;
    this.svgs = this.preprocessSvgs(eventData.svgs);
  }

  /**
   * Preprocesses SVGs for better display
   * @param {Object} svgsData - The SVGs data from the event object
   * @returns {Object} - Processed SVGs
   */
  preprocessSvgs(svgsData) {
    const processed = {};

    // Process each category of SVGs (scene, success, failure)
    ['scene', 'success', 'failure'].forEach(category => {
      if (svgsData[category] && Array.isArray(svgsData[category])) {
        processed[category] = svgsData[category].map(svg => svg);
      } else {
        processed[category] = [];
      }
    });

    return processed;
  }

  /**
   * Randomly determine if this event should succeed or fail
   * This can be expanded later to incorporate player skills or stats
   * @returns {string} - 'success' or 'failure'
   */
  determineOutcome() {
    // For now, simple 50/50 chance
    return Math.random() < 0.5 ? 'success' : 'failure';
  }
}

/**
 * EventScreen class - Represents a displayed instance of a GameEvent
 * Handles DOM elements, animation state, success/failure determination
 */
class EventScreen {
  /**
   * @param {GameEvent} gameEvent - The event to display
   * @param {number} index - The screen index (position)
   * @param {HTMLElement} container - The container element to append to
   */
  constructor(gameEvent, index, container) {
    this.gameEvent = gameEvent;
    this.index = index;
    this.container = container;
    this.slideShowActive = false;
    this.sceneIndex = 0;
    this.outcomeIndex = 0;
    this.inOutcomePhase = false;
    this.showVirtualScreen = false;
    this.outcome = gameEvent.determineOutcome();
    
    // Create and set up DOM elements
    this.elem = this.createScreenElement();
    this.svgDisplay = this.createSvgDisplay();
    this.elem.appendChild(this.svgDisplay);
    this.container.appendChild(this.elem);
    
    // Add CSS for SVG scaling if needed
    this.addSvgStyles();
    
    // Display the first scene SVG
    this.showCurrentSvg();
  }
  
  /**
   * Creates the main screen element
   * @returns {HTMLElement} - The created screen element
   */
  createScreenElement() {
    const elem = document.createElement('div');
    elem.classList.add('game-screen');
    elem.style.top = `${this.index * 100}%`;
    return elem;
  }
  
  /**
   * Creates the SVG display container
   * @returns {HTMLElement} - The SVG display container
   */
  createSvgDisplay() {
    const svgDisplay = document.createElement('div');
    svgDisplay.style.width = '100%';
    svgDisplay.style.height = '100%';
    svgDisplay.style.display = 'flex';
    svgDisplay.style.justifyContent = 'center';
    svgDisplay.style.alignItems = 'center';
    svgDisplay.style.flexDirection = 'column';
    svgDisplay.style.padding = '0px';
    svgDisplay.style.boxSizing = 'border-box';
    svgDisplay.style.overflow = 'hidden';
    return svgDisplay;
  }
  
  /**
   * Adds CSS styles for SVG content
   */
  addSvgStyles() {
    // Check if styles already exist
    if (!document.getElementById('svg-content-styles')) {
      const style = document.createElement('style');
      style.id = 'svg-content-styles';
      style.textContent = `
        .svg-content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .svg-content svg {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        .svg-content.blur svg {
          filter: blur(5px);
        }
        .virtual-screen-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 32px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          text-align: center;
          z-index: 10;
        }
        .virtual-screen-text.success {
          color: #4CAF50; /* More muted green that's easier to read */
        }
        .virtual-screen-text.failure {
          color: #F44336; /* Less intense red that remains legible */
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Displays the current SVG based on slideshow state
   */
  showCurrentSvg() {
    const svgs = this.gameEvent.svgs;
    
    // Display current scene or outcome SVG
    if (this.slideShowActive) {
      if (this.sceneIndex < svgs.scene.length && !this.inOutcomePhase) {
        // We're in the scene phase, show current scene SVG
        this.svgDisplay.innerHTML = `<div class="svg-content">${svgs.scene[this.sceneIndex]}</div>`;
      } else if (this.outcomeIndex < svgs[this.outcome].length) {
        // We're in the outcome phase, show current outcome SVG
        this.svgDisplay.innerHTML = `<div class="svg-content">${svgs[this.outcome][this.outcomeIndex]}</div>`;
      } else if (this.showVirtualScreen && svgs[this.outcome].length > 0) {
        // Show the "virtual" screen with blurred last SVG and centered text
        const lastSvg = svgs[this.outcome][svgs[this.outcome].length - 1];
        
        // Capitalize the first letter of the event type
        const capitalizedType = this.gameEvent.type.charAt(0).toUpperCase() + this.gameEvent.type.slice(1);
        
        // Different text based on success/failure
        let virtualScreenText = '';
        let outcomeClass = '';
        if (this.outcome === 'success') {
          virtualScreenText = `${capitalizedType} +${this.gameEvent.level}`;
          outcomeClass = 'success';
        } else {
          virtualScreenText = `${capitalizedType} check failed!`;
          outcomeClass = 'failure';
        }
        
        this.svgDisplay.innerHTML = `
          <div class="svg-content blur">${lastSvg}</div>
          <div class="virtual-screen-text ${outcomeClass}">${virtualScreenText}</div>
        `;
      }
    } else {
      // When not active, show first scene SVG
      if (svgs.scene && svgs.scene.length > 0) {
        this.svgDisplay.innerHTML = `<div class="svg-content">${svgs.scene[0]}</div>`;
      } else {
        this.svgDisplay.innerHTML = '<div style="font-size: 24px; text-align: center;">No SVGs available</div>';
      }
    }
  }
  
  /**
   * Starts the slideshow animation
   */
  play() {
    this.slideShowActive = true;
    this.animateSlideshow();
  }
  
  /**
   * Pauses the slideshow animation
   */
  pause() {
    this.slideShowActive = false;
  }
  
  /**
   * Resumes the slideshow animation
   */
  resume() {
    if (!this.slideShowActive) {
      this.slideShowActive = true;
      this.animateSlideshow();
    }
  }
  
  /**
   * Handles the slideshow animation logic
   */
  animateSlideshow() {
    if (!this.slideShowActive) return;
    
    const svgs = this.gameEvent.svgs;
    
    // Function to advance through scene SVGs
    const advanceScene = () => {
      if (!this.slideShowActive) return;
      
      if (this.sceneIndex < svgs.scene.length - 1) {
        // Move to next scene SVG
        this.sceneIndex++;
        this.showCurrentSvg();
        setTimeout(advanceScene, 2000);
      } else {
        // We've shown all scene SVGs, move to outcome phase
        this.inOutcomePhase = true;
        this.outcomeIndex = 0;
        
        // Move to outcome SVGs when scene is complete
        const advanceOutcome = () => {
          if (!this.slideShowActive) return;
          
          if (this.outcomeIndex < svgs[this.outcome].length - 1) {
            // Move to next outcome SVG
            this.outcomeIndex++;
            this.showCurrentSvg();
            setTimeout(advanceOutcome, 2000);
          } else if (this.outcomeIndex === svgs[this.outcome].length - 1 && !this.showVirtualScreen) {
            // Show the last outcome SVG
            this.outcomeIndex++;
            // Switch to virtual screen mode
            this.showVirtualScreen = true;
            this.showCurrentSvg();
            setTimeout(advanceOutcome, 2000);
          } else {
            // Reset for next loop
            this.sceneIndex = 0;
            this.outcomeIndex = 0;
            this.inOutcomePhase = false;
            this.showVirtualScreen = false;
            this.showCurrentSvg();
            setTimeout(advanceScene, 2000);
          }
        };
        
        // Show first outcome SVG and start outcome sequence
        if (svgs[this.outcome] && svgs[this.outcome].length > 0) {
          this.showCurrentSvg();
          setTimeout(advanceOutcome, 2000);
        } else {
          // If no outcome SVGs, loop back to scene
          this.sceneIndex = 0;
          this.inOutcomePhase = false;
          this.showCurrentSvg();
          setTimeout(advanceScene, 2000);
        }
      }
    };
    
    // Start the slideshow cycle
    setTimeout(advanceScene, 2000);
  }
  
  /**
   * Returns a screen object compatible with the existing Game class
   * @returns {Object} - Screen object with required methods and properties
   */
  getScreenObject() {
    return {
      index: this.index,
      screen: {
        play: () => this.resume(),
        pause: () => this.pause()
      },
      elem: this.elem
    };
  }
}

// Export classes
export { GameEvent, EventScreen }; 