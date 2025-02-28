function createGoblinSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M40 45 L35 80 L65 80 L60 45");
  body.setAttribute("fill", "#90EE90");

  // Arms
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M40 50 L25 65");
  leftArm.setAttribute("stroke", "#90EE90");
  leftArm.setAttribute("stroke-width", "5");
  leftArm.setAttribute("stroke-linecap", "round");

  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M60 50 L75 65");
  rightArm.setAttribute("stroke", "#90EE90");
  rightArm.setAttribute("stroke-width", "5");
  rightArm.setAttribute("stroke-linecap", "round");

  // Legs
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 80 L35 95");
  leftLeg.setAttribute("stroke", "#90EE90");
  leftLeg.setAttribute("stroke-width", "5");
  leftLeg.setAttribute("stroke-linecap", "round");

  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 80 L65 95");
  rightLeg.setAttribute("stroke", "#90EE90");
  rightLeg.setAttribute("stroke-width", "5");
  rightLeg.setAttribute("stroke-linecap", "round");

  // Spear
  const spearStick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  spearStick.setAttribute("x1", "75");
  spearStick.setAttribute("y1", "65");
  spearStick.setAttribute("x2", "90");
  spearStick.setAttribute("y2", "40");
  spearStick.setAttribute("stroke", "#8B4513");
  spearStick.setAttribute("stroke-width", "2");

  const spearHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  spearHead.setAttribute("d", "M90 40 L95 35 L92 42 L85 45 Z");
  spearHead.setAttribute("fill", "#A9A9A9");

  // Head
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "40");
  head.setAttribute("r", "20");
  head.setAttribute("fill", "#90EE90");

  // Ears
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M35 35 L25 25 L35 45 Z");
  leftEar.setAttribute("fill", "#90EE90");

  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M65 35 L75 25 L65 45 Z");
  rightEar.setAttribute("fill", "#90EE90");

  // Eyes
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "42");
  leftEye.setAttribute("cy", "35");
  leftEye.setAttribute("r", "4");
  leftEye.setAttribute("fill", "yellow");

  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "58");
  rightEye.setAttribute("cy", "35");
  rightEye.setAttribute("r", "4");
  rightEye.setAttribute("fill", "yellow");

  // Small nose
  const nose = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  nose.setAttribute("cx", "50");
  nose.setAttribute("cy", "42");
  nose.setAttribute("r", "2");
  nose.setAttribute("fill", "#006400");

  // Add all elements in correct order (back to front)
  svg.appendChild(spearStick);
  svg.appendChild(body);
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(nose);
  svg.appendChild(spearHead);

  return svg;
}

function createGoblinAttackSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  // Body - leaning forward for attack
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M45 45 L40 80 L70 80 L65 45");
  body.setAttribute("fill", "#90EE90");

  // Arms - right arm raised with spear
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M45 50 L30 65");
  leftArm.setAttribute("stroke", "#90EE90");
  leftArm.setAttribute("stroke-width", "5");
  leftArm.setAttribute("stroke-linecap", "round");

  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M65 50 L85 45"); // Raised arm
  rightArm.setAttribute("stroke", "#90EE90");
  rightArm.setAttribute("stroke-width", "5");
  rightArm.setAttribute("stroke-linecap", "round");

  // Legs in wider stance
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M45 80 L35 95");
  leftLeg.setAttribute("stroke", "#90EE90");
  leftLeg.setAttribute("stroke-width", "5");
  leftLeg.setAttribute("stroke-linecap", "round");

  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M65 80 L75 95");
  rightLeg.setAttribute("stroke", "#90EE90");
  rightLeg.setAttribute("stroke-width", "5");
  rightLeg.setAttribute("stroke-linecap", "round");

  // Spear in attack position
  const spearStick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  spearStick.setAttribute("x1", "85");
  spearStick.setAttribute("y1", "45");
  spearStick.setAttribute("x2", "95");
  spearStick.setAttribute("y2", "25");
  spearStick.setAttribute("stroke", "#8B4513");
  spearStick.setAttribute("stroke-width", "4");

  const spearHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  spearHead.setAttribute("d", "M95 25 L102 18 L98 30 L91 32 Z");
  spearHead.setAttribute("fill", "#A9A9A9");
  spearHead.setAttribute("stroke", "#808080");
  spearHead.setAttribute("stroke-width", "0.5");

  // Head - slightly tilted
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "55");
  head.setAttribute("cy", "40");
  head.setAttribute("r", "20");
  head.setAttribute("fill", "#90EE90");

  // Ears
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M40 35 L30 25 L40 45 Z");
  leftEar.setAttribute("fill", "#90EE90");

  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M70 35 L80 25 L70 45 Z");
  rightEar.setAttribute("fill", "#90EE90");

  // Eyes - angry expression
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "47");
  leftEye.setAttribute("cy", "35");
  leftEye.setAttribute("r", "3.5");
  leftEye.setAttribute("fill", "red");

  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "63");
  rightEye.setAttribute("cy", "35");
  rightEye.setAttribute("r", "3.5");
  rightEye.setAttribute("fill", "red");

  // Fix angry eyebrows - angled down toward center for aggression
  const leftEyebrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEyebrow.setAttribute("d", "M42 31 L52 34");
  leftEyebrow.setAttribute("stroke", "#006400");
  leftEyebrow.setAttribute("stroke-width", "2.5");
  leftEyebrow.setAttribute("stroke-linecap", "round");

  const rightEyebrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEyebrow.setAttribute("d", "M58 34 L68 31");
  rightEyebrow.setAttribute("stroke", "#006400");
  rightEyebrow.setAttribute("stroke-width", "2.5");
  rightEyebrow.setAttribute("stroke-linecap", "round");

  // Add all elements
  svg.appendChild(spearStick);
  svg.appendChild(body);
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(leftEar);
  svg.appendChild(rightEar);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(leftEyebrow);
  svg.appendChild(rightEyebrow);
  svg.appendChild(spearHead);

  return svg;
}

function createGoblinDamagedSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  // Body - slightly twisted
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M35 45 L30 80 L60 80 L55 45");
  body.setAttribute("fill", "#70CF70"); // Darker green to show damage

  // Arms - recoiling position
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M35 50 L20 45"); // Raised defensively
  leftArm.setAttribute("stroke", "#70CF70");
  leftArm.setAttribute("stroke-width", "5");
  leftArm.setAttribute("stroke-linecap", "round");

  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M55 50 L70 45");
  rightArm.setAttribute("stroke", "#70CF70");
  rightArm.setAttribute("stroke-width", "5");
  rightArm.setAttribute("stroke-linecap", "round");

  // Legs - stumbling position
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M35 80 L25 90");
  leftLeg.setAttribute("stroke", "#70CF70");
  leftLeg.setAttribute("stroke-width", "5");
  leftLeg.setAttribute("stroke-linecap", "round");

  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M55 80 L65 90");
  rightLeg.setAttribute("stroke", "#70CF70");
  rightLeg.setAttribute("stroke-width", "5");
  rightLeg.setAttribute("stroke-linecap", "round");

  // Dropped spear
  const spearStick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  spearStick.setAttribute("x1", "70");
  spearStick.setAttribute("y1", "85");
  spearStick.setAttribute("x2", "85");
  spearStick.setAttribute("y2", "75");
  spearStick.setAttribute("stroke", "#8B4513");
  spearStick.setAttribute("stroke-width", "2");

  const spearHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  spearHead.setAttribute("d", "M85 75 L90 70 L87 77 L80 80 Z");
  spearHead.setAttribute("fill", "#A9A9A9");

  // Head - tilted in pain
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "45");
  head.setAttribute("cy", "40");
  head.setAttribute("r", "20");
  head.setAttribute("fill", "#70CF70");

  // Stars to show dizziness
  const star1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  star1.setAttribute("x", "35");
  star1.setAttribute("y", "25");
  star1.setAttribute("fill", "yellow");
  star1.textContent = "✦";

  const star2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  star2.setAttribute("x", "55");
  star2.setAttribute("y", "20");
  star2.setAttribute("fill", "yellow");
  star2.textContent = "✦";

  // Eyes - spiral eyes for dizziness
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "text");
  leftEye.setAttribute("x", "37");
  leftEye.setAttribute("y", "38");
  leftEye.setAttribute("fill", "white");
  leftEye.textContent = "@";

  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "text");
  rightEye.setAttribute("x", "53");
  rightEye.setAttribute("y", "38");
  rightEye.setAttribute("fill", "white");
  rightEye.textContent = "@";

  // Add all elements
  svg.appendChild(spearStick);
  svg.appendChild(body);
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(star1);
  svg.appendChild(star2);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(spearHead);

  return svg;
}

function createGoblinDeadSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  // Body - lying flat
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M30 70 L70 70 L65 80 L35 80 Z");
  body.setAttribute("fill", "#506B50"); // Darker green for dead state

  // Arms - splayed out
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M35 75 L20 65");
  leftArm.setAttribute("stroke", "#506B50");
  leftArm.setAttribute("stroke-width", "5");
  leftArm.setAttribute("stroke-linecap", "round");

  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M65 75 L80 65");
  rightArm.setAttribute("stroke", "#506B50");
  rightArm.setAttribute("stroke-width", "5");
  rightArm.setAttribute("stroke-linecap", "round");

  // Legs - splayed out
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 80 L30 90");
  leftLeg.setAttribute("stroke", "#506B50");
  leftLeg.setAttribute("stroke-width", "5");
  leftLeg.setAttribute("stroke-linecap", "round");

  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 80 L70 90");
  rightLeg.setAttribute("stroke", "#506B50");
  rightLeg.setAttribute("stroke-width", "5");
  rightLeg.setAttribute("stroke-linecap", "round");

  // Broken spear
  const spearStick1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  spearStick1.setAttribute("x1", "85");
  spearStick1.setAttribute("y1", "85");
  spearStick1.setAttribute("x2", "90");
  spearStick1.setAttribute("y2", "80");
  spearStick1.setAttribute("stroke", "#8B4513");
  spearStick1.setAttribute("stroke-width", "2");

  const spearStick2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  spearStick2.setAttribute("x1", "92");
  spearStick2.setAttribute("y1", "78");
  spearStick2.setAttribute("x2", "95");
  spearStick2.setAttribute("y2", "75");
  spearStick2.setAttribute("stroke", "#8B4513");
  spearStick2.setAttribute("stroke-width", "2");

  // Head - on its side
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "65");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#506B50");

  // X eyes
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "text");
  leftEye.setAttribute("x", "42");
  leftEye.setAttribute("y", "68");
  leftEye.setAttribute("fill", "white");
  leftEye.textContent = "×";

  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "text");
  rightEye.setAttribute("x", "58");
  rightEye.setAttribute("y", "68");
  rightEye.setAttribute("fill", "white");
  rightEye.textContent = "×";

  // Add all elements
  svg.appendChild(spearStick1);
  svg.appendChild(spearStick2);
  svg.appendChild(body);
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);

  return svg;
}

export class Goblin {
  constructor() {
    this.create = createGoblinSvg;
    this.createAttack = createGoblinAttackSvg;
    this.createDamaged = createGoblinDamagedSvg;
    this.createDead = createGoblinDeadSvg;

    this.maxHealth = 15;
    this.health = this.maxHealth;
    this.strength = 16;
    this.attacks = 1;
    this.xp = 8;
    this.size = 4;
  }

  nextAttack() {
    return { image: this.createAttack(), strength: this.strength, attacks: this.attacks };
  }
}
