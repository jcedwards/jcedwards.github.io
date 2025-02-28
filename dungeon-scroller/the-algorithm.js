import { FoodScreen } from './food-screen.js';
import mushrooms from './food/mushrooms.js';
import fish from './food/fish.js';
import healthPotion from './food/health-potion.js';

import { CombatScreen } from './combat-screen.js';
import { Rat } from './creatures/rat.js';
import { Goblin } from './creatures/goblin.js';
import { GiantSpider } from './creatures/giant-spider.js';
import { Wraith } from './creatures/wraith.js';
import { Minotaur } from './creatures/minotaur.js';
import { TheBeast } from './creatures/the-beast.js';

const kDangerRankings = [
  [Rat],
  [Goblin],
  [GiantSpider],
  [Wraith],
  [Minotaur],
  [TheBeast],
];

const kLevelLayouts = [
  [0, ],
  [1, Rat, Goblin, mushrooms, Goblin, Rat, mushrooms, Rat, Rat, Rat, mushrooms, Rat, Rat, mushrooms],
  [2, Rat, mushrooms, Rat, mushrooms, Goblin, Rat, Goblin, Rat, Goblin, mushrooms],
  [3, GiantSpider, Rat, Goblin, fish, Goblin, Goblin, Rat, Rat, GiantSpider, mushrooms],
  [4, GiantSpider, GiantSpider, GiantSpider, GiantSpider, GiantSpider, fish, Goblin, Goblin, Goblin, Rat, GiantSpider, mushrooms],
  [5, GiantSpider, GiantSpider, Rat, Goblin, GiantSpider, mushrooms],
  [6, Wraith, Goblin, Goblin, GiantSpider, GiantSpider, mushrooms, Goblin, Rat, Goblin, fish, GiantSpider, Goblin, Goblin, mushrooms],
  [7, Rat, Rat, Rat, TheBeast, Rat, Goblin, GiantSpider, Wraith, fish, Wraith, Goblin, Goblin, Rat, GiantSpider, fish, GiantSpider, GiantSpider, GiantSpider, Goblin, mushrooms],
  [8, GiantSpider, Minotaur, Wraith, Rat, mushrooms, GiantSpider, Goblin, GiantSpider, Rat, GiantSpider, fish, Wraith, fish],
  [9, Minotaur, Goblin, Rat, fish, GiantSpider, Wraith, GiantSpider, fish],
  [10, Minotaur, Minotaur, Wraith, healthPotion, Minotaur, Wraith, GiantSpider, fish],
  [11, TheBeast, Goblin, GiantSpider, Wraith, healthPotion, TheBeast, Minotaur, Minotaur, Minotaur, mushrooms, Wraith, GiantSpider, fish],
  [12, Minotaur, Wraith, Wraith, fish, TheBeast, Goblin, Wraith, GiantSpider, fish],
  [13, TheBeast, healthPotion, Minotaur, Rat, fish, TheBeast, Rat, Goblin, GiantSpider, Wraith, Minotaur, fish],
  [14, TheBeast, healthPotion, Wraith, Rat, GiantSpider, TheBeast, fish, Rat, Rat, Rat, healthPotion, TheBeast, healthPotion],
  [15, TheBeast, healthPotion, Rat, Rat, Rat, healthPotion],
];

export class TheAlgorithm {
  constructor() {
    // Track history of screen types that have been allocated
    this.screenHistory = [];
    // Track if player has encountered The Beast
    this.hasEncounteredBeast = false;
    // Track the current level layout
    this.levelLayout = 0;
    this.levelLayoutIndex = 0;
  }
  
  // Get the danger ranking of a creature
  getDangerRanking(creatureClass) {
    for (let i = 0; i < kDangerRankings.length; i++) {
      if (kDangerRankings[i].includes(creatureClass)) {
        return i;
      }
    }
    return 0; // Default to lowest danger if not found
  }
  
