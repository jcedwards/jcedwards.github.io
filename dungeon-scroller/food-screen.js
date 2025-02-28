import mushrooms from './food/mushrooms.js';
import fish from './food/fish.js';
import healthPotion from './food/health-potion.js';
import { createRatHappySvg, createRatDrunkSvg } from './creatures/rat.js';
import { HealthBarSet } from './health-bar-set.js';
import { ExperienceBar } from './experience-bar.js';

export class FoodScreen {
  constructor(elem, game, food) {
    this.elem = elem;
    this.game = game;
    this.isPaused = false;
    this.animationStarted = false;
    this.food = food;

    // Create container for the food
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.width = '300px';
    container.style.height = '300px';
    container.style.overflow = 'hidden';

    // Add the food SVG to the container
    const foodSvg = this.food.createSvgFns[0]();
    container.appendChild(foodSvg);

    this.elem.appendChild(container);
    this.container = container;

    // Add health bars container
    const healthBarsContainer = document.createElement('div');
    healthBarsContainer.style.position = 'absolute';
    healthBarsContainer.style.left = '50%';
    healthBarsContainer.style.top = '65%';
    healthBarsContainer.style.transform = 'translateX(-50%)';
    healthBarsContainer.style.width = '84%';
    
    // Create player health bars
    this.playerHealthBars = new HealthBarSet(this.game.player.stats.maxHealth, '#4a4');
    
    // Create and add experience bar
    this.experienceBar = new ExperienceBar();
    
    healthBarsContainer.appendChild(this.playerHealthBars.container);
    healthBarsContainer.appendChild(this.experienceBar.container);
    this.elem.appendChild(healthBarsContainer);

    // Track food eaten
    this.foodEaten = 0;
    this.isEating = false;

    // Update initial health display
    this.updateHealthBars();

    // Add properties to track rat state
    this.foodStealTimer = null;
    this.ratStoleFood = false;
    this.pendingRatAnimation = false;
  }

  updateExperienceBar(animate = true) {
    const stats = this.game.player.stats;
    const currentLevelXP = stats.xp - stats.xpAtPrevLevel;
    const xpNeededForLevel = stats.xpToNextLevel - stats.xpAtPrevLevel;
    this.experienceBar.updateExperience(currentLevelXP, xpNeededForLevel, animate);
  }

  updateHealthBars(animate = true) {
    this.playerHealthBars.updateHealth(
      this.game.player.stats.health,
      this.game.player.stats.maxHealth,
      animate
    );
    this.updateExperienceBar(animate);
  }

  async animate() {
    if (this.isPaused || this.isEating) return;
    
    this.isEating = true;

    // Add initial delay before first bite
    if (!this.animationStarted) {
      const playerCritical = this.game.player.stats.health <= 0;
      await new Promise(resolve => setTimeout(resolve, playerCritical ? 1900 : 900));
      if (this.isPaused) {
        this.isEating = false;
        return;
      }
      this.animationStarted = true;
    }
    
    // Eat food one by one
    if (this.foodEaten < this.food.createSvgFns.length - 1) {
      // Update health before eating
      const healthGain = Math.min(this.food.healing, this.game.player.stats.maxHealth - this.game.player.stats.health);
      this.game.player.stats.health += healthGain;
      this.updateHealthBars();

      this.foodEaten++;

      // Replace the current SVG with the new one
      this.container.children[0].replaceWith(this.food.createSvgFns[this.foodEaten]());

      // Add delay between eating food
      await new Promise(resolve => setTimeout(resolve, 900));
      this.isEating = false;
      
      // Continue animation if not all food eaten
      if (this.foodEaten < this.food.createSvgFns.length - 1 && !this.isPaused) {
        requestAnimationFrame(() => this.animate());
      }
    }
  }

  async animateRatStealing() {
    // Create and position rat
    const ratSvg = createRatHappySvg();
    
    ratSvg.style.position = 'absolute';
    ratSvg.style.left = '20%'; // Start on left side
    ratSvg.style.top = '50%';
    ratSvg.style.transform = 'translate(-50%, -50%) scale(1.5)';
    ratSvg.style.width = '100px';
    ratSvg.style.zIndex = '-1'; // Place behind the food
    this.container.appendChild(ratSvg);

    // Laugh animation
    for (let i = 0; i < 9; i++) {
      await new Promise(resolve => setTimeout(resolve, 90));
      ratSvg.style.top = '52%';
      await new Promise(resolve => setTimeout(resolve, 90));
      ratSvg.style.top = '50%';
    }

    // Scurry away animation
    ratSvg.style.transition = 'all 0.4s ease-in';
    ratSvg.style.left = '-100%';
    
    // Remove rat after animation
    setTimeout(() => {
      ratSvg.remove();
    }, 500);
  }

