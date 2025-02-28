export class CaveInScreen {
  constructor(elem, game) {
    this.elem = elem;
    this.game = game;
    this.isPaused = false;
    this.rocks = [];
    this.animationStarted = false;
    this.currentRockIndex = 0;
    this.totalRocks = 100;

    // Create container for the cave visual
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.width = '300px';
    container.style.height = '300px';
    container.style.overflow = 'hidden';

    // Create a wrapper for falling rocks
    this.rockContainer = document.createElement('div');
    this.rockContainer.style.position = 'absolute';
    this.rockContainer.style.width = '100%';
    this.rockContainer.style.height = '100%';
    this.rockContainer.style.zIndex = '1';

    container.appendChild(this.createCaveSvg());
    container.appendChild(this.rockContainer);
    this.elem.appendChild(container);
    this.container = container;
  }

  createCaveSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");
    svg.setAttribute("viewBox", "0 0 300 300");

    // Define gradient for cave interior
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "caveGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("y2", "0%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:#2F2F2F;stop-opacity:1");

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:#000000;stop-opacity:1");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    svg.appendChild(gradient);

    // Create the ground path with uneven surface
    const ground = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ground.setAttribute("d", "M0,250 Q50,245 100,255 Q150,260 200,250 Q250,245 300,252 L300,300 L0,300 Z");
    ground.setAttribute("fill", "#8B4513");

    // Create the cave entrance with jagged edges
    const cave = document.createElementNS("http://www.w3.org/2000/svg", "path");
    cave.setAttribute("d", `
      M100,250 
      Q95,200 110,180 
      Q120,150 130,140
      Q150,120 170,140
      Q180,150 190,180
      Q205,200 200,250
      Q150,260 100,250
    `);
    cave.setAttribute("fill", "url(#caveGradient)");

    // Add varied rock details around the entrance
    const leftRocks = document.createElementNS("http://www.w3.org/2000/svg", "path");
    leftRocks.setAttribute("d", 
      `
      M85,250 Q80,245 85,240 Q90,235 95,240
      M90,230 Q85,225 90,220 Q95,215 100,220
      M95,210 Q90,205 95,200 Q100,195 105,200
      M100,190 Q95,185 100,180 Q105,175 110,180
      M105,170 Q100,165 105,160 Q110,155 115,160
      M110,150 Q105,145 110,140 Q115,135 120,140
      M125,135 Q120,130 125,125 Q130,120 135,125
      M75,235 Q70,230 75,225 Q80,220 85,225
      M80,205 Q75,200 80,195 Q85,190 90,195
      `
    );
    leftRocks.setAttribute("fill", "none");
    leftRocks.setAttribute("stroke", "#666");
    leftRocks.setAttribute("stroke-width", "2");

    const rightRocks = document.createElementNS("http://www.w3.org/2000/svg", "path");
    rightRocks.setAttribute("d", 
      `
      M215,250 Q220,245 215,240 Q210,235 205,240
      M210,230 Q215,225 210,220 Q205,215 200,220
      M205,210 Q210,205 205,200 Q200,195 195,200
      M200,190 Q205,185 200,180 Q195,175 190,180
      M195,170 Q200,165 195,160 Q190,155 185,160
      M190,150 Q195,145 190,140 Q185,135 180,140
      M175,135 Q180,130 175,125 Q170,120 165,125
      M225,235 Q230,230 225,225 Q220,220 215,225
      M220,205 Q225,200 220,195 Q215,190 210,195
      `
    );
    rightRocks.setAttribute("fill", "none");
    rightRocks.setAttribute("stroke", "#333");
    rightRocks.setAttribute("stroke-width", "2");

    const keystone = document.createElementNS("http://www.w3.org/2000/svg", "path");
    keystone.setAttribute("d", 
      `
      M145,115 Q150,110 155,115
      M140,118 Q145,113 150,112 Q155,113 160,118
      `
    );
    keystone.setAttribute("fill", "none");
    keystone.setAttribute("stroke", "#444");
    keystone.setAttribute("stroke-width", "2");

    svg.appendChild(cave);
    svg.appendChild(ground);
    svg.appendChild(leftRocks);
    svg.appendChild(rightRocks);
    svg.appendChild(keystone);

    return svg;
  }

  createRock(index) {
    const rock = document.createElement('div');
    rock.style.position = 'absolute';
    rock.style.width = (100 - index)/100 * 12 + 20 + 'px';
    rock.style.height = (100 - index)/100 * 12 + 20 + 'px';
    
    // Generate darker grey colors
    const baseColor = Math.floor(Math.random() * 65 + 20).toString(16);
    const variation = Math.floor(Math.random() * 30 - 15);
    const r = Math.max(15, Math.min(40, parseInt(baseColor, 16) + variation)).toString(16).padStart(2, '0');
    const g = Math.max(15, Math.min(40, parseInt(baseColor, 16) + variation)).toString(16).padStart(2, '0');
    const b = Math.max(15, Math.min(40, parseInt(baseColor, 16) + variation)).toString(16).padStart(2, '0');
    rock.style.backgroundColor = `#${r}${g}${b}`;
    
    rock.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
    rock.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    rock.style.left = 140 + 120*(1.0 - index**2/10000) * (1.0 - 2.0 * Math.random()) + 'px';
    rock.style.top = -300 + (rock.style.zIndex * 1.5) + 'px';
    rock.style.zIndex = 100 - index;
    rock.style.transition = 'top 0.2s cubic-bezier(0.55, 0.45, 0.99, 1.0)';
    return rock;
  }

  async animate() {
    if (this.isPaused) return;
    
    if (!this.animationStarted) {
      this.animationStarted = true;
      // Add initial delay before rocks start falling
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    if (this.isPaused) return;

    const batchSize = 10;
    const batchDelay = 40;
    const fallDistance = -200;

    // Continue from where we left off
    for (let i = this.currentRockIndex; i < this.totalRocks; i += batchSize) {
      if (this.isPaused) {
        this.currentRockIndex = i;  // Save current progress
        return;
      }

      // Create and add a batch of rocks
      for (let j = 0; j < batchSize && (i + j) < this.totalRocks; j++) {
        let rock;
        if (i + j < this.rocks.length) {
          // Reuse existing rock
          rock = this.rocks[i + j];
        } else {
          // Create new rock only if it doesn't exist
          rock = this.createRock(i + j);
          this.rocks.push(rock);
          this.rockContainer.appendChild(rock);
        }
        
        // Reset rock position to top
        rock.style.top = '-300px';
        
        // Trigger layout/reflow
        rock.offsetHeight;

        // Calculate fall distance based on z-index
        const adjustedFallDistance = fallDistance + (rock.style.zIndex * 1.5);
        rock.style.top = adjustedFallDistance + 'px';
      }

      // Wait before next batch
      await new Promise(resolve => setTimeout(resolve, batchDelay));
    }
    
    // Reset for potential future animations
    this.currentRockIndex = 0;
    this.animationStarted = false;
  }

  play() {
    this.isPaused = false;
    requestAnimationFrame(() => this.animate());
  }

  pause() {
    this.isPaused = true;
  }
}