  // Find the weighted average danger ranking of creatures the player has completed combat with
  findAverageCompletedDangerRanking() {
    // Get combat screens the player has completed
    const completedCombats = this.screenHistory
      .filter(entry => entry.type === 'combat' && entry.completed)
      .slice(-10); // Look at last 10 combat encounters
    
    if (completedCombats.length === 0) {
      return -1; // No completed combats, use the lowest danger ranking
    }
    
    let weightedSum = 0;
    let weightSum = 0;
    
    // Calculate weighted average of danger rankings
    for (let i = 0; i < completedCombats.length; i++) {
      const combat = completedCombats[completedCombats.length - 1 - i]; // Reverse order to get most recent first
      const weight = (completedCombats.length - i) / completedCombats.length; // Weight from 10/10 down to 1/10
      
      if (combat.creatureClass) {
        const dangerRanking = this.getDangerRanking(combat.creatureClass);
        weightedSum += dangerRanking * weight;
        weightSum += weight;
      }
    }
    
    // Return weighted average or -1 if no valid combat data
    return weightSum > 0 ? weightedSum / weightSum : -1;
  }
  
  // Calculate odds adjustments for creatures based on recent encounters
  getCreatureOddsAdjustments() {
    // Get the last 10 combat encounters
    const recentCombats = this.screenHistory
      .filter(entry => entry.type === 'combat' && entry.creatureClass)
      .slice(-10);
    
    // Create a map of creatures to their odds adjustments
    const oddsAdjustments = {};
    
    // Process each recent combat, from most recent to oldest
    for (let i = 0; i < recentCombats.length; i++) {
      const combat = recentCombats[recentCombats.length - 1 - i]; // Reverse order to get most recent first
      const creatureClass = combat.creatureClass;
      
      // Apply the n/(n+1) formula for odds reduction
      // i=0 (most recent) → 1/2
      // i=1 (second most recent) → 2/3
      // i=2 (third most recent) → 3/4
      // and so on...
      const multiplier = (i + 1) / (i + 2);
      
      if (oddsAdjustments[creatureClass.name] === undefined) {
        oddsAdjustments[creatureClass.name] = 1.0;
      }
      oddsAdjustments[creatureClass.name] *= multiplier;
    }

    // We don't want to see The Best too often
    if (oddsAdjustments['TheBeast'] === undefined) {
      oddsAdjustments['TheBeast'] = 1.0;
    }
    oddsAdjustments['TheBeast'] *= 0.5;
    // We don't want to see the The Beast at all if it was encountered within the last 2 combat screens
    if (recentCombats.slice(-2).some(combat => combat.creatureClass.name === 'TheBeast')) {
      oddsAdjustments['TheBeast'] = 0;
    }

    return oddsAdjustments;
  }

