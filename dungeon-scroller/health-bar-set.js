export const kMaxHealthPerBar = 200;

export class HealthBarSet {
  constructor(maxHealth, color) {
    this.container = document.createElement('div');
    this.container.style.marginBottom = '10px';
    this.bars = [];
    this.color = color;
    
    this.createBars(maxHealth);
  }

  createBars(maxHealth, animate = false) {
    const newBarCount = Math.ceil(maxHealth / kMaxHealthPerBar);
    
    // Handle removing excess bars if maxHealth decreased
    if (this.bars.length > newBarCount) {
      const barsToRemove = this.bars.slice(newBarCount);
      barsToRemove.forEach(({element, fill}) => {
        // Animate bar width to 0 before removing
        fill.style.width = '0%';
        setTimeout(() => {
          element.remove();
        }, 300); // Match transition duration
      });
      this.bars = this.bars.slice(0, newBarCount);
    }

    // Update existing bars' maxHealth and width
    for (let i = 0; i < this.bars.length; i++) {
      const barMaxHealth = Math.min(
        kMaxHealthPerBar,
        maxHealth - (i * kMaxHealthPerBar)
      );
      const barWidth = (barMaxHealth / kMaxHealthPerBar) * 100;
      this.bars[i].maxHealth = barMaxHealth;
      this.bars[i].element.style.width = `${barWidth}%`;
    }

    // Add new bars if maxHealth increased
    for (let i = this.bars.length; i < newBarCount; i++) {
      const bar = document.createElement('div');
      bar.style.height = '20px';
      bar.style.marginBottom = '4px';
      bar.style.border = '2px solid #444';
      bar.style.borderRadius = '4px';
      bar.style.overflow = 'hidden';
      
      const barMaxHealth = Math.min(
        kMaxHealthPerBar,
        maxHealth - (i * kMaxHealthPerBar)
      );
      const barWidth = (barMaxHealth / kMaxHealthPerBar) * 100;
      
      // Always start at 0 width and set transition
      bar.style.width = '0%';
      bar.style.transition = 'width 0.3s ease-in-out';
      
      const healthFill = document.createElement('div');
      healthFill.style.height = '100%';
      healthFill.style.backgroundColor = this.color;
      healthFill.style.width = '0%';
      healthFill.style.transition = 'width 0.3s ease-in-out';
      bar.appendChild(healthFill);
      
      this.bars.push({
        element: bar,
        fill: healthFill,
        maxHealth: barMaxHealth
      });
      this.container.appendChild(bar);

      // Set final width after adding to DOM
      if (animate) {
        // Trigger reflow to ensure animation works
        bar.offsetHeight;
        bar.style.width = `${barWidth}%`;
      } else {
        // Skip animation if not requested
        bar.style.transition = 'none';
        bar.style.width = `${barWidth}%`;
        // Trigger reflow
        bar.offsetHeight;
        bar.style.transition = 'width 0.3s ease-in-out';
      }
    }
  }

  updateHealth(currentHealth, maxHealth, animate = true) {
    // If maxHealth changed, update bar structure
    if (maxHealth !== undefined) {
      const currentBarCount = this.bars.length;
      const newBarCount = Math.ceil(maxHealth / kMaxHealthPerBar);
      
      if (currentBarCount !== newBarCount) {
        this.createBars(maxHealth, animate);
      } else {
        // Update existing bars' maxHealth and width
        for (let i = 0; i < this.bars.length; i++) {
          const barMaxHealth = Math.min(
            kMaxHealthPerBar,
            maxHealth - (i * kMaxHealthPerBar)
          );
          const barWidth = (barMaxHealth / kMaxHealthPerBar) * 100;
          this.bars[i].maxHealth = barMaxHealth;
          
          if (animate) {
            this.bars[i].element.style.transition = 'width 0.3s ease-in-out';
          } else {
            this.bars[i].element.style.transition = 'none';
          }
          
          this.bars[i].element.style.width = `${barWidth}%`;
          
          if (!animate) {
            // Force reflow
            this.bars[i].element.offsetHeight;
            // Restore transition
            setTimeout(() => {
              this.bars[i].element.style.transition = 'width 0.3s ease-in-out';
            }, 0);
          }
        }
      }
    }

    // Update health fills
    for (let i = 0; i < this.bars.length; i++) {
      const barStartHealth = i * kMaxHealthPerBar;
      const barCurrentHealth = Math.max(0, Math.min(
        this.bars[i].maxHealth,
        currentHealth - barStartHealth
      ));
      const fillPercentage = (barCurrentHealth / this.bars[i].maxHealth) * 100;
      
      if (!animate) {
        // Temporarily disable transition
        const originalTransition = this.bars[i].fill.style.transition;
        this.bars[i].fill.style.transition = 'none';
        
        // Update without animation
        this.bars[i].fill.style.width = `${fillPercentage}%`;
        
        // Force reflow
        this.bars[i].fill.offsetHeight;
        
        // Restore transition
        setTimeout(() => {
          this.bars[i].fill.style.transition = originalTransition;
        }, 0);
      } else {
        // Normal animated update
        this.bars[i].fill.style.width = `${fillPercentage}%`;
      }
    }
  }
}
