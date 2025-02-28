import { HealthBarSet } from './health-bar-set.js';
import { ExperienceBar } from './experience-bar.js';
import { LevelUpSequence } from './level-up-sequence.js';

export class CombatScreen {
  constructor(elem, game, creature) {
    this.elem = elem;
    this.game = game;
    this.intervalId = null;
    this.creature = creature;

    // Create container for single creature
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%) scale(1.75)';

    const svg = this.creature.create();
    container.appendChild(svg);
    
    this.elem.appendChild(container);
    this.divs = [container];

    this.currentState = 'default';
    this.container = container;
    this.svg = this.container.children[0];
    this.animationStep = 0;
    this.idleTimeAdjustment = 0;
    this.idleTimeout = null;
    this.celebrationInterval = null;
    this.isPaused = false;
    this.pauseRequested = false;
    this.trapCounterattackInProgress = false;
    
    // Track attack counters
    this.currentAttackIndex = 0;
    this.currentCreatureAttack = null;

    // Create health bars container
    const healthBarsContainer = document.createElement('div');
    healthBarsContainer.style.position = 'absolute';
    healthBarsContainer.style.left = '50%';
    healthBarsContainer.style.top = '65%';
    healthBarsContainer.style.transform = 'translateX(-50%)';
    healthBarsContainer.style.width = '84%';
    
    // Create player and creature health bars
    this.creatureHealthBars = new HealthBarSet(this.creature.maxHealth, '#a44');
    this.playerHealthBars = new HealthBarSet(this.game.player.stats.maxHealth, '#4a4');
    
    // Create and add experience bar
    this.experienceBar = new ExperienceBar();
    
    healthBarsContainer.appendChild(this.creatureHealthBars.container);
    healthBarsContainer.appendChild(this.playerHealthBars.container);
    healthBarsContainer.appendChild(this.experienceBar.container);
    this.elem.appendChild(healthBarsContainer);

