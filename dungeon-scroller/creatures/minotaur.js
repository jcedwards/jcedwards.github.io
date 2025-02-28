function createMinotaurSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M40 40 L35 80 L65 80 L60 40");
  body.setAttribute("fill", "#8B4513");
  
  // Head (bull-like)
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "30");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#8B4513");
  
  // Snout
  const snout = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  snout.setAttribute("x", "42.5");
  snout.setAttribute("y", "32.5");
  snout.setAttribute("width", "15");
  snout.setAttribute("height", "10");
  snout.setAttribute("rx", "5");
  snout.setAttribute("fill", "#A0522D");
  
  // Nose ring
  const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ring.setAttribute("cx", "50");
  ring.setAttribute("cy", "40");
  ring.setAttribute("r", "2");
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "#FFD700");
  ring.setAttribute("stroke-width", "1");
  
  // Horns
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M40 25 L25 15 L30 25");
  leftHorn.setAttribute("fill", "#8B4513");
  leftHorn.setAttribute("stroke", "#8B4513");
  leftHorn.setAttribute("stroke-width", "2");
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M60 25 L75 15 L70 25");
  rightHorn.setAttribute("fill", "#8B4513");
  rightHorn.setAttribute("stroke", "#8B4513");
  rightHorn.setAttribute("stroke-width", "2");
  
  // Eyes (angry)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "42");
  leftEye.setAttribute("cy", "25");
  leftEye.setAttribute("r", "2");
  leftEye.setAttribute("fill", "red");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "58");
  rightEye.setAttribute("cy", "25");
  rightEye.setAttribute("r", "2");
  rightEye.setAttribute("fill", "red");
  
  // Arms
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M40 45 L25 65");
  leftArm.setAttribute("stroke", "#8B4513");
  leftArm.setAttribute("stroke-width", "8");
  leftArm.setAttribute("stroke-linecap", "round");
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M60 45 L75 65");
  rightArm.setAttribute("stroke", "#8B4513");
  rightArm.setAttribute("stroke-width", "8");
  rightArm.setAttribute("stroke-linecap", "round");
  
  // Legs
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 80 L35 95");
  leftLeg.setAttribute("stroke", "#8B4513");
  leftLeg.setAttribute("stroke-width", "8");
  leftLeg.setAttribute("stroke-linecap", "round");
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 80 L65 95");
  rightLeg.setAttribute("stroke", "#8B4513");
  rightLeg.setAttribute("stroke-width", "8");
  rightLeg.setAttribute("stroke-linecap", "round");
  
  // Axe in right hand
  const axeHandle = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHandle.setAttribute("d", "M75 65 C76 60, 80 50, 85 42");
  axeHandle.setAttribute("stroke", "#8B4513");
  axeHandle.setAttribute("stroke-width", "4");
  axeHandle.setAttribute("fill", "none");
  
  // Axe head
  const axeHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHead.setAttribute("d", "M85 42 L98 36 C99 40, 99 45, 98 48 L85 42");
  axeHead.setAttribute("fill", "#C0C0C0");
  axeHead.setAttribute("stroke", "#808080");
  axeHead.setAttribute("stroke-width", "1");

  // Axe binding/wrap
  const axeBinding = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeBinding.setAttribute("d", "M83 47 L85 42");
  axeBinding.setAttribute("stroke", "#A52A2A");
  axeBinding.setAttribute("stroke-width", "6");
  axeBinding.setAttribute("stroke-linecap", "round");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(body);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(snout);
  svg.appendChild(leftHorn);
  svg.appendChild(rightHorn);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(ring);
  svg.appendChild(axeHandle);
  svg.appendChild(axeHead);
  svg.appendChild(axeBinding);
  
  return svg;
}

function createMinotaurAttackSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Body - twisted for the attack
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M38 40 L33 80 L63 80 L58 40");
  body.setAttribute("fill", "#8B4513");
  
  // Head (bull-like) - leaning forward for attack
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "48");
  head.setAttribute("cy", "32");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#8B4513");
  
  // Snout - keeping normal shape but positioned for attack
  const snout = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  snout.setAttribute("x", "40.5");
  snout.setAttribute("y", "32.5");
  snout.setAttribute("width", "15");
  snout.setAttribute("height", "10");
  snout.setAttribute("rx", "5");
  snout.setAttribute("fill", "#A0522D");
  
  // Open mouth for roaring (underneath snout) - smaller and rounded
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M43 43 C45 41, 51 41, 53 43");
  mouth.setAttribute("fill", "none");
  mouth.setAttribute("stroke", "#300000");
  mouth.setAttribute("stroke-width", "3");
  mouth.setAttribute("stroke-linecap", "round");
  
  // Nose ring
  const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ring.setAttribute("cx", "48");
  ring.setAttribute("cy", "40");
  ring.setAttribute("r", "2");
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "#FFD700");
  ring.setAttribute("stroke-width", "1");
  
  // Horns - angled forward for attack
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M38 27 L23 17 L28 27");
  leftHorn.setAttribute("fill", "#8B4513");
  leftHorn.setAttribute("stroke", "#8B4513");
  leftHorn.setAttribute("stroke-width", "2");
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M58 27 L73 17 L68 27");
  rightHorn.setAttribute("fill", "#8B4513");
  rightHorn.setAttribute("stroke", "#8B4513");
  rightHorn.setAttribute("stroke-width", "2");
  
  // Eyes (intense, angry)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "40");
  leftEye.setAttribute("cy", "27");
  leftEye.setAttribute("r", "2.5");
  leftEye.setAttribute("fill", "red");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "56");
  rightEye.setAttribute("cy", "27");
  rightEye.setAttribute("r", "2.5");
  rightEye.setAttribute("fill", "red");
  
  // Left arm - extended for balance
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M38 45 L20 60");
  leftArm.setAttribute("stroke", "#8B4513");
  leftArm.setAttribute("stroke-width", "8");
  leftArm.setAttribute("stroke-linecap", "round");
  
  // Right arm - swinging the axe across body (with outline for visibility)
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M58 45 L40 60");
  rightArm.setAttribute("stroke", "#8B4513");
  rightArm.setAttribute("stroke-width", "8");
  rightArm.setAttribute("stroke-linecap", "round");
  rightArm.setAttribute("stroke", "#8B4513");
  rightArm.setAttribute("stroke-width", "8");
  rightArm.setAttribute("stroke-linecap", "round");
  
  // Right arm outline for better visibility
  const rightArmOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArmOutline.setAttribute("d", "M58 45 L40 60");
  rightArmOutline.setAttribute("stroke", "#000000");
  rightArmOutline.setAttribute("stroke-width", "9");
  rightArmOutline.setAttribute("stroke-linecap", "round");
  rightArmOutline.setAttribute("stroke-opacity", "0.3");
  rightArmOutline.setAttribute("fill", "none");
  
  // Legs - planted in attack stance
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 80 L30 95");
  leftLeg.setAttribute("stroke", "#8B4513");
  leftLeg.setAttribute("stroke-width", "8");
  leftLeg.setAttribute("stroke-linecap", "round");
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 80 L70 95");
  rightLeg.setAttribute("stroke", "#8B4513");
  rightLeg.setAttribute("stroke-width", "8");
  rightLeg.setAttribute("stroke-linecap", "round");
  
  // Axe in right hand - mid-swing across body
  const axeHandle = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHandle.setAttribute("d", "M40 60 C35 55, 25 50, 20 40");
  axeHandle.setAttribute("stroke", "#8B4513");
  axeHandle.setAttribute("stroke-width", "4");
  axeHandle.setAttribute("fill", "none");
  
  // Axe head - mid-swing
  const axeHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHead.setAttribute("d", "M20 40 L7 34 C8 38, 8 43, 7 46 L20 40");
  axeHead.setAttribute("fill", "#C0C0C0");
  axeHead.setAttribute("stroke", "#808080");
  axeHead.setAttribute("stroke-width", "1");

  // Axe binding/wrap
  const axeBinding = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeBinding.setAttribute("d", "M18 45 L20 40");
  axeBinding.setAttribute("stroke", "#A52A2A");
  axeBinding.setAttribute("stroke-width", "6");
  axeBinding.setAttribute("stroke-linecap", "round");
  
  // Angry eyebrows - corrected angle to show proper anger
  const leftEyebrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEyebrow.setAttribute("d", "M36 22 L44 26");
  leftEyebrow.setAttribute("stroke", "#5D2906");
  leftEyebrow.setAttribute("stroke-width", "2");
  leftEyebrow.setAttribute("stroke-linecap", "round");
  
  const rightEyebrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEyebrow.setAttribute("d", "M52 26 L60 22");
  rightEyebrow.setAttribute("stroke", "#5D2906");
  rightEyebrow.setAttribute("stroke-width", "2");
  rightEyebrow.setAttribute("stroke-linecap", "round");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(body);
  svg.appendChild(rightArmOutline); // Add outline behind the arm
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(mouth);
  svg.appendChild(snout);
  svg.appendChild(leftHorn);
  svg.appendChild(rightHorn);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(leftEyebrow);
  svg.appendChild(rightEyebrow);
  svg.appendChild(ring);
  svg.appendChild(axeHandle);
  svg.appendChild(axeHead);
  svg.appendChild(axeBinding);
  
  return svg;
}

function createMinotaurDamagedSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Body - slightly leaning backward from the pull
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M40 42 L35 82 L65 82 L60 42");
  body.setAttribute("fill", "#8B4513");
  
  // Head (bull-like) - tilted upward from the pull
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "28");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#8B4513");
  
  // Snout - pulled upward
  const snout = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  snout.setAttribute("x", "42.5");
  snout.setAttribute("y", "27");
  snout.setAttribute("width", "15");
  snout.setAttribute("height", "10");
  snout.setAttribute("rx", "5");
  snout.setAttribute("transform", "rotate(-15, 50, 27)");
  snout.setAttribute("fill", "#A0522D");
  
  // Nose ring - pulled upward
  const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ring.setAttribute("cx", "52");
  ring.setAttribute("cy", "28");
  ring.setAttribute("r", "2");
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "#FFD700");
  ring.setAttribute("stroke-width", "1.5");
  
  // Horns
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M40 25 L25 15 L30 25");
  leftHorn.setAttribute("fill", "#8B4513");
  leftHorn.setAttribute("stroke", "#8B4513");
  leftHorn.setAttribute("stroke-width", "2");
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M60 25 L75 15 L70 25");
  rightHorn.setAttribute("fill", "#8B4513");
  rightHorn.setAttribute("stroke", "#8B4513");
  rightHorn.setAttribute("stroke-width", "2");
  
  // Eyes (pained expression - X shape)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M42 20 L46 24 M42 24 L46 20");
  leftEye.setAttribute("stroke", "red");
  leftEye.setAttribute("stroke-width", "1.5");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M55 21 L59 25 M55 25 L59 21");
  rightEye.setAttribute("stroke", "red");
  rightEye.setAttribute("stroke-width", "1.5");
  
  // Arms - pulled back slightly
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M40 47 L25 65");
  leftArm.setAttribute("stroke", "#8B4513");
  leftArm.setAttribute("stroke-width", "8");
  leftArm.setAttribute("stroke-linecap", "round");
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M60 47 L75 65");
  rightArm.setAttribute("stroke", "#8B4513");
  rightArm.setAttribute("stroke-width", "8");
  rightArm.setAttribute("stroke-linecap", "round");
  
  // Legs - slightly bent from the pull
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 82 L38 97");
  leftLeg.setAttribute("stroke", "#8B4513");
  leftLeg.setAttribute("stroke-width", "8");
  leftLeg.setAttribute("stroke-linecap", "round");
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 82 L62 97");
  rightLeg.setAttribute("stroke", "#8B4513");
  rightLeg.setAttribute("stroke-width", "8");
  rightLeg.setAttribute("stroke-linecap", "round");
  
  // Axe in right hand
  const axeHandle = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHandle.setAttribute("d", "M75 65 C76 60, 80 50, 85 42");
  axeHandle.setAttribute("stroke", "#8B4513");
  axeHandle.setAttribute("stroke-width", "4");
  axeHandle.setAttribute("fill", "none");
  
  // Axe head
  const axeHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHead.setAttribute("d", "M85 42 L98 36 C99 40, 99 45, 98 48 L85 42");
  axeHead.setAttribute("fill", "#C0C0C0");
  axeHead.setAttribute("stroke", "#808080");
  axeHead.setAttribute("stroke-width", "1");

  // Axe binding/wrap
  const axeBinding = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeBinding.setAttribute("d", "M83 47 L85 42");
  axeBinding.setAttribute("stroke", "#A52A2A");
  axeBinding.setAttribute("stroke-width", "6");
  axeBinding.setAttribute("stroke-linecap", "round");
  
  // Cut marks
  const cutMarks = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cutMarks.setAttribute("d", "M45 60 L55 55 M39 70 L44 67 M47 30 L43 34");
  cutMarks.setAttribute("stroke", "#AA0000");
  cutMarks.setAttribute("stroke-width", "1.5");
  cutMarks.setAttribute("stroke-linecap", "round");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(body);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(snout);
  svg.appendChild(leftHorn);
  svg.appendChild(rightHorn);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(ring);
  svg.appendChild(axeHandle);
  svg.appendChild(axeHead);
  svg.appendChild(axeBinding);
  svg.appendChild(cutMarks);
  
  return svg;
}

function createMinotaurDeadSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Body - slumped over
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M40 45 L35 85 L65 85 L60 45");
  body.setAttribute("fill", "#8B4513");
  body.setAttribute("transform", "rotate(5, 50, 50)");
  
  // Head (bull-like) - dropped forward
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "35");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#8B4513");
  
  // Snout - drooping downward
  const snout = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  snout.setAttribute("x", "42.5");
  snout.setAttribute("y", "40");
  snout.setAttribute("width", "15");
  snout.setAttribute("height", "10");
  snout.setAttribute("rx", "5");
  snout.setAttribute("transform", "rotate(15, 50, 40)");
  snout.setAttribute("fill", "#A0522D");
  
  // Nose ring - hanging
  const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  ring.setAttribute("cx", "50");
  ring.setAttribute("cy", "48");
  ring.setAttribute("r", "2");
  ring.setAttribute("fill", "none");
  ring.setAttribute("stroke", "#FFD700");
  ring.setAttribute("stroke-width", "1");
  
  // Horns - drooping with head
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M40 30 L25 20 L30 30");
  leftHorn.setAttribute("fill", "#8B4513");
  leftHorn.setAttribute("stroke", "#8B4513");
  leftHorn.setAttribute("stroke-width", "2");
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M60 30 L75 20 L70 30");
  rightHorn.setAttribute("fill", "#8B4513");
  rightHorn.setAttribute("stroke", "#8B4513");
  rightHorn.setAttribute("stroke-width", "2");
  
  // Eyes (X's to indicate death)
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M42 30 L46 34 M42 34 L46 30");
  leftEye.setAttribute("stroke", "#333");
  leftEye.setAttribute("stroke-width", "2");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M54 30 L58 34 M54 34 L58 30");
  rightEye.setAttribute("stroke", "#333");
  rightEye.setAttribute("stroke-width", "2");
  
  // Arms - limp and hanging
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M40 50 L30 70");
  leftArm.setAttribute("stroke", "#8B4513");
  leftArm.setAttribute("stroke-width", "8");
  leftArm.setAttribute("stroke-linecap", "round");
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M60 50 L70 70");
  rightArm.setAttribute("stroke", "#8B4513");
  rightArm.setAttribute("stroke-width", "8");
  rightArm.setAttribute("stroke-linecap", "round");
  
  // Legs - buckling
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M40 85 L30 95");
  leftLeg.setAttribute("stroke", "#8B4513");
  leftLeg.setAttribute("stroke-width", "8");
  leftLeg.setAttribute("stroke-linecap", "round");
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M60 85 L70 95");
  rightLeg.setAttribute("stroke", "#8B4513");
  rightLeg.setAttribute("stroke-width", "8");
  rightLeg.setAttribute("stroke-linecap", "round");
  
  // Axe - dropped
  const axeHandle = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHandle.setAttribute("d", "M75 75 L85 85");
  axeHandle.setAttribute("stroke", "#8B4513");
  axeHandle.setAttribute("stroke-width", "4");
  axeHandle.setAttribute("fill", "none");
  
  // Axe head - dropped
  const axeHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeHead.setAttribute("d", "M85 85 L95 80 C96 83, 96 87, 95 90 L85 85");
  axeHead.setAttribute("fill", "#C0C0C0");
  axeHead.setAttribute("stroke", "#808080");
  axeHead.setAttribute("stroke-width", "1");

  // Axe binding/wrap
  const axeBinding = document.createElementNS("http://www.w3.org/2000/svg", "path");
  axeBinding.setAttribute("d", "M83 88 L85 85");
  axeBinding.setAttribute("stroke", "#A52A2A");
  axeBinding.setAttribute("stroke-width", "6");
  axeBinding.setAttribute("stroke-linecap", "round");
  
  // Fatal wound marks
  const wounds = document.createElementNS("http://www.w3.org/2000/svg", "path");
  wounds.setAttribute("d", "M45 60 L55 60 M40 70 L50 70 M42 50 L48 55");
  wounds.setAttribute("stroke", "#8B0000");
  wounds.setAttribute("stroke-width", "2");
  wounds.setAttribute("stroke-linecap", "round");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(leftLeg);
  svg.appendChild(rightLeg);
  svg.appendChild(body);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(head);
  svg.appendChild(snout);
  svg.appendChild(leftHorn);
  svg.appendChild(rightHorn);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(ring);
  svg.appendChild(axeHandle);
  svg.appendChild(axeHead);
  svg.appendChild(axeBinding);
  svg.appendChild(wounds);
  
  return svg;
}

export class Minotaur {
  constructor() {
    this.create = createMinotaurSvg;
    this.createAttack = createMinotaurAttackSvg;
    this.createDamaged = createMinotaurDamagedSvg;
    this.createDead = createMinotaurDeadSvg;
    
    this.maxHealth = 172;
    this.health = this.maxHealth;
    this.strength = 65;
    this.attacks = 1;
    this.xp = 160;
    this.size = 8;
  }

  nextAttack() {
    return { image: this.createAttack(), strength: this.strength, attacks: this.attacks };
  }
}