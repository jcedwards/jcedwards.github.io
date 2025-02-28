export class LevelUpSequence {
  constructor(parentElement, player, oldStats) {
    this.player = player;
    this.oldStats = oldStats;
    this.container = document.createElement('div');
    parentElement.appendChild(this.container);
    
    this.container.style.position = 'absolute';
    this.container.style.left = '0';
    this.container.style.top = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.alignItems = 'center';
    this.container.style.justifyContent = 'flex-start';
    this.container.style.paddingTop = '12%';
    this.container.style.color = '#fff';
    this.container.style.fontSize = '24px';
    this.container.style.zIndex = '1000';
    this.container.style.transition = 'background-color 0.5s';

    this.animationStep = 0;
    this.lastFrameTime = 0;
    this.isPaused = false;
    this.activeAnimations = new Set();

    // Create fireworks container
    this.fireworksContainer = document.createElement('div');
    this.fireworksContainer.style.position = 'absolute';
    this.fireworksContainer.style.width = '100%';
    this.fireworksContainer.style.height = '100%';
    this.fireworksContainer.style.pointerEvents = 'none';
    
    // Create text elements but don't add them to container yet
    this.levelUpText = document.createElement('div');
    this.levelUpText.textContent = 'LEVEL UP!';
    this.levelUpText.style.fontSize = '48px';
    this.levelUpText.style.color = '#ffd700';
    this.levelUpText.style.marginBottom = '20px';
    this.levelUpText.style.opacity = '0';
    
    // Create ability unlocked text element
    this.abilityUnlockedText = document.createElement('div');
    this.abilityUnlockedText.style.fontSize = '24px';
    this.abilityUnlockedText.style.color = '#ffd700';
    this.abilityUnlockedText.style.marginBottom = '20px';
    this.abilityUnlockedText.style.opacity = '0';
    
    this.statsContainer = document.createElement('div');
    
    // Calculate stat increases but create elements later
    this.statChanges = [
      { name: 'Level', old: oldStats.level, new: player.stats.level },
      { name: 'Max Health', old: oldStats.maxHealth, new: player.stats.maxHealth },
      { name: 'Strength', old: oldStats.strength, new: player.stats.strength }
    ];

    // Check if attack stat increased
    if (player.stats.attacks > oldStats.attacks) {
      // Format the strike name based on attack value
      let strikeName;
      if (player.stats.attacks === 2) {
        strikeName = 'Double-strike';
      } else if (player.stats.attacks === 3) {
        strikeName = 'Triple-strike';
      } else if (player.stats.attacks === 4) {
        strikeName = 'Quad-strike';
      } else {
        strikeName = `${player.stats.attacks}-strike`;
      }
      
      this.abilityUnlockedText.textContent = `New Ability: ${strikeName}`;
      this.hasNewAbility = true;
    } else {
      this.hasNewAbility = false;
    }

    this.statElements = this.statChanges.map(stat => {
      const container = document.createElement('div');
      container.style.margin = '10px';
      container.style.opacity = '0';
      
      const nameAndOld = document.createElement('span');
      nameAndOld.textContent = `${stat.name}: ${stat.old}`;
      
      const arrow = document.createElement('span');
      arrow.textContent = ' → ';
      arrow.style.opacity = '0';
      
      const newValue = document.createElement('span');
      newValue.textContent = stat.new;
      newValue.style.opacity = '0';
      newValue.style.color = '#ffd700';  // Golden color for new value
      
      container.appendChild(nameAndOld);
      container.appendChild(arrow);
      container.appendChild(newValue);
      this.statsContainer.appendChild(container);
      
      return {
        container,
        nameAndOld,
        arrow,
        newValue
      };
    });

    this.container.appendChild(this.fireworksContainer);
    this.container.appendChild(this.levelUpText);
    if (this.hasNewAbility) {
      this.container.appendChild(this.abilityUnlockedText);
    }
    this.container.appendChild(this.statsContainer);
  }

  createFirework(x, y) {
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.left = x + 'px';
    firework.style.bottom = '0';
    firework.style.width = '4px';
    firework.style.height = '4px';
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    firework.style.borderRadius = '50%';
    
    this.fireworksContainer.appendChild(firework);

    // Launch animation
    const targetY = y;
    const startTime = performance.now();
    const duration = 700;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        this.activeAnimations.delete(animate);
        this.explodeFirework(firework, x, y);
        return;
      }

      // Parabolic arc
      const currentY = y * (-((progress - 1) ** 2) + 1);
      firework.style.bottom = currentY + 'px';
      
      if (!this.isPaused) {
        requestAnimationFrame(animate);
      }
    };

    this.activeAnimations.add(animate);
    requestAnimationFrame(animate);
  }

  explodeFirework(firework, x, y) {
    firework.remove();
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = x + 'px';
      particle.style.bottom = y + 'px';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.backgroundColor = firework.style.backgroundColor;
      particle.style.borderRadius = '50%';
      
      this.fireworksContainer.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 2 + Math.random();
      const startTime = performance.now();
      const duration = 1000;

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
          this.activeAnimations.delete(animate);
          particle.remove();
          return;
        }

        const distance = velocity * 100 * (-((progress - 1) ** 2) + 1);
        const currentX = x + Math.cos(angle) * distance;
        const currentY = y + Math.sin(angle) * distance;
        
        particle.style.left = currentX + 'px';
        particle.style.bottom = currentY + 'px';
        particle.style.opacity = 1 - progress;

        if (!this.isPaused) {
          requestAnimationFrame(animate);
        }
      };

      this.activeAnimations.add(animate);
      requestAnimationFrame(animate);
    }
  }

  async animate(timestamp) {
    if (this.isPaused) return;

    if (timestamp - this.lastFrameTime < 50) {
      requestAnimationFrame(this.animate.bind(this));
      return;
    }

    this.lastFrameTime = timestamp;

    switch (this.animationStep) {
      case 20: // Start the sequence
        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.createFirework(
          this.container.offsetWidth * 0.3,
          this.container.offsetHeight * 0.7
        );
        break;
      case 25: // Second firework
        this.createFirework(
          this.container.offsetWidth * 0.7,
          this.container.offsetHeight * 0.6
        );
        break;
      case 30: // Third firework
        this.createFirework(
          this.container.offsetWidth * 0.5,
          this.container.offsetHeight * 0.8
        );
        break;
      case 35: // Fade in level up text
        this.levelUpText.style.transition = 'opacity 0.5s, transform 0.5s';
        this.levelUpText.style.opacity = '1';
        this.levelUpText.style.transform = 'scale(1.2)';
        break;
      case 40: // Return level up text to normal size
        this.levelUpText.style.transform = 'scale(1)';
        break;
      case 45: // Show ability unlocked if there is one
        if (this.hasNewAbility) {
          this.abilityUnlockedText.style.transition = 'opacity 0.5s, transform 0.5s';
          this.abilityUnlockedText.style.opacity = '1';
          this.abilityUnlockedText.style.transform = 'scale(1.1)';
        }
        break;
      case 48: // Return ability text to normal size
        if (this.hasNewAbility) {
          this.abilityUnlockedText.style.transform = 'scale(1)';
        }
        break;
      
      // Stat reveal sequence
      case 50:
      case 65:
      case 80:
        const statSteps = [50, 65, 80];
        const statIndex = statSteps.indexOf(this.animationStep);
        if (statIndex >= 0 && statIndex < this.statElements.length) {
          const elem = this.statElements[statIndex];
          elem.container.style.transition = 'opacity 0.5s';
          elem.container.style.opacity = '1';
          elem.nameAndOld.style.transition = 'opacity 0.5s';
          elem.nameAndOld.style.opacity = '1';
        }
        break;
      
      case 57:
      case 72:
      case 87:
        const arrowSteps = [57, 72, 87];
        const arrowIndex = arrowSteps.indexOf(this.animationStep);
        if (arrowIndex >= 0 && arrowIndex < this.statElements.length) {
          const elem = this.statElements[arrowIndex];
          elem.arrow.style.transition = 'opacity 0.3s';
          elem.arrow.style.opacity = '1';
          elem.newValue.style.transition = 'opacity 0.3s';
          elem.newValue.style.opacity = '1';
        }
        break;
    }

    this.animationStep++;
    requestAnimationFrame(this.animate.bind(this));
  }

  play() {
    this.isPaused = false;
    if (!this.lastFrameTime) {
      this.lastFrameTime = performance.now();
    }
    for (const animate of this.activeAnimations) {
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  pause() {
    this.isPaused = true;
  }
}
