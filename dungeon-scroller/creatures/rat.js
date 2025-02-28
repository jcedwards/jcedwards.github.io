function createRatSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#666");
  
  // Ears
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M30 35 L20 20 L35 30 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M70 35 L80 20 L65 30 Z");
  rightEar.setAttribute("fill", "#666");
  
  // Eyes (angry expression)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M35 45 L45 40 L45 50 Z");
  leftEye.setAttribute("fill", "red");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M65 45 L55 40 L55 50 Z");
  rightEye.setAttribute("fill", "red");
  
  // Tail
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M80 50 Q90 60 95 40");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(tail);
  
  return svg;
}
  
function createRatAttackSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body (tilted forward for attacking pose)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "45");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "20");
  body.setAttribute("transform", "rotate(-15, 45, 50)");
  body.setAttribute("fill", "#666");
  
  // Ears (more aggressive angle)
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M25 35 L15 15 L35 30 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M65 35 L75 15 L60 30 Z");
  rightEar.setAttribute("fill", "#666");
  
  // Eyes (more aggressive)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M30 45 L40 38 L40 52 Z");
  leftEye.setAttribute("fill", "red");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M60 45 L50 38 L50 52 Z");
  rightEye.setAttribute("fill", "red");
  
  // Open mouth with teeth
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M35 55 L45 65 L55 55");
  mouth.setAttribute("stroke", "#400");
  mouth.setAttribute("stroke-width", "2");
  mouth.setAttribute("fill", "none");
  
  // Upper teeth
  const upperTeeth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperTeeth.setAttribute("d", "M38 55 L42 60 L45 55 L48 60 L52 55");
  upperTeeth.setAttribute("stroke", "white");
  upperTeeth.setAttribute("stroke-width", "2");
  upperTeeth.setAttribute("fill", "none");
  
  // Lower teeth
  const lowerTeeth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerTeeth.setAttribute("d", "M40 60 L45 65 L50 60");
  lowerTeeth.setAttribute("stroke", "white");
  lowerTeeth.setAttribute("stroke-width", "2");
  lowerTeeth.setAttribute("fill", "none");
  
  // Tail (more aggressive curve)
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M75 50 Q95 60 95 35");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(tail);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(mouth);
  svg.appendChild(upperTeeth);
  svg.appendChild(lowerTeeth);
  
  return svg;
}

function createRatDamagedSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body (tilted and squished as if hit)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "55");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "15");
  body.setAttribute("transform", "rotate(10, 50, 55)");
  body.setAttribute("fill", "#666");
  
  // Ears (drooping)
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M30 35 L25 45 L35 40 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M70 35 L75 45 L65 40 Z");
  rightEar.setAttribute("fill", "#666");
  
  // Eyes (swirly dizzy eyes)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M35 45 Q40 40 45 45 Q40 50 35 45");
  leftEye.setAttribute("stroke", "red");
  leftEye.setAttribute("stroke-width", "2");
  leftEye.setAttribute("fill", "none");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M55 45 Q60 40 65 45 Q60 50 55 45");
  rightEye.setAttribute("stroke", "red");
  rightEye.setAttribute("stroke-width", "2");
  rightEye.setAttribute("fill", "none");
  
  // Mouth (grimacing)
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M45 60 Q50 55 55 60");
  mouth.setAttribute("stroke", "#400");
  mouth.setAttribute("stroke-width", "2");
  mouth.setAttribute("fill", "none");
  
  // Stars/birds circling head
  const stars = document.createElementNS("http://www.w3.org/2000/svg", "path");
  stars.setAttribute("d", "M40 20 L42 25 L37 23 M60 25 L58 20 L63 22 M50 15 L53 19 L47 19");
  stars.setAttribute("stroke", "yellow");
  stars.setAttribute("stroke-width", "2");
  stars.setAttribute("fill", "none");
  
  // Tail (limp)
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M80 55 Q85 65 90 65");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  // Bandage
  const bandage = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bandage.setAttribute("d", "M35 35 L65 45 M33 38 L63 48");
  bandage.setAttribute("stroke", "white");
  bandage.setAttribute("stroke-width", "3");
  bandage.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(tail);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(bandage);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(mouth);
  svg.appendChild(stars);
  
  return svg;
}

function createRatDeadSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body (lying on side)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "60");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "15");
  body.setAttribute("transform", "rotate(90, 50, 60)");
  body.setAttribute("fill", "#666");
  
  // Ears (flopped)
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M45 35 L35 30 L40 40 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M55 35 L65 30 L60 40 Z");
  rightEar.setAttribute("fill", "#666");
  
  // X eyes
  const leftEyeX = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEyeX.setAttribute("d", "M35 45 L45 55 M45 45 L35 55");
  leftEyeX.setAttribute("stroke", "#400");
  leftEyeX.setAttribute("stroke-width", "2");
  
  const rightEyeX = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEyeX.setAttribute("d", "M55 45 L65 55 M65 45 L55 55");
  rightEyeX.setAttribute("stroke", "#400");
  rightEyeX.setAttribute("stroke-width", "2");
  
  // Mouth (straight line)
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M45 65 L55 65");
  mouth.setAttribute("stroke", "#400");
  mouth.setAttribute("stroke-width", "2");
  
  // Tail (limp on ground, connected to body)
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M50 90 Q55 90 60 90");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(tail);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEyeX);
  svg.appendChild(rightEyeX);
  svg.appendChild(mouth);
  
  return svg;
}

export function createRatHappySvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#666");
  
  // Ears (perked up and relaxed)
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M30 35 L25 20 L40 30 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M70 35 L75 20 L60 30 Z");
  rightEar.setAttribute("fill", "#666");
  
  // Happy squinted eyes
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M35 45 Q40 40 45 45");
  leftEye.setAttribute("stroke", "black");
  leftEye.setAttribute("stroke-width", "2");
  leftEye.setAttribute("fill", "none");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M55 45 Q60 40 65 45");
  rightEye.setAttribute("stroke", "black");
  rightEye.setAttribute("stroke-width", "2");
  rightEye.setAttribute("fill", "none");
  
  // Big happy/laughing mouth
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M40 55 Q50 65 60 55");
  mouth.setAttribute("stroke", "#400");
  mouth.setAttribute("stroke-width", "2");
  mouth.setAttribute("fill", "none");
  
  // Teeth showing in laugh
  const teeth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  teeth.setAttribute("d", "M43 57 L46 57 L49 57 L52 57 L55 57 L58 57");
  teeth.setAttribute("stroke", "white");
  teeth.setAttribute("stroke-width", "2");
  
  // Tail (curved up happily)
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M80 50 Q85 40 95 45");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(tail);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(mouth);
  svg.appendChild(teeth);
  
  return svg;
}

export function createRatDrunkSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");
  
  // Body (normal position)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#666");
  
  // Ears (uneven, one up one down)
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M35 35 L25 12 L40 35 Z");
  leftEar.setAttribute("fill", "#666");
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M60 35 L75 20 L55 30 Z");
  rightEar.setAttribute("transform", "rotate(30, 60, 30)");
  rightEar.setAttribute("fill", "#666");
  
  // Swirly dizzy eyes (asymmetrical)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M35 46.5 Q38 43.5 41 46.5 Q38 49.5 35 46.5");
  leftEye.setAttribute("transform", "rotate(5, 38, 46.5)");
  leftEye.setAttribute("stroke", "#400");
  leftEye.setAttribute("stroke-width", "2");
  leftEye.setAttribute("fill", "none");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M55 48 Q62 41 69 48 Q62 55 55 48");
  rightEye.setAttribute("transform", "rotate(15, 62, 48)");
  rightEye.setAttribute("stroke", "#400");
  rightEye.setAttribute("stroke-width", "2");
  rightEye.setAttribute("fill", "none");
  
  // Goofy smile
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M40 60 Q50 70 60 60 Q50 65 40 60");
  mouth.setAttribute("stroke", "#400");
  mouth.setAttribute("stroke-width", "2");
  mouth.setAttribute("fill", "none");
  
  // Tail (wavy/wobbly)
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", "M80 50 Q85 60 90 55 Q95 50 90 45");
  tail.setAttribute("stroke", "#666");
  tail.setAttribute("stroke-width", "4");
  tail.setAttribute("fill", "none");
  
  svg.appendChild(body);
  svg.appendChild(tail);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(mouth);
  
  return svg;
}

export class Rat {
  constructor() {
    this.create = createRatSvg;
    this.createAttack = createRatAttackSvg;
    this.createDamaged = createRatDamagedSvg;
    this.createDead = createRatDeadSvg;
    this.createHappy = createRatHappySvg;
    this.createDrunk = createRatDrunkSvg;
    
    this.maxHealth = 6;
    this.health = this.maxHealth;
    this.strength = 3;
    this.attacks = 1;
    this.xp = 2;
    this.size = 3;
  }

  nextAttack() {
    return { image: this.createAttack(), strength: this.strength, attacks: this.attacks };
  }
}