    this.isDead = false;
    this.updateHealthBars();
    this.updateExperienceBar();
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
    this.creatureHealthBars.updateHealth(
      this.creature.health,
      this.creature.maxHealth,
      animate
    );
    this.updateExperienceBar(animate);
  }
  
  // Generate random offset for multiple attacks
  getRandomOffset(maxOffset) {
    return {
      x: Math.floor(Math.random() * (2 * maxOffset + 1)) - maxOffset,
      y: Math.floor(Math.random() * (2 * maxOffset + 1)) - maxOffset
    };
  }
  
  // Handle player's multiple attacks
  handlePlayerAttacks() {
    const totalAttacks = this.game.player.stats.attacks;
    const isLastAttack = this.currentAttackIndex >= totalAttacks - 1;
    
    // Apply offset based on attack number
    const offset = this.getRandomOffset(isLastAttack ? 0 : 20);
    this.container.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(1.75) rotate(-5deg)`;
    
    // Apply damage for this attack
    // @HACK: For testing - The Beast takes reduced damage from player attacks
    if (this.creature.constructor.name === 'TheBeast') {
      this.creature.health -= Math.floor(this.game.player.stats.strength / 3);
    } else {
      this.creature.health -= this.game.player.stats.strength;
    }
    this.updateHealthBars();
    
    // Only check for creature death and level up on the final attack
    if (isLastAttack && this.creature.health <= 0 && !this.isDead) {
      this.isDead = true;

      // Award XP to player
      this.game.player.stats.xp += this.creature.xp;
      // Update experience bar after XP gain
      this.updateExperienceBar();
      
      // Set a cooldown so the player doesn't immediately skip the beast death out of habit
      if (this.creature.constructor.name === 'TheBeast') {
        this.game.setCooldown(1000);
        
        //@HACK: For demo purposes, we'll reset the game after defeating The Beast
        this.game.handlePlayerRebirth();
      }
      
      // Check for level up
      const oldStats = this.game.player.tryLevelUp();
      if (oldStats) {
        // Create and play level up sequence
        this.levelUpSequence = new LevelUpSequence(this.elem, this.game.player, oldStats);
        this.levelUpSequence.play();
        
        // Set cooldown for level up so the player can't miss it
        this.game.setCooldown(2000);
        
        // Delay the exp bar update to let the player see it fill up!
        setTimeout(() => {
          this.updateHealthBars();
          this.updateExperienceBar();
        }, 900);
      }
    }
    
    // Create a small jitter effect
    setTimeout(() => {
      this.container.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(1.75) rotate(5deg)`;
    }, 50);
    
    setTimeout(() => {
      this.container.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(1.75) rotate(0deg)`;
    }, 100);
    
    this.currentAttackIndex++;
    
    // Schedule next attack or move to next animation step
    if (this.currentAttackIndex < totalAttacks) {
      setTimeout(() => {
        this.handlePlayerAttacks();
      }, 150);
    } else {
      // Reset counter for next round and proceed to next animation step
      this.currentAttackIndex = 0;
      
      // Wait the standard delay before moving to the next step
      const delay = this.isDead ? 900 : 900;
      
      setTimeout(() => {
        this.animationStep = 2; // Move to return to default pose
        this.svg.replaceWith(this.isDead ? this.creature.createDead() : this.creature.create());
        this.svg = this.container.children[0];
        this.container.style.transform = 'translate(-50%, -50%) scale(1.75)';
        
        this.animate();
      }, delay);
    }
  }
  
  // Handle creature's multiple attacks
  handleCreatureAttacks() {
    // Use the properties from the current attack
    const totalAttacks = this.currentCreatureAttack.attacks;
    const isLastAttack = this.currentAttackIndex >= totalAttacks - 1;
    
    // If this is the first attack, check if all attacks would kill the player
    if (this.currentAttackIndex === 0) {
      const totalDamage = this.currentCreatureAttack.strength * totalAttacks;
      if (this.game.player.stats.health > 0 && this.game.player.stats.health <= totalDamage) {
        // Set cooldown to prevent navigating away if player will die
        this.game.setCooldown(1250 + 150 * (totalAttacks - 1));
      }
    }
    
    // Apply offset based on attack number
    const offset = this.getRandomOffset(isLastAttack ? 0 : 30);
    const scale = totalAttacks > 0 ? 2.1 : 1.75;
    this.container.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`;
    
    // Apply creature's damage to player using the attack strength
    this.game.player.stats.health = Math.max(0, this.game.player.stats.health - this.currentCreatureAttack.strength);
    this.updateHealthBars();
    
    this.currentAttackIndex++;
    
    // Schedule next attack or move to next animation step
    if (this.currentAttackIndex < totalAttacks) {
      setTimeout(() => {
        this.handleCreatureAttacks();
      }, 150);
    } else {
      // Reset counter for next round and proceed to next animation step
      this.currentAttackIndex = 0;
      
      // Wait the standard delay before moving to the next step
      setTimeout(() => {
        this.animationStep = 0; // Move to return to default pose
        this.svg.replaceWith(this.creature.create());
        this.svg = this.container.children[0];
        this.container.style.transform = 'translate(-50%, -50%) scale(1.75)';

        // Reset the trap counterattack flag if it was set
        if (this.trapCounterattackInProgress) {
          this.trapCounterattackInProgress = false;
        }

        this.animate();
      }, totalAttacks > 0 ? 900 : 900); //@HACK: The Beast cowers for a few rounds during the first encounter and we want to accentuate that more
    }
  }

  async animate() {
    if (this.isDead) {
      // If creature is dead, don't animate further
      this.svg.replaceWith(this.creature.createDead());
      this.svg = this.container.children[0];
      this.animationStep = 4;
      return;
    }

    // Check if player is critically wounded before continuing combat loop
    // Skip this check if we're in the middle of a trap counterattack
    if (this.game.player.stats.health <= 0 && !this.trapCounterattackInProgress) {
      // Player is critically wounded
      if (this.creature.constructor.name === 'TheBeast') {
        // The Beast shows solemn expression instead of celebrating
        this.svg.replaceWith(this.creature.createSolemn());
        this.svg = this.container.children[0];
      } else {
        // Other creatures celebrate
        this.svg.replaceWith(this.creature.create());
        this.svg = this.container.children[0];
        
        // Make creature dance
        const dance = () => {
          this.container.style.transform = 'translate(-50%, -50%) scale(1.75) translateY(-10px)';
          setTimeout(() => {
            this.container.style.transform = 'translate(-50%, -50%) scale(1.75) translateY(0px)';
          }, 200);
        };
        dance();
        this.celebrationInterval = setInterval(dance, 400);
      }
      
      this.animationStep = 4;
      return; // Stop the combat loop
    }

    // Apply any pending pause at safe points
    if (this.pauseRequested) {
      this.isPaused = true;
      this.pauseRequested = false;
      return;
    }

    switch(this.animationStep) {
      case 0:
      case 2:
        this.svg.replaceWith(this.creature.create());
        this.svg = this.container.children[0];
        
        this.idleTimeout = setTimeout(() => {
          this.idleTimeout = null;
          this.animationStep++;
          this.animate();
        }, 900 + this.idleTimeAdjustment);
        this.idleTimeAdjustment = 0;

        break;
      case 1:
        // Player's turn to attack
        this.svg.replaceWith(this.creature.createDamaged());
        this.svg = this.container.children[0];

        this.handlePlayerAttacks();

        break;
      case 3:
        // Creature's turn to attack
        this.currentCreatureAttack = this.creature.nextAttack();
        this.svg.replaceWith(this.currentCreatureAttack.image);
        this.svg = this.container.children[0];
        
        this.handleCreatureAttacks();

        break;
    }
  }

  play() {
    if (this.levelUpSequence) {
      this.levelUpSequence.play();
    }

    // Update health bars without animation when first displaying the screen
    this.updateHealthBars(false);

    // Check if the player revived
    if (this.animationStep === 4 && this.game.player.stats.health > 0) {
      this.animationStep = 0;
    }

    if (this.pauseRequested) {
      this.pauseRequested = false;
      return;
    }

    this.isPaused = false;
    
    this.animate();
  }

  pause() {
    if (this.isPaused) return;

    if (this.celebrationInterval) {
      clearInterval(this.celebrationInterval);
      this.celebrationInterval = null;
    }
    if (this.levelUpSequence) {
      this.levelUpSequence.pause();
    }

    if (this.idleTimeout || this.animationStep === 4) {
      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
      }
      this.isPaused = true;
    } else {
      this.pauseRequested = true;
    }
  }

  isInstaSkipped() {
    // Combat is insta-skipped if no damage has been dealt yet
    return this.creature.health === this.creature.maxHealth;
  }

  isCompleted() {
    // Combat is completed if the creature is dead
    return this.isDead;
  }

  // Prepare the combat screen to have the creature attack next
  prepareTrapCounterattack() {
    // Set animation step to 2 so the next step will be creature's attack (step 3)
    this.animationStep = 2;
    this.idleTimeAdjustment = -400; // Snappier transition
    
    // Set flag to allow attack sequence even if player is critically wounded
    this.trapCounterattackInProgress = true;
  }
}
