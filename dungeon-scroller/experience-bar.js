export class ExperienceBar {
  constructor() {
    this.container = document.createElement('div');
    this.container.style.marginBottom = '10px';
    
    // Create the bar container
    const bar = document.createElement('div');
    bar.style.height = '7px'; // 1/3 of health bar's 20px
    bar.style.width = '100%'; // Always full width
    bar.style.border = '2px solid #444';
    bar.style.borderRadius = '4px';
    bar.style.overflow = 'hidden';
    
    // Create the fill element
    this.xpFill = document.createElement('div');
    this.xpFill.style.height = '100%';
    this.xpFill.style.backgroundColor = '#FFD700'; // Gold color
    this.xpFill.style.width = '0%';
    this.xpFill.style.transition = 'width 0.3s ease-in-out';
    
    bar.appendChild(this.xpFill);
    this.container.appendChild(bar);
  }

  updateExperience(currentXP, xpForNextLevel, animate = true) {
    const fillPercentage = (currentXP / xpForNextLevel) * 100;
    
    if (!animate) {
      // Temporarily disable transition for immediate update
      const originalTransition = this.xpFill.style.transition;
      this.xpFill.style.transition = 'none';
      
      // Update width without animation
      this.xpFill.style.width = `${fillPercentage}%`;
      
      // Force reflow to apply the changes immediately
      this.xpFill.offsetHeight;
      
      // Restore transition for future updates
      setTimeout(() => {
        this.xpFill.style.transition = originalTransition;
      }, 0);
    } else {
      // Normal animated update
      this.xpFill.style.width = `${fillPercentage}%`;
    }
  }
}
