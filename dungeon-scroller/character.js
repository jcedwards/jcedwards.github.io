export class Character {
  constructor() {
    this.stats = {
      level: 1,
      xp: 0,
      xpAtPrevLevel: 0,
      xpToNextLevel: 4,
      maxHealth: 20,
      health: 20,
      strength: 4,
      attacks: 1,
    };

    this.inventory = [
      'Sword',
      'Shield',
      'Potion x 3',
      'Key'
    ];
  }

  tryLevelUp() {
    if (this.stats.xp < this.stats.xpToNextLevel) { return null; }

    const oldStats = { ...this.stats };

    this.stats.level++;
    this.stats.xpAtPrevLevel = this.stats.xpToNextLevel;
    this.stats.xpToNextLevel += Math.ceil(4 * (1.5**(this.stats.level - 1)));
    this.stats.maxHealth += 10;
    this.stats.health = this.stats.maxHealth;
    this.stats.strength += 1 + Math.ceil(this.stats.level / 4.0);
    if (this.stats.level % 4 === 0 && this.stats.attacks < 4) {
      this.stats.attacks++;
    }

    return oldStats;
  }
}