  async animateRatDrunkStealing() {
    // Create and position drunk rat
    const ratSvg = createRatDrunkSvg();
    
    ratSvg.style.position = 'absolute';
    ratSvg.style.left = '19%';
    ratSvg.style.top = '50%';
    ratSvg.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(-4deg)';
    ratSvg.style.width = '100px';
    ratSvg.style.zIndex = '-2';
    
    // Add smooth transitions for wobble
    ratSvg.style.transition = 'transform 0.8s ease-in-out, left 0.8s ease-in-out';
    
    this.container.appendChild(ratSvg);

    // Create bubble container with same position as rat
    const bubbleContainer = document.createElement('div');
    bubbleContainer.style.position = 'absolute';
    bubbleContainer.style.left = '0%';
    bubbleContainer.style.top = '28%';
    bubbleContainer.style.width = '100px';
    bubbleContainer.style.height = '100px';
    bubbleContainer.style.zIndex = '-1';
    this.container.appendChild(bubbleContainer);

    // Function to create and animate a bubble
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.style.position = 'absolute';
      bubble.style.width = '8px';
      bubble.style.height = '8px';
      bubble.style.borderRadius = '50%';
      bubble.style.border = '1px solid #88f';
      bubble.style.backgroundColor = 'rgba(136, 136, 255, 0.2)';
      bubble.style.left = getComputedStyle(ratSvg).left;
      bubble.style.bottom = '50%';
      bubble.style.transform = 'translate(-50%, 0)';
      bubble.style.transition = 'all 2s ease-out';
      bubbleContainer.appendChild(bubble);

      // Start bubble animation
      setTimeout(() => {
        bubble.style.transform = 'translate(-50%, -200%) scale(2)';
        bubble.style.opacity = '0';
        // Remove bubble after animation
        setTimeout(() => bubble.remove(), 2000);
      }, 10);
    };

    // Create bubbles periodically during the wobble
    let bubbleInterval = setInterval(createBubble, 750);

    // Drunk wobble animation
    for (let i = 0; i < 2; i++) {
      // Wobble right
      ratSvg.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(4deg)';
      ratSvg.style.left = '21%';
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Wobble left
      ratSvg.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(-4deg)';
      ratSvg.style.left = '19%';
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Add wobbly exit animation
    let position = 19;
    let rotation = -4;
    
    const wobbleAway = async () => {
      for (let i = 0; i < 9; i++) {
        position -= 4 + i;
        rotation = -rotation * 0.8;
        ratSvg.style.transform = `translate(-50%, -50%) scale(1.5) rotate(${rotation}deg)`;
        ratSvg.style.left = `${position}%`;
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      clearInterval(bubbleInterval);
      ratSvg.remove();
      bubbleContainer.remove();
    };

    wobbleAway();
  }

  play() {
    this.isPaused = false;
    this.animationStarted = false;

    // Update health bars without animation when first displaying the screen
    this.updateHealthBars(false);
    
    // If rat stole food while we were away, play that animation first
    if (this.pendingRatAnimation) {
      this.pendingRatAnimation = false;
      if (this.food.makesRatDrunk) {
        this.animateRatDrunkStealing();
      } else {
        this.animateRatStealing();
      }
    } else {
      requestAnimationFrame(() => this.animate());
    }
  }

  pause() {
    this.isPaused = true;

    // Clear any existing timer
    if (this.foodStealTimer) {
      clearTimeout(this.foodStealTimer);
    }

    // If there's still food to eat, start the rat timer
    if (this.foodEaten < this.food.createSvgFns.length - 1 && !this.ratStoleFood) {
      this.foodStealTimer = setTimeout(() => {
        // Check if this screen is still the current screen
        if (this.game.getScreenObj(this.game.currentScreenIndex)?.screen === this) {
          return; // Player is still here, don't steal food
        }

        // Rat steals the food!
        this.ratStoleFood = true;
        
        // Replace current food display with all eaten
        const newSvg = this.food.createSvgFns[this.food.createSvgFns.length - 1]();
        this.container.children[0].replaceWith(newSvg);
        
        // Queue up rat animation for when screen is next played
        this.pendingRatAnimation = true;
        
        // Make sure no more food eating can happen
        this.foodEaten = this.food.createSvgFns.length - 1;
      }, 1500);
    }
  }

  isInstaSkipped() {
    // Food is insta-skipped if no food has been eaten yet
    return this.foodEaten === 0;
  }

  isCompleted() {
    // Food is completed if all food has been eaten
    return this.foodEaten >= this.food.createSvgFns.length - 1;
  }
}