  // Select a creature based on the player's combat history
  selectCreatureBasedOnHistory(game) {
    // Find the average danger ranking the player has completed
    const averageCompletedDangerRanking = this.findAverageCompletedDangerRanking();
    const creatureOddsAdjustments = this.getCreatureOddsAdjustments();
    // Special case: The player never encounters the beast while critically wounded
    if (game.player.stats.health <= 0) {
      creatureOddsAdjustments['TheBeast'] = 0;
    }

    // Default to easiest enemy if player hasn't completed any combats
    if (averageCompletedDangerRanking < 0) {
      return new Rat();
    }
    
    // Calculate odds for each creature
    const odds = [];
    let totalOdds = 0;
   
    // Check each danger ranking
    for (let i = 0; i < kDangerRankings.length; i++) {
      // Calculate the distance from the average completed danger ranking
      const distance = Math.abs(i - averageCompletedDangerRanking);
      
      // Assign odds based on Gaussian formula
      let rankingOdds = Math.exp(-((0.8 * distance)**2));
      // Clean up the tails
      if (distance >= 1.5) {
        rankingOdds = 0.0;
      }

      // Distribute the ranking odds among all creatures in this danger ranking
      const creaturesInRanking = kDangerRankings[i];
      const creatureCount = creaturesInRanking.length;
      const creatureOddsArray = [];
      for (const creatureClass of creaturesInRanking) {
        const creatureName = creatureClass.name;
        const adjustment = creatureOddsAdjustments[creatureName] !== undefined ? creatureOddsAdjustments[creatureName] : 1.0;
        const creatureOdds = (rankingOdds / creatureCount) * adjustment;
        creatureOddsArray.push(creatureOdds);
        totalOdds += creatureOdds;
      }
      odds.push(creatureOddsArray);
    }
    
    // If no valid options (very rare case), default to Rat
    if (totalOdds === 0) {
      return new Rat();
    }
    
    // Roll based on the odds
    const roll = Math.random() * totalOdds;
    let cumulativeOdds = 0;
    let selectedCreatureClass = null;
    
    outerLoop:
    for (let i = 0; i < odds.length; i++) {
      for (let j = 0; j < odds[i].length; j++) {
        cumulativeOdds += odds[i][j];
        if (roll < cumulativeOdds) {
          selectedCreatureClass = kDangerRankings[i][j];
          break outerLoop;
        }
      }
    }
    
    // Special case: Always use the same Beast
    if (selectedCreatureClass === TheBeast) {
      return game.theBeast;
    }
    // Otherwise just return the selected creature
    return new selectedCreatureClass();
  }
  
  allocateScreen(game, elem, index) {
    // Determine which screen to create
    let screen;
    let screenType;
    
    // Initialize history entry with common properties
    let historyEntry = {
      type: '',
      creatureClass: null,
      index: index,
      instaSkipped: false,
      completed: false,
      timeCreated: Date.now()
    };

    // First, we try to select a screen based on the level layout

    // See if the player has leveled up since we last saw them, so we can start a new layout
    if (this.levelLayout < game.player.stats.level) {
      this.levelLayout = game.player.stats.level;
      this.levelLayoutIndex = 1; // Skip the first index, since that's just the level number
    }

    // If there is a screen to show in this layout, show it
    if (kLevelLayouts[this.levelLayout]) {
      // If we've reached the end of the layout, start over
      if (this.levelLayoutIndex >= kLevelLayouts[this.levelLayout].length) {
        this.levelLayoutIndex = 1;
      }
      const llScreen = kLevelLayouts[this.levelLayout][this.levelLayoutIndex];
      this.levelLayoutIndex++;

      if (llScreen.healing) {
        historyEntry.type = screenType = 'food';
        screen = new FoodScreen(elem, game, llScreen);
      } else {
        historyEntry.type = screenType = 'combat';
        historyEntry.creatureClass = llScreen;

        const creature = llScreen === TheBeast ? game.theBeast : new llScreen();
        
        // If this is the second or later Beast encounter, mark it as angry
        if (creature === game.theBeast) {
          if (!this.hasEncounteredBeast) {
            this.hasEncounteredBeast = true;
          } else {
            game.theBeast.isAngry = true;
          }
        }

        screen = new CombatScreen(elem, game, creature);
      }
    } else { // Otherwise, use an algorithm as a fallback
      // Determine food probability based on screen history
      let foodProbability = 0;

      // Find the last food screen in history
      let lastFoodIndex = -1;
      const foodScreens = this.screenHistory.filter(entry => entry.type === 'food');
      if (foodScreens.length > 0) {
        lastFoodIndex = Math.max(...foodScreens.map(entry => entry.index));
      }
      // Calculate screens since last food
      const screensSinceFood = lastFoodIndex === -1 ? index : index - lastFoodIndex;
      
      if (screensSinceFood <= 2) {
        // If food was just spawned 1 or 2 screens ago
        foodProbability = 0.01;
      } else if (screensSinceFood >= 9) {
        // If 16+ screens without food, guaranteed food
        foodProbability = 1;
      } else {
        // Between 3 and 16 screens, "even chance" (stochastic)
        // Formula: probability = 1 / (11 - screensSinceFood)
        foodProbability = 1 / (9 - screensSinceFood);
      }
      if (game.player.stats.health <= 0) {
        // If the player is critically wounded, increase the odds of food
        foodProbability *= 2.0;
      }

      // Special cases:
      if (index < 2) {
        // No food within the first 2 screens
        foodProbability = 0;
      } else if (index === 5) {
        // If the first 5 screens weren't food, make the 6th screen food
        const hasFoodInFirst5 = this.screenHistory
          .filter(entry => entry.index < 5 && entry.type === 'food')
          .length > 0;
        
        if (!hasFoodInFirst5) {
          foodProbability = 1; // Force food on the 6th screen
        }
      }
      
      // Determine screen type based on calculated probability
      if (Math.random() < foodProbability) {
        // Create a food screen
        screenType = 'food';
        
        // Select food type based on probabilities
        const foodTypeRoll = Math.random();
        let food = mushrooms;
        if (this.findAverageCompletedDangerRanking() < 1.5) {
          food = foodTypeRoll < 0.02 ? healthPotion :
                foodTypeRoll < 0.25 ? fish :
                mushrooms;
        } else {
          food = foodTypeRoll < 0.25 ? healthPotion :
                foodTypeRoll < 0.95 ? fish :
                mushrooms;
        }
        
        screen = new FoodScreen(elem, game, food);
        
        // Set food-specific properties in history entry
        historyEntry.type = screenType;
      } else {
        // Create a combat screen
        screenType = 'combat';

        const criticalWounded = game.player.stats.health <= 0;
        const shouldSpawnBeast = !this.hasEncounteredBeast && !criticalWounded && ((index >= 10 && index <= 20 && Math.random() < 0.1) || index > 20);
        
        let creature;
        if (shouldSpawnBeast) {
          creature = game.theBeast;
        } else {
          // Regular creature selection
          creature = this.selectCreatureBasedOnHistory(game);
        }
        
        // If this is the second or later Beast encounter, mark it as angry
        if (shouldSpawnBeast) {
          this.hasEncounteredBeast = true;
        } else if (creature instanceof TheBeast) {
          game.theBeast.isAngry = true;
        }
        
        screen = new CombatScreen(elem, game, creature);
        
        // Set combat-specific properties in history entry
        historyEntry.type = screenType;
        historyEntry.creatureClass = creature.constructor;
      }
    }
    
    console.assert(historyEntry.type, `Screen type not set for screen at index ${index}`);
    this.screenHistory.push(historyEntry);
    
    return screen;
  }

