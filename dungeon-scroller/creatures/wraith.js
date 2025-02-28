function createWraithSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Create a filter for the ghostly glow effect
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "ghostly-glow");
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-50%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "200%");
  
  const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  feGaussianBlur.setAttribute("stdDeviation", "2");
  feGaussianBlur.setAttribute("result", "blur");
  
  const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
  feComposite.setAttribute("in", "SourceGraphic");
  feComposite.setAttribute("in2", "blur");
  feComposite.setAttribute("operator", "atop");
  
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feComposite);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  // Main body/cloak - flowing ethereal form
  const cloak = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloak.setAttribute("d", "M50 20 C30 30, 20 50, 20 70 C20 85, 40 95, 50 95 C60 95, 80 85, 80 70 C80 50, 70 30, 50 20");
  cloak.setAttribute("fill", "#1a1a2e");
  cloak.setAttribute("opacity", "0.9");
  cloak.setAttribute("filter", "url(#ghostly-glow)");
  
  // Inner body/shroud - slightly lighter
  const innerShroud = document.createElementNS("http://www.w3.org/2000/svg", "path");
  innerShroud.setAttribute("d", "M50 25 C35 35, 27 50, 27 70 C27 82, 40 90, 50 90 C60 90, 73 82, 73 70 C73 50, 65 35, 50 25");
  innerShroud.setAttribute("fill", "#2a2a45");
  innerShroud.setAttribute("opacity", "0.7");
  
  // Ethereal wisp trails
  const wisps = [];
  const wispPaths = [
    "M30 85 C25 95, 15 90, 10 95",
    "M40 88 C35 98, 30 95, 25 99",
    "M60 88 C65 98, 70 95, 75 99",
    "M70 85 C75 95, 85 90, 90 95",
    "M45 90 C45 100, 55 100, 55 90"
  ];
  
  wispPaths.forEach(path => {
    const wisp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wisp.setAttribute("d", path);
    wisp.setAttribute("stroke", "#2a2a45");
    wisp.setAttribute("stroke-width", "2");
    wisp.setAttribute("fill", "none");
    wisp.setAttribute("opacity", "0.7");
    wisps.push(wisp);
  });
  
  // Hood shape
  const hood = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hood.setAttribute("d", "M30 40 C30 25, 50 15, 70 40");
  hood.setAttribute("stroke", "#1a1a2e");
  hood.setAttribute("stroke-width", "3");
  hood.setAttribute("fill", "none");
  
  // Shadowy face region
  const face = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  face.setAttribute("cx", "50");
  face.setAttribute("cy", "45");
  face.setAttribute("rx", "15");
  face.setAttribute("ry", "20");
  face.setAttribute("fill", "black");
  face.setAttribute("opacity", "0.8");
  
  // Glowing eyes
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "43");
  leftEye.setAttribute("cy", "42");
  leftEye.setAttribute("r", "3");
  leftEye.setAttribute("fill", "#6ef9f9");
  leftEye.setAttribute("opacity", "0.9");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "57");
  rightEye.setAttribute("cy", "42");
  rightEye.setAttribute("r", "3");
  rightEye.setAttribute("fill", "#6ef9f9");
  rightEye.setAttribute("opacity", "0.9");
  
  // Spectral arms/hands
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M35 60 C25 65, 15 75, 10 80");
  leftArm.setAttribute("stroke", "#2a2a45");
  leftArm.setAttribute("stroke-width", "3");
  leftArm.setAttribute("fill", "none");
  leftArm.setAttribute("opacity", "0.8");
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M65 60 C75 65, 85 75, 90 80");
  rightArm.setAttribute("stroke", "#2a2a45");
  rightArm.setAttribute("stroke-width", "3");
  rightArm.setAttribute("fill", "none");
  rightArm.setAttribute("opacity", "0.8");
  
  // Left skeletal hand
  const leftHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHand.setAttribute("d", "M10 80 L8 85 M10 80 L5 83 M10 80 L10 87 M10 80 L13 84");
  leftHand.setAttribute("stroke", "#6c6c8e");
  leftHand.setAttribute("stroke-width", "1.5");
  leftHand.setAttribute("opacity", "0.7");
  
  // Right skeletal hand
  const rightHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHand.setAttribute("d", "M90 80 L92 85 M90 80 L95 83 M90 80 L90 87 M90 80 L87 84");
  rightHand.setAttribute("stroke", "#6c6c8e");
  rightHand.setAttribute("stroke-width", "1.5");
  rightHand.setAttribute("opacity", "0.7");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(cloak);
  svg.appendChild(innerShroud);
  wisps.forEach(wisp => svg.appendChild(wisp));
  svg.appendChild(hood);
  svg.appendChild(face);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(leftHand);
  svg.appendChild(rightHand);
  
  return svg;
}

function createWraithAttackSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Create enhanced ghostly glow effect for attack mode
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  
  // Regular glow filter
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "ghostly-glow-attack");
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-50%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "200%");
  
  const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  feGaussianBlur.setAttribute("stdDeviation", "2.5");
  feGaussianBlur.setAttribute("result", "blur");
  
  const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
  feComposite.setAttribute("in", "SourceGraphic");
  feComposite.setAttribute("in2", "blur");
  feComposite.setAttribute("operator", "atop");
  
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feComposite);
  
  // Eye glow filter
  const eyeGlowFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  eyeGlowFilter.setAttribute("id", "eye-glow");
  eyeGlowFilter.setAttribute("x", "-100%");
  eyeGlowFilter.setAttribute("y", "-100%");
  eyeGlowFilter.setAttribute("width", "300%");
  eyeGlowFilter.setAttribute("height", "300%");
  
  const eyeBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  eyeBlur.setAttribute("stdDeviation", "2");
  eyeBlur.setAttribute("result", "eyeBlur");
  
  eyeGlowFilter.appendChild(eyeBlur);
  
  defs.appendChild(filter);
  defs.appendChild(eyeGlowFilter);
  svg.appendChild(defs);
  
  // Main body/cloak - more expanded, threatening posture
  const cloak = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloak.setAttribute("d", "M50 20 C25 30, 10 50, 15 75 C20 90, 40 95, 50 95 C60 95, 80 90, 85 75 C90 50, 75 30, 50 20");
  cloak.setAttribute("fill", "#1a1a2e");
  cloak.setAttribute("opacity", "0.9");
  cloak.setAttribute("filter", "url(#ghostly-glow-attack)");
  
  // Inner body/shroud - slightly expanded
  const innerShroud = document.createElementNS("http://www.w3.org/2000/svg", "path");
  innerShroud.setAttribute("d", "M50 25 C30 35, 20 50, 23 75 C25 87, 40 90, 50 90 C60 90, 75 87, 77 75 C80 50, 70 35, 50 25");
  innerShroud.setAttribute("fill", "#2a2a45");
  innerShroud.setAttribute("opacity", "0.7");
  
  // Ethereal wisp trails - more agitated
  const wisps = [];
  const wispPaths = [
    "M25 85 C15 95, 5 90, 0 95",
    "M35 88 C30 100, 20 95, 15 99",
    "M65 88 C70 100, 80 95, 85 99",
    "M75 85 C85 95, 95 90, 100 95",
    "M45 90 C45 105, 55 105, 55 90"
  ];
  
  wispPaths.forEach(path => {
    const wisp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wisp.setAttribute("d", path);
    wisp.setAttribute("stroke", "#2a2a45");
    wisp.setAttribute("stroke-width", "2.5");
    wisp.setAttribute("fill", "none");
    wisp.setAttribute("opacity", "0.8");
    wisps.push(wisp);
  });
  
  // Hood shape - more lowered, menacing
  const hood = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hood.setAttribute("d", "M25 42 C25 25, 50 10, 75 42");
  hood.setAttribute("stroke", "#1a1a2e");
  hood.setAttribute("stroke-width", "3.5");
  hood.setAttribute("fill", "none");
  
  // Shadowy face region - enlarged
  const face = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  face.setAttribute("cx", "50");
  face.setAttribute("cy", "45");
  face.setAttribute("rx", "18");
  face.setAttribute("ry", "22");
  face.setAttribute("fill", "black");
  face.setAttribute("opacity", "0.9");
  
  // Glowing eyes - larger, more intense
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftEye.setAttribute("cx", "42");
  leftEye.setAttribute("cy", "42");
  leftEye.setAttribute("r", "4");
  leftEye.setAttribute("fill", "#8fffff");
  leftEye.setAttribute("opacity", "1");
  leftEye.setAttribute("filter", "url(#eye-glow)");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "58");
  rightEye.setAttribute("cy", "42");
  rightEye.setAttribute("r", "4");
  rightEye.setAttribute("fill", "#8fffff");
  rightEye.setAttribute("opacity", "1");
  rightEye.setAttribute("filter", "url(#eye-glow)");
  
  // Spectral arms/hands - reaching forward for attack
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M35 60 C30 50, 25 45, 20 40");
  leftArm.setAttribute("stroke", "#2a2a45");
  leftArm.setAttribute("stroke-width", "4");
  leftArm.setAttribute("fill", "none");
  leftArm.setAttribute("opacity", "0.8");
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M65 60 C70 50, 75 45, 80 40");
  rightArm.setAttribute("stroke", "#2a2a45");
  rightArm.setAttribute("stroke-width", "4");
  rightArm.setAttribute("fill", "none");
  rightArm.setAttribute("opacity", "0.8");
  
  // Left skeletal hand - ready to grab
  const leftHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHand.setAttribute("d", "M20 40 L15 37 M20 40 L17 33 M20 40 L22 34 M20 40 L25 36");
  leftHand.setAttribute("stroke", "#8c8cae");
  leftHand.setAttribute("stroke-width", "2");
  leftHand.setAttribute("opacity", "0.8");
  
  // Right skeletal hand - ready to grab
  const rightHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHand.setAttribute("d", "M80 40 L85 37 M80 40 L83 33 M80 40 L78 34 M80 40 L75 36");
  rightHand.setAttribute("stroke", "#8c8cae");
  rightHand.setAttribute("stroke-width", "2");
  rightHand.setAttribute("opacity", "0.8");
  
  // Energy emanating from hands during attack
  const leftEnergyWisps = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEnergyWisps.setAttribute("d", "M20 40 C15 35, 10 38, 5 35 M20 40 C18 32, 12 30, 10 25");
  leftEnergyWisps.setAttribute("stroke", "#6ef9f9");
  leftEnergyWisps.setAttribute("stroke-width", "1");
  leftEnergyWisps.setAttribute("opacity", "0.6");
  
  const rightEnergyWisps = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEnergyWisps.setAttribute("d", "M80 40 C85 35, 90 38, 95 35 M80 40 C82 32, 88 30, 90 25");
  rightEnergyWisps.setAttribute("stroke", "#6ef9f9");
  rightEnergyWisps.setAttribute("stroke-width", "1");
  rightEnergyWisps.setAttribute("opacity", "0.6");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(cloak);
  svg.appendChild(innerShroud);
  wisps.forEach(wisp => svg.appendChild(wisp));
  svg.appendChild(hood);
  svg.appendChild(face);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(leftHand);
  svg.appendChild(rightHand);
  svg.appendChild(leftEnergyWisps);
  svg.appendChild(rightEnergyWisps);
  
  return svg;
}

function createWraithDamagedSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Create a disrupted ghostly effect
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "ghostly-damaged");
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-50%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "200%");
  
  const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  feGaussianBlur.setAttribute("stdDeviation", "3");
  feGaussianBlur.setAttribute("result", "blur");
  
  const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
  feComposite.setAttribute("in", "SourceGraphic");
  feComposite.setAttribute("in2", "blur");
  feComposite.setAttribute("operator", "atop");
  
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feComposite);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  // Main body/cloak - asymmetrical and disrupted
  const cloak = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloak.setAttribute("d", "M50 20 C25 30, 20 50, 15 75 C15 85, 40 95, 50 95 C60 95, 80 90, 75 75 C85 50, 75 30, 50 20");
  cloak.setAttribute("fill", "#1a1a2e");
  cloak.setAttribute("opacity", "0.7");
  cloak.setAttribute("filter", "url(#ghostly-damaged)");
  
  // Inner body/shroud - distorted
  const innerShroud = document.createElementNS("http://www.w3.org/2000/svg", "path");
  innerShroud.setAttribute("d", "M50 25 C30 35, 27 55, 25 75 C25 85, 40 90, 50 90 C60 90, 75 85, 75 75 C73 55, 70 35, 50 25");
  innerShroud.setAttribute("fill", "#2a2a45");
  innerShroud.setAttribute("opacity", "0.6");
  
  // Ethereal wisp trails - more chaotic
  const wisps = [];
  const wispPaths = [
    "M25 85 C20 95, 10 90, 5 95",
    "M40 88 C35 100, 30 95, 25 99",
    "M60 88 C65 100, 70 95, 75 99",
    "M75 85 C80 95, 90 90, 95 95",
    "M45 90 C45 105, 55 105, 55 90"
  ];
  
  wispPaths.forEach(path => {
    const wisp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wisp.setAttribute("d", path);
    wisp.setAttribute("stroke", "#2a2a45");
    wisp.setAttribute("stroke-width", "2");
    wisp.setAttribute("fill", "none");
    wisp.setAttribute("opacity", "0.5");
    wisps.push(wisp);
  });
  
  // Torn/disrupted areas in the cloak
  const tears = [];
  const tearPaths = [
    "M30 45 L40 55",
    "M60 50 L70 40",
    "M45 70 L55 80",
    "M25 60 L35 70"
  ];
  
  tearPaths.forEach(path => {
    const tear = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tear.setAttribute("d", path);
    tear.setAttribute("stroke", "#ddf9f9");
    tear.setAttribute("stroke-width", "1");
    tear.setAttribute("opacity", "0.6");
    tears.push(tear);
  });
  
  // Hood shape - tilted and asymmetrical
  const hood = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hood.setAttribute("d", "M25 45 C30 25, 50 15, 65 35");
  hood.setAttribute("stroke", "#1a1a2e");
  hood.setAttribute("stroke-width", "3");
  hood.setAttribute("fill", "none");
  
  // Shadowy face region - tilted slightly
  const face = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  face.setAttribute("cx", "47");
  face.setAttribute("cy", "45");
  face.setAttribute("rx", "15");
  face.setAttribute("ry", "20");
  face.setAttribute("transform", "rotate(-5, 47, 45)");
  face.setAttribute("fill", "black");
  face.setAttribute("opacity", "0.7");
  
  // One flickering/damaged eye, one normal
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M40 42 L38 40 M42 44 L40 42");
  leftEye.setAttribute("stroke", "#6ef9f9");
  leftEye.setAttribute("stroke-width", "2");
  leftEye.setAttribute("opacity", "0.7");
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightEye.setAttribute("cx", "54");
  rightEye.setAttribute("cy", "42");
  rightEye.setAttribute("r", "3");
  rightEye.setAttribute("fill", "#6ef9f9");
  rightEye.setAttribute("opacity", "0.6");
  
  // One dissipated arm, one normal
  const leftArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftArm.setAttribute("d", "M35 60 C25 65, 15 75, 10 80");
  leftArm.setAttribute("stroke", "#2a2a45");
  leftArm.setAttribute("stroke-width", "3");
  leftArm.setAttribute("fill", "none");
  leftArm.setAttribute("opacity", "0.4");  // More transparent
  leftArm.setAttribute("stroke-dasharray", "6,3");  // Dashed to show disruption
  
  const rightArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightArm.setAttribute("d", "M65 60 C75 65, 85 75, 90 80");
  rightArm.setAttribute("stroke", "#2a2a45");
  rightArm.setAttribute("stroke-width", "3");
  rightArm.setAttribute("fill", "none");
  rightArm.setAttribute("opacity", "0.8");
  
  // Left hand - more dissipated
  const leftHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHand.setAttribute("d", "M10 80 L8 85 M10 80 L5 83");
  leftHand.setAttribute("stroke", "#6c6c8e");
  leftHand.setAttribute("stroke-width", "1.5");
  leftHand.setAttribute("opacity", "0.4");
  
  // Right hand - normal
  const rightHand = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHand.setAttribute("d", "M90 80 L92 85 M90 80 L95 83 M90 80 L90 87 M90 80 L87 84");
  rightHand.setAttribute("stroke", "#6c6c8e");
  rightHand.setAttribute("stroke-width", "1.5");
  rightHand.setAttribute("opacity", "0.7");
  
  // Energy disruptions through the form
  const disruptions = document.createElementNS("http://www.w3.org/2000/svg", "path");
  disruptions.setAttribute("d", "M30 30 L70 60 M40 70 L60 30 M50 20 L50 80");
  disruptions.setAttribute("stroke", "#ddf9f9");
  disruptions.setAttribute("stroke-width", "1");
  disruptions.setAttribute("opacity", "0.4");
  disruptions.setAttribute("stroke-dasharray", "2,4");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(cloak);
  svg.appendChild(innerShroud);
  wisps.forEach(wisp => svg.appendChild(wisp));
  tears.forEach(tear => svg.appendChild(tear));
  svg.appendChild(disruptions);
  svg.appendChild(hood);
  svg.appendChild(face);
  svg.appendChild(leftEye);
  svg.appendChild(rightEye);
  svg.appendChild(leftArm);
  svg.appendChild(rightArm);
  svg.appendChild(leftHand);
  svg.appendChild(rightHand);
  
  return svg;
}

function createWraithDeadSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  
  // Create a filter for the dissolving effect
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "ghostly-dissolve");
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-50%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "200%");
  
  const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  feGaussianBlur.setAttribute("stdDeviation", "4");
  feGaussianBlur.setAttribute("result", "blur");
  
  filter.appendChild(feGaussianBlur);
  defs.appendChild(filter);
  svg.appendChild(defs);
  
  // Ectoplasm puddle on the ground
  const puddle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  puddle.setAttribute("cx", "50");
  puddle.setAttribute("cy", "85");
  puddle.setAttribute("rx", "40");
  puddle.setAttribute("ry", "10");
  puddle.setAttribute("fill", "#2a2a45");
  puddle.setAttribute("opacity", "0.7");
  puddle.setAttribute("filter", "url(#ghostly-dissolve)");
  
  // Smaller inner puddle with different color
  const innerPuddle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  innerPuddle.setAttribute("cx", "50");
  innerPuddle.setAttribute("cy", "85");
  innerPuddle.setAttribute("rx", "25");
  innerPuddle.setAttribute("ry", "6");
  innerPuddle.setAttribute("fill", "#3a3a55");
  innerPuddle.setAttribute("opacity", "0.6");
  
  // Remnants of the cloak - mostly dissolved
  const cloakRemnants = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloakRemnants.setAttribute("d", "M50 50 C35 55, 30 65, 30 80 C35 85, 45 88, 50 88 C55 88, 65 85, 70 80 C70 65, 65 55, 50 50");
  cloakRemnants.setAttribute("fill", "#1a1a2e");
  cloakRemnants.setAttribute("opacity", "0.4");
  cloakRemnants.setAttribute("filter", "url(#ghostly-dissolve)");
  
  // Dissolving wisps - escaping energy
  const wisps = [];
  const wispPaths = [
    "M40 60 C35 50, 30 40, 25 30",
    "M45 55 C45 45, 45 35, 45 25",
    "M55 55 C55 45, 55 35, 55 25",
    "M60 60 C65 50, 70 40, 75 30",
    "M50 50 C50 40, 50 30, 50 20"
  ];
  
  wispPaths.forEach(path => {
    const wisp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    wisp.setAttribute("d", path);
    wisp.setAttribute("stroke", "#6c6c8e");
    wisp.setAttribute("stroke-width", "1");
    wisp.setAttribute("stroke-dasharray", "2,4");
    wisp.setAttribute("fill", "none");
    wisp.setAttribute("opacity", "0.3");
    wisps.push(wisp);
  });
  
  // Fading remnants of the face - no eyes
  const faceRemnant = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  faceRemnant.setAttribute("cx", "50");
  faceRemnant.setAttribute("cy", "60");
  faceRemnant.setAttribute("rx", "10");
  faceRemnant.setAttribute("ry", "15");
  faceRemnant.setAttribute("fill", "black");
  faceRemnant.setAttribute("opacity", "0.2");
  
  // Ectoplasmic drips
  const drips = [];
  const dripPaths = [
    "M35 65 C35 70, 35 75, 35 80",
    "M45 60 C45 68, 45 76, 45 84",
    "M55 60 C55 68, 55 76, 55 84",
    "M65 65 C65 70, 65 75, 65 80"
  ];
  
  dripPaths.forEach(path => {
    const drip = document.createElementNS("http://www.w3.org/2000/svg", "path");
    drip.setAttribute("d", path);
    drip.setAttribute("stroke", "#3a3a55");
    drip.setAttribute("stroke-width", "2");
    drip.setAttribute("stroke-linecap", "round");
    drip.setAttribute("fill", "none");
    drip.setAttribute("opacity", "0.5");
    drips.push(drip);
  });
  
  // Small ectoplasm droplets
  const droplets = [];
  const dropletPositions = [
    {x: 35, y: 82}, {x: 42, y: 86}, {x: 50, y: 88},
    {x: 58, y: 86}, {x: 65, y: 82}, {x: 30, y: 75},
    {x: 70, y: 75}
  ];
  
  dropletPositions.forEach(pos => {
    const droplet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    droplet.setAttribute("cx", pos.x);
    droplet.setAttribute("cy", pos.y);
    droplet.setAttribute("r", Math.random() * 2 + 1);
    droplet.setAttribute("fill", "#3a3a55");
    droplet.setAttribute("opacity", "0.6");
    droplets.push(droplet);
  });
  
  // Final energy dissipation at the top
  const finalEnergy = document.createElementNS("http://www.w3.org/2000/svg", "path");
  finalEnergy.setAttribute("d", "M40 20 C45 15, 55 15, 60 20");
  finalEnergy.setAttribute("stroke", "#6ef9f9");
  finalEnergy.setAttribute("stroke-width", "1");
  finalEnergy.setAttribute("stroke-dasharray", "1,2");
  finalEnergy.setAttribute("fill", "none");
  finalEnergy.setAttribute("opacity", "0.2");
  
  // Add all elements to SVG in proper order (back to front)
  svg.appendChild(puddle);
  svg.appendChild(innerPuddle);
  droplets.forEach(droplet => svg.appendChild(droplet));
  svg.appendChild(cloakRemnants);
  svg.appendChild(faceRemnant);
  drips.forEach(drip => svg.appendChild(drip));
  wisps.forEach(wisp => svg.appendChild(wisp));
  svg.appendChild(finalEnergy);
  
  return svg;
}

export class Wraith {
  constructor() {
    this.create = createWraithSvg;
    this.createAttack = createWraithAttackSvg;
    this.createDamaged = createWraithDamagedSvg;
    this.createDead = createWraithDeadSvg;
    
    this.maxHealth = 90;
    this.health = this.maxHealth;
    this.strength = 20;
    this.attacks = 3;
    this.xp = 70;
    this.size = 7;
  }

  nextAttack() {
    return { image: this.createAttack(), strength: this.strength, attacks: this.attacks };
  }
}