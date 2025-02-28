// DeathRebirthScreen to handle player death and rebirth
export class DeathRebirthScreen {
  constructor(elem, game, darknessLevel = 0) {
    this.elem = elem;
    this.game = game;
    this.darknessLevel = darknessLevel;
    
    // Apply styling based on darkness level
    this.setupScreen();
  }
  
  setupScreen() {
    // Clear any existing content
    this.elem.innerHTML = '';
    
    if (this.darknessLevel < 3) {
      // Calculate brightness based on darkness level
      // 0 = 100% brightness, 1 = 66% brightness, 2 = 33% brightness
      const brightness = 1 - (this.darknessLevel * 0.33);
      
      // Create a darker red as darkness increases
      // Convert RGB values to darker shades
      const r = Math.floor(200 * brightness);
      const g = Math.floor(30 * brightness);
      const b = Math.floor(0 * brightness);
      
      // Fill the screen with the appropriate hellish red color
      this.elem.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      
      // No text elements as requested
    } else {
      // Level 3 - completely black screen
      this.elem.style.backgroundColor = '#000000';
    }
  }
  
  play() {
    // No animation needed for now
  }
  
  pause() {
    // No animation to pause
  }
  
  isInstaSkipped() {
    return false; // Don't allow instant skipping of this screen
  }
  
  isCompleted() {
    return false; // This screen is never "completed"
  }
}