  shouldSpawnTrap() {
    // As the player skips more combats, the odds of a trap increase

    // Figure out how many combats it's been since the player completed one
    let combatsSinceLastCompleted = 0;
    for (let i = this.screenHistory.length - 1; i >= 0; i--) {
      if (this.screenHistory[i].type === 'combat' && this.screenHistory[i].completed) {
        break;
      }
      combatsSinceLastCompleted++;
    }

    const trapOdds =
      combatsSinceLastCompleted < 2 ? 0.05 :
      combatsSinceLastCompleted < 5 ? 0.1 :
      combatsSinceLastCompleted < 8 ? 0.2 : 0.4;

    return Math.random() < trapOdds;
  }
  
  // Update skip info for a specific screen
  updateSkipInfo(index, screen) {
    const entry = this.getHistoryEntryByIndex(index);
    if (!entry) return;
    
    // Only update if screen has the required methods
    if (typeof screen.isInstaSkipped === 'function' && 
        typeof screen.isCompleted === 'function') {
      
      entry.instaSkipped = screen.isInstaSkipped();
      entry.completed = screen.isCompleted();
      
      // For debugging
      console.log(`Updated screen at index ${index}: instaSkipped=${entry.instaSkipped}, completed=${entry.completed}`);
    }
  }
  
  // Helper to find history entry by screen index
  getHistoryEntryByIndex(index) {
    return this.screenHistory.find(entry => entry.index === index);
  }
}
