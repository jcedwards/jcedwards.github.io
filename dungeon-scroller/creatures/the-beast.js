function createBeastSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - now just filling the halo area
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "50");
  background.setAttribute("fill", "#4b4d8e");
  svg.appendChild(background);
  
  // Circular halo
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "50");
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#f5a442");
  halo.setAttribute("stroke-width", "2");
  svg.appendChild(halo);
  
  // Halo above head
  const topHalo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  topHalo.setAttribute("cx", "75");
  topHalo.setAttribute("cy", "35");
  topHalo.setAttribute("rx", "18");
  topHalo.setAttribute("ry", "3");
  topHalo.setAttribute("fill", "none");
  topHalo.setAttribute("stroke", "#f5a442");
  topHalo.setAttribute("stroke-width", "1.5");
  svg.appendChild(topHalo);
  
  // Cloud at bottom - fixing connection between top and bottom clouds
  const cloudTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudTop.setAttribute("d", "M30,115 Q45,105 60,110 Q75,100 90,110 Q105,105 120,115");
  cloudTop.setAttribute("fill", "#c4d7f2");
  svg.appendChild(cloudTop);
  
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M30,114 Q55,114 75,114 Q95,114 120,114 L120,130 Q95,135 75,135 Q55,135 30,130 Z");
  // Changed the top curve to be flatter (120 instead of 125) to connect better with cloudTop
  cloudBottom.setAttribute("fill", "#c4d7f2");
  svg.appendChild(cloudBottom);
  
  // Cross-legged posture (legs)
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M75,90 Q63,95 60,110 Q70,105 75,110");
  leftLeg.setAttribute("fill", "#e67e45");
  leftLeg.setAttribute("stroke", "#d16b35");
  leftLeg.setAttribute("stroke-width", "1");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M75,90 Q87,95 90,110 Q80,105 75,110");
  rightLeg.setAttribute("fill", "#e67e45");
  rightLeg.setAttribute("stroke", "#d16b35");
  rightLeg.setAttribute("stroke-width", "1");
  svg.appendChild(rightLeg);
  
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M65,75 Q75,73 85,75 Q90,85 85,100 Q75,105 65,100 Q60,85 65,75");
  body.setAttribute("fill", "#e67e45");
  svg.appendChild(body);
  
  // Belly
  const belly = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  belly.setAttribute("cx", "75");
  belly.setAttribute("cy", "92");
  belly.setAttribute("rx", "10");
  belly.setAttribute("ry", "8");
  belly.setAttribute("fill", "#d16b35");
  svg.appendChild(belly);
  
  // Navel
  const navel = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  navel.setAttribute("cx", "75");
  navel.setAttribute("cy", "94");
  navel.setAttribute("rx", "2");
  navel.setAttribute("ry", "1");
  navel.setAttribute("fill", "#9e3d62");
  svg.appendChild(navel);
  
  // Head with mask
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "55");
  head.setAttribute("rx", "16");
  head.setAttribute("ry", "18");
  head.setAttribute("fill", "#e67e45");
  svg.appendChild(head);
  
  // Face mask
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M65,45 Q75,35 85,45 Q85,60 75,65 Q65,60 65,45 Z");
  faceMask.setAttribute("fill", "#f08a45");
  svg.appendChild(faceMask);
  
  // Mask details (blue decorative elements)
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M65,45 Q75,38 85,45");
  maskTop.setAttribute("stroke", "#4a7abc");
  maskTop.setAttribute("stroke-width", "2");
  maskTop.setAttribute("fill", "none");
  svg.appendChild(maskTop);
  
  // mouth - changing from smile to slight frown
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M71,59 Q75,60 79,59");
  mouth.setAttribute("stroke", "#4a7abc");
  mouth.setAttribute("stroke-width", "1");
  mouth.setAttribute("fill", "none");
  svg.appendChild(mouth);
  
  // Orange facial hair tufts
  const leftTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftTuft.setAttribute("d", "M61,55 Q56,60 59,65");
  leftTuft.setAttribute("fill", "#f5742e");
  svg.appendChild(leftTuft);
  
  const rightTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightTuft.setAttribute("d", "M89,55 Q94,60 91,65");
  rightTuft.setAttribute("fill", "#f5742e");
  svg.appendChild(rightTuft);
  
  // Eyes - making them more closed, just barely open
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftEye.setAttribute("cx", "68");
  leftEye.setAttribute("cy", "50");
  leftEye.setAttribute("rx", "4");
  leftEye.setAttribute("ry", "1.5"); // Reduced height to make eyes more closed
  leftEye.setAttribute("fill", "#f5a442");
  svg.appendChild(leftEye);
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightEye.setAttribute("cx", "82");
  rightEye.setAttribute("cy", "50");
  rightEye.setAttribute("rx", "4");
  rightEye.setAttribute("ry", "1.5"); // Reduced height to make eyes more closed
  rightEye.setAttribute("fill", "#f5a442");
  svg.appendChild(rightEye);
  
  const leftPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftPupil.setAttribute("cx", "68");
  leftPupil.setAttribute("cy", "50");
  leftPupil.setAttribute("rx", "1.5");
  leftPupil.setAttribute("ry", "0.8"); // Reduced height for pupil
  leftPupil.setAttribute("fill", "#000");
  svg.appendChild(leftPupil);
  
  const rightPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightPupil.setAttribute("cx", "82");
  rightPupil.setAttribute("cy", "50");
  rightPupil.setAttribute("rx", "1.5");
  rightPupil.setAttribute("ry", "0.8"); // Reduced height for pupil
  rightPupil.setAttribute("fill", "#000");
  svg.appendChild(rightPupil);
  
  // Horns
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M59,40 Q45,25 53,15");
  leftHorn.setAttribute("stroke", "#a0b4d6");
  leftHorn.setAttribute("stroke-width", "6");
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(leftHorn);
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M91,40 Q105,25 97,15");
  rightHorn.setAttribute("stroke", "#a0b4d6");
  rightHorn.setAttribute("stroke-width", "6");
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(rightHorn);
  
  // Ears
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M59,55 Q52,60 55,68");
  leftEar.setAttribute("fill", "#9e3d62");
  svg.appendChild(leftEar);
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M91,55 Q98,60 95,68");
  rightEar.setAttribute("fill", "#9e3d62");
  svg.appendChild(rightEar);
  
  // Eight arms (four pairs)
  
  // Upper arms (pair 1) - outstretched with larger hands
  const upperArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmLeft.setAttribute("d", "M65,72 Q50,65 35,72");
  upperArmLeft.setAttribute("stroke", "#e67e45");
  upperArmLeft.setAttribute("stroke-width", "3.5");
  upperArmLeft.setAttribute("fill", "none");
  upperArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmLeft);
  
  // Upper arms with 50% larger hands
  const upperHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandLeft.setAttribute("d", "M35,72 Q29,68 28,76 Q34,78 35,72"); // Enlarged hand by 50%
  upperHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(upperHandLeft);
  
  const upperArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmRight.setAttribute("d", "M85,72 Q100,65 115,72");
  upperArmRight.setAttribute("stroke", "#e67e45");
  upperArmRight.setAttribute("stroke-width", "3.5");
  upperArmRight.setAttribute("fill", "none");
  upperArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmRight);
  
  // Upper arms with 50% larger hands
  const upperHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandRight.setAttribute("d", "M115,72 Q121,68 122,76 Q116,78 115,72"); // Enlarged hand by 50%
  upperHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(upperHandRight);
  
  // Middle arms (pair 2) with larger hands
  const middleArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmLeft.setAttribute("d", "M65,78 Q45,80 40,90");
  middleArmLeft.setAttribute("stroke", "#e67e45");
  middleArmLeft.setAttribute("stroke-width", "3.5");
  middleArmLeft.setAttribute("fill", "none");
  middleArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmLeft);
  
  // Middle arms with 50% larger hands
  const middleHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandLeft.setAttribute("d", "M40,90 Q34,91 37,97 Q43,94 40,90"); // Enlarged hand by 50%
  middleHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(middleHandLeft);
  
  const middleArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmRight.setAttribute("d", "M85,78 Q105,80 110,90");
  middleArmRight.setAttribute("stroke", "#e67e45");
  middleArmRight.setAttribute("stroke-width", "3.5");
  middleArmRight.setAttribute("fill", "none");
  middleArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmRight);
  
  // Middle arms with 50% larger hands
  const middleHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandRight.setAttribute("d", "M110,90 Q116,91 113,97 Q107,94 110,90"); // Enlarged hand by 50%
  middleHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(middleHandRight);
  
  // Lower arms (pair 3) with larger hands
  const lowerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmLeft.setAttribute("d", "M65,85 Q50,95 48,110");
  lowerArmLeft.setAttribute("stroke", "#e67e45");
  lowerArmLeft.setAttribute("stroke-width", "3.5");
  lowerArmLeft.setAttribute("fill", "none");
  lowerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmLeft);
  
  // Lower arms with 50% larger hands
  const lowerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandLeft.setAttribute("d", "M48,110 Q42,114 47,119 Q53,115 48,110"); // Enlarged hand by 50%
  lowerHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(lowerHandLeft);
  
  const lowerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmRight.setAttribute("d", "M85,85 Q100,95 102,110");
  lowerArmRight.setAttribute("stroke", "#e67e45");
  lowerArmRight.setAttribute("stroke-width", "3.5");
  lowerArmRight.setAttribute("fill", "none");
  lowerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmRight);
  
  // Lower arms with 50% larger hands
  const lowerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandRight.setAttribute("d", "M102,110 Q108,114 103,119 Q97,115 102,110"); // Enlarged hand by 50%
  lowerHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(lowerHandRight);

  // Center praying hands (pair 4)
  const centerArmLeftOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeftOutline.setAttribute("d", "M69,75 L69,85 L73,75 L73,71");
  centerArmLeftOutline.setAttribute("stroke", "#c16025");
  centerArmLeftOutline.setAttribute("stroke-width", "4.5");
  centerArmLeftOutline.setAttribute("fill", "none");
  centerArmLeftOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeftOutline);
  const centerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeft.setAttribute("d", "M69,75 L69,85 L73,75 L73,71");
  centerArmLeft.setAttribute("stroke", "#e67e45");
  centerArmLeft.setAttribute("stroke-width", "3");
  centerArmLeft.setAttribute("fill", "none");
  centerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeft);
  
  const centerArmRightOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRightOutline.setAttribute("d", "M81,75 L81,85 L77,75 L77,71");
  centerArmRightOutline.setAttribute("stroke", "#c16025");
  centerArmRightOutline.setAttribute("stroke-width", "4.5");
  centerArmRightOutline.setAttribute("fill", "none");
  centerArmRightOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRightOutline);
  const centerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRight.setAttribute("d", "M81,75 L81,85 L77,75 L77,71");
  centerArmRight.setAttribute("stroke", "#e67e45");
  centerArmRight.setAttribute("stroke-width", "3");
  centerArmRight.setAttribute("fill", "none");
  centerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRight);
  
  return svg;
}

function createBeastAttackSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - now just filling the halo area
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "55"); // Match the halo size
  background.setAttribute("fill", "#3a3c7d"); // Darker background for attack mode
  svg.appendChild(background);
  
  // Circular halo (glowing brighter during attack)
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "55"); // Slightly larger
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#f7b52e"); // Brighter
  halo.setAttribute("stroke-width", "3"); // Thicker
  svg.appendChild(halo);
  
  // Halo above head (glowing more intensely)
  const topHalo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  topHalo.setAttribute("cx", "75");
  topHalo.setAttribute("cy", "33"); // Slightly higher
  topHalo.setAttribute("rx", "20"); // Larger
  topHalo.setAttribute("ry", "4"); // Larger
  topHalo.setAttribute("fill", "none");
  topHalo.setAttribute("stroke", "#f7b52e"); // Brighter
  topHalo.setAttribute("stroke-width", "2"); // Thicker
  svg.appendChild(topHalo);
  
  // Cloud at bottom - more turbulent for attack
  const cloudTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudTop.setAttribute("d", "M25,115 Q45,103 60,108 Q75,98 90,108 Q105,103 125,115"); // Wider, more dynamic
  cloudTop.setAttribute("fill", "#d4e7ff");
  svg.appendChild(cloudTop);
  
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M25,114 Q55,114 75,114 Q95,114 125,114 L125,130 Q95,137 75,137 Q55,137 25,130 Z");
  cloudBottom.setAttribute("fill", "#d4e7ff");
  svg.appendChild(cloudBottom);
  
  // Legs position adjusted for attack stance
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M75,90 Q60,95 58,110 Q68,105 75,110");
  leftLeg.setAttribute("fill", "#f68945"); // Brighter orange for attack
  leftLeg.setAttribute("stroke", "#e17b35");
  leftLeg.setAttribute("stroke-width", "1");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M75,90 Q90,95 92,110 Q82,105 75,110");
  rightLeg.setAttribute("fill", "#f68945"); // Brighter orange for attack
  rightLeg.setAttribute("stroke", "#e17b35");
  rightLeg.setAttribute("stroke-width", "1");
  svg.appendChild(rightLeg);
  
  // Body - slightly bigger and more tense for attack
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M63,75 Q75,71 87,75 Q92,85 87,100 Q75,106 63,100 Q58,85 63,75");
  body.setAttribute("fill", "#f68945"); // Brighter orange for attack
  svg.appendChild(body);
  
  // Belly
  const belly = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  belly.setAttribute("cx", "75");
  belly.setAttribute("cy", "92");
  belly.setAttribute("rx", "11"); // Slightly larger
  belly.setAttribute("ry", "9"); // Slightly larger
  belly.setAttribute("fill", "#e17b35");
  svg.appendChild(belly);
  
  // Navel
  const navel = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  navel.setAttribute("cx", "75");
  navel.setAttribute("cy", "94");
  navel.setAttribute("rx", "2");
  navel.setAttribute("ry", "1");
  navel.setAttribute("fill", "#ae4d72");
  svg.appendChild(navel);
  
  // Head with mask - slightly lowered in attack posture
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "57"); // Slightly lower for attack stance
  head.setAttribute("rx", "18"); // Slightly larger
  head.setAttribute("ry", "20"); // Slightly larger
  head.setAttribute("fill", "#f68945"); // Brighter orange for attack
  svg.appendChild(head);
  
  // Face mask - more aggressive
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M63,47 Q75,35 87,47 Q87,62 75,68 Q63,62 63,47 Z");
  faceMask.setAttribute("fill", "#ff9a55"); // Brighter
  svg.appendChild(faceMask);
  
  // Mask details (blue decorative elements - now more pronounced)
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M63,47 Q75,40 87,47");
  maskTop.setAttribute("stroke", "#5a8acc");
  maskTop.setAttribute("stroke-width", "2.5"); // Thicker
  maskTop.setAttribute("fill", "none");
  svg.appendChild(maskTop);
  
  // mouth - changed to snarl/grimace for attack
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M70,64 Q75,60 80,64");
  mouth.setAttribute("stroke", "#5a8acc");
  mouth.setAttribute("stroke-width", "1.5"); // Thicker
  mouth.setAttribute("fill", "none");
  svg.appendChild(mouth);
  
  // Add teeth for attack mode
  const teeth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  teeth.setAttribute("d", "M72,63 L73,65 L75,63 L77,65 L78,63");
  teeth.setAttribute("stroke", "#ffffff");
  teeth.setAttribute("stroke-width", "1");
  teeth.setAttribute("fill", "none");
  svg.appendChild(teeth);
  
  // Orange facial hair tufts - more bristled for attack
  const leftTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftTuft.setAttribute("d", "M59,55 Q53,60 56,65");
  leftTuft.setAttribute("fill", "#ff843e"); // Brighter
  svg.appendChild(leftTuft);
  
  const rightTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightTuft.setAttribute("d", "M91,55 Q97,60 94,65");
  rightTuft.setAttribute("fill", "#ff843e");
  svg.appendChild(rightTuft);
  
  // Eyes - wide open and intense for attack
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftEye.setAttribute("cx", "68");
  leftEye.setAttribute("cy", "50");
  leftEye.setAttribute("rx", "5"); // Wider
  leftEye.setAttribute("ry", "3"); // More open
  leftEye.setAttribute("fill", "#ffa432"); // Brighter
  svg.appendChild(leftEye);
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightEye.setAttribute("cx", "82");
  rightEye.setAttribute("cy", "50");
  rightEye.setAttribute("rx", "5"); // Wider
  rightEye.setAttribute("ry", "3"); // More open
  rightEye.setAttribute("fill", "#ffa432"); // Brighter
  svg.appendChild(rightEye);
  
  const leftPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftPupil.setAttribute("cx", "68");
  leftPupil.setAttribute("cy", "50");
  leftPupil.setAttribute("rx", "2");
  leftPupil.setAttribute("ry", "2"); // Rounder for attack
  leftPupil.setAttribute("fill", "#000");
  svg.appendChild(leftPupil);
  
  const rightPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightPupil.setAttribute("cx", "82");
  rightPupil.setAttribute("cy", "50");
  rightPupil.setAttribute("rx", "2");
  rightPupil.setAttribute("ry", "2"); // Rounder for attack
  rightPupil.setAttribute("fill", "#000");
  svg.appendChild(rightPupil);
  
  // Horns - more pointed and aggressive
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M59,40 Q43,23 51,12");
  leftHorn.setAttribute("stroke", "#b0c4e6");
  leftHorn.setAttribute("stroke-width", "7"); // Thicker
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(leftHorn);
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M91,40 Q107,23 99,12");
  rightHorn.setAttribute("stroke", "#b0c4e6");
  rightHorn.setAttribute("stroke-width", "7"); // Thicker
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(rightHorn);
  
  // Energy sparks on horn tips for attack
  const leftHornTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  leftHornTip.setAttribute("cx", "51");
  leftHornTip.setAttribute("cy", "12");
  leftHornTip.setAttribute("r", "3");
  leftHornTip.setAttribute("fill", "#ffcc66");
  svg.appendChild(leftHornTip);
  
  const rightHornTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  rightHornTip.setAttribute("cx", "99");
  rightHornTip.setAttribute("cy", "12");
  rightHornTip.setAttribute("r", "3");
  rightHornTip.setAttribute("fill", "#ffcc66");
  svg.appendChild(rightHornTip);
  
  // Ears - more pointed for attack
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M59,55 Q50,59 54,68");
  leftEar.setAttribute("fill", "#ae4d72");
  svg.appendChild(leftEar);
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M91,55 Q100,59 96,68");
  rightEar.setAttribute("fill", "#ae4d72");
  svg.appendChild(rightEar);
  
  // Upper arms extended forward for attack
  const upperArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmLeft.setAttribute("d", "M65,72 Q40,55 25,60");
  upperArmLeft.setAttribute("stroke", "#f68945");
  upperArmLeft.setAttribute("stroke-width", "4");
  upperArmLeft.setAttribute("fill", "none");
  upperArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmLeft);
  
  // Upper arms with clawed hands for attack
  const upperHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandLeft.setAttribute("d", "M25,60 Q19,56 18,59 Q17,62 25,60 M24,57 L20,54 M27,58 L23,53"); // Added claws
  upperHandLeft.setAttribute("fill", "#f68945");
  upperHandLeft.setAttribute("stroke", "#e17b35");
  upperHandLeft.setAttribute("stroke-width", "1");
  svg.appendChild(upperHandLeft);
  
  const upperArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmRight.setAttribute("d", "M85,72 Q110,55 125,60");
  upperArmRight.setAttribute("stroke", "#f68945");
  upperArmRight.setAttribute("stroke-width", "4");
  upperArmRight.setAttribute("fill", "none");
  upperArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmRight);
  
  // Upper arms with clawed hands for attack
  const upperHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandRight.setAttribute("d", "M125,60 Q131,56 132,59 Q133,62 125,60 M126,57 L130,54 M123,58 L127,53"); // Added claws
  upperHandRight.setAttribute("fill", "#f68945");
  upperHandRight.setAttribute("stroke", "#e17b35");
  upperHandRight.setAttribute("stroke-width", "1");
  svg.appendChild(upperHandRight);
  
  // Middle arms extended for attack
  const middleArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmLeft.setAttribute("d", "M65,78 Q45,75 30,80");
  middleArmLeft.setAttribute("stroke", "#f68945");
  middleArmLeft.setAttribute("stroke-width", "4");
  middleArmLeft.setAttribute("fill", "none");
  middleArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmLeft);
  
  // Middle arms with clawed hands for attack
  const middleHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandLeft.setAttribute("d", "M30,80 Q24,78 23,82 Q26,86 30,80 M29,79 L24,76 M31,82 L27,77"); // Added claws
  middleHandLeft.setAttribute("fill", "#f68945");
  middleHandLeft.setAttribute("stroke", "#e17b35");
  middleHandLeft.setAttribute("stroke-width", "1");
  svg.appendChild(middleHandLeft);
  
  const middleArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmRight.setAttribute("d", "M85,78 Q105,75 120,80");
  middleArmRight.setAttribute("stroke", "#f68945");
  middleArmRight.setAttribute("stroke-width", "4");
  middleArmRight.setAttribute("fill", "none");
  middleArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmRight);
  
  // Middle arms with clawed hands for attack
  const middleHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandRight.setAttribute("d", "M120,80 Q126,78 127,82 Q124,86 120,80 M121,79 L126,76 M119,82 L123,77"); // Added claws
  middleHandRight.setAttribute("fill", "#f68945");
  middleHandRight.setAttribute("stroke", "#e17b35");
  middleHandRight.setAttribute("stroke-width", "1");
  svg.appendChild(middleHandRight);
  
  // Lower arms extended for attack
  const lowerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmLeft.setAttribute("d", "M65,85 Q45,90 35,100");
  lowerArmLeft.setAttribute("stroke", "#f68945");
  lowerArmLeft.setAttribute("stroke-width", "4");
  lowerArmLeft.setAttribute("fill", "none");
  lowerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmLeft);
  
  // Lower arms with clawed hands for attack
  const lowerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandLeft.setAttribute("d", "M35,100 Q30,104 30,108 Q36,106 35,100 M34,103 L30,101 M36,98 L32,95"); // Added claws
  lowerHandLeft.setAttribute("fill", "#f68945");
  lowerHandLeft.setAttribute("stroke", "#e17b35");
  lowerHandLeft.setAttribute("stroke-width", "1");
  svg.appendChild(lowerHandLeft);
  
  const lowerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmRight.setAttribute("d", "M85,85 Q105,90 102,100");
  lowerArmRight.setAttribute("stroke", "#f68945");
  lowerArmRight.setAttribute("stroke-width", "4");
  lowerArmRight.setAttribute("fill", "none");
  lowerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmRight);
  
  // Lower arms with clawed hands for attack
  const lowerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandRight.setAttribute("d", "M102,100 Q108,104 103,108 Q97,106 102,100 M104,103 L108,101 M103,98 L107,95"); // Added claws
  lowerHandRight.setAttribute("fill", "#f68945");
  lowerHandRight.setAttribute("stroke", "#e17b35");
  lowerHandRight.setAttribute("stroke-width", "1");
  svg.appendChild(lowerHandRight);
  
  // Energy attack effect
  const attackEnergy = document.createElementNS("http://www.w3.org/2000/svg", "path");
  attackEnergy.setAttribute("d", "M65,60 Q75,45 85,60 M65,65 Q75,50 85,65 M65,70 Q75,55 85,70");
  attackEnergy.setAttribute("stroke", "#ffcc66");
  attackEnergy.setAttribute("stroke-width", "2");
  attackEnergy.setAttribute("fill", "none");
  attackEnergy.setAttribute("opacity", "0.7");
  svg.appendChild(attackEnergy);


  // Center arms raised for attack
  const centerArmLeftOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeftOutline.setAttribute("d", "M70,75 Q67,67 65,60");
  centerArmLeftOutline.setAttribute("stroke", "#e07025");
  centerArmLeftOutline.setAttribute("stroke-width", "5");
  centerArmLeftOutline.setAttribute("fill", "none");
  centerArmLeftOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeftOutline);
  const centerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeft.setAttribute("d", "M70,75 Q67,67 65,60");
  centerArmLeft.setAttribute("stroke", "#f68945");
  centerArmLeft.setAttribute("stroke-width", "3.5");
  centerArmLeft.setAttribute("fill", "none");
  centerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeft);
  
  const centerArmRightOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRightOutline.setAttribute("d", "M80,75 Q83,67 85,60");
  centerArmRightOutline.setAttribute("stroke", "#e07025");
  centerArmRightOutline.setAttribute("stroke-width", "5");
  centerArmRightOutline.setAttribute("fill", "none");
  centerArmRightOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRightOutline);
  const centerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRight.setAttribute("d", "M80,75 Q83,67 85,60");
  centerArmRight.setAttribute("stroke", "#f68945");
  centerArmRight.setAttribute("stroke-width", "3.5");
  centerArmRight.setAttribute("fill", "none");
  centerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRight);
  
  // Center hands closed in attack
  const centerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  centerHandLeft.setAttribute("cx", "65");
  centerHandLeft.setAttribute("cy", "60");
  centerHandLeft.setAttribute("rx", "4.0");
  centerHandLeft.setAttribute("ry", "2.5"); 
  centerHandLeft.setAttribute("stroke", "#e07025");
  centerHandLeft.setAttribute("stroke-width", "0.75");
  centerHandLeft.setAttribute("fill", "#f68945");
  svg.appendChild(centerHandLeft);
  
  const centerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  centerHandRight.setAttribute("cx", "85");
  centerHandRight.setAttribute("cy", "60");
  centerHandRight.setAttribute("rx", "4.0");
  centerHandRight.setAttribute("ry", "2.5");
  centerHandRight.setAttribute("stroke", "#e07025");
  centerHandRight.setAttribute("stroke-width", "0.75");
  centerHandRight.setAttribute("fill", "#f68945");
  svg.appendChild(centerHandRight);
  
  return svg;
}

function createBeastDamagedSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - now just filling the halo area
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "48"); // Match the halo size
  background.setAttribute("fill", "#3e4073"); // Darker, desaturated background
  svg.appendChild(background);
  
  // Weakened circular halo - flickering/damaged
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "48");
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#c18335"); // Dimmer
  halo.setAttribute("stroke-width", "1.5");
  svg.appendChild(halo);
  
  // Damaged halo above head
  const topHalo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  topHalo.setAttribute("cx", "75");
  topHalo.setAttribute("cy", "38"); // Higher due to hunched posture
  topHalo.setAttribute("rx", "15");
  topHalo.setAttribute("ry", "2.5");
  topHalo.setAttribute("fill", "none");
  topHalo.setAttribute("stroke", "#c18335"); // Dimmer
  topHalo.setAttribute("stroke-width", "1");
  topHalo.setAttribute("stroke-dasharray", "2,2"); // Broken/interrupted halo
  svg.appendChild(topHalo);
  
  // Cloud at bottom - less vibrant
  const cloudTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudTop.setAttribute("d", "M30,115 Q45,105 60,110 Q75,100 90,110 Q105,105 120,115");
  cloudTop.setAttribute("fill", "#a4b7d2"); // Less vibrant cloud
  svg.appendChild(cloudTop);
  
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M30,114 Q55,114 75,114 Q95,114 120,114 L120,130 Q95,135 75,135 Q55,135 30,130 Z");
  cloudBottom.setAttribute("fill", "#a4b7d2"); // Less vibrant cloud
  svg.appendChild(cloudBottom);
  
  // Legs - one leg injured/twisted
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M75,90 Q60,100 55,115 Q70,110 75,110"); // Twisted leg
  leftLeg.setAttribute("fill", "#c66835");
  leftLeg.setAttribute("stroke", "#b15b25");
  leftLeg.setAttribute("stroke-width", "1");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M75,90 Q87,95 90,110 Q80,105 75,110");
  rightLeg.setAttribute("fill", "#c66835");
  rightLeg.setAttribute("stroke", "#b15b25");
  rightLeg.setAttribute("stroke-width", "1");
  svg.appendChild(rightLeg);
  
  // Body - hunched over and showing damage
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M65,75 Q75,80 85,75 Q90,90 85,100 Q75,105 65,100 Q60,90 65,75"); // Hunched forward
  body.setAttribute("fill", "#c66835"); // Less vibrant color
  svg.appendChild(body);
  
  // Belly - damaged
  const belly = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  belly.setAttribute("cx", "75");
  belly.setAttribute("cy", "94"); // Lower due to hunched posture
  belly.setAttribute("rx", "10");
  belly.setAttribute("ry", "8");
  belly.setAttribute("fill", "#b15b25");
  svg.appendChild(belly);
  
  // Navel
  const navel = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  navel.setAttribute("cx", "75");
  navel.setAttribute("cy", "96"); // Lower due to hunched posture
  navel.setAttribute("rx", "2");
  navel.setAttribute("ry", "1");
  navel.setAttribute("fill", "#8e2d52");
  svg.appendChild(navel);

  // Cracks/wounds on the body
  const bodyCrack1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bodyCrack1.setAttribute("d", "M68,82 L74,88");
  bodyCrack1.setAttribute("stroke", "#8a3a15");
  bodyCrack1.setAttribute("stroke-width", "1.5");
  svg.appendChild(bodyCrack1);
  
  const bodyCrack2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  bodyCrack2.setAttribute("d", "M82,85 L77,92");
  bodyCrack2.setAttribute("stroke", "#8a3a15");
  bodyCrack2.setAttribute("stroke-width", "1.5");
  svg.appendChild(bodyCrack2);
  
  // Head with mask - hunched down slightly
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "58"); // Lower due to hunched posture
  head.setAttribute("rx", "16");
  head.setAttribute("ry", "18");
  head.setAttribute("fill", "#c66835");
  svg.appendChild(head);
  
  // Crack on head
  const headCrack = document.createElementNS("http://www.w3.org/2000/svg", "path");
  headCrack.setAttribute("d", "M68,47 Q72,55 75,47");
  headCrack.setAttribute("stroke", "#8a3a15");
  headCrack.setAttribute("stroke-width", "1.5");
  headCrack.setAttribute("fill", "none");
  svg.appendChild(headCrack);
  
  // Face mask - damaged
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M65,48 Q75,38 85,48 Q85,63 75,68 Q65,63 65,48 Z");
  faceMask.setAttribute("fill", "#d07a35"); // Less vibrant
  svg.appendChild(faceMask);
  
  // Crack on mask
  const maskCrack = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskCrack.setAttribute("d", "M77,43 L82,50");
  maskCrack.setAttribute("stroke", "#8a3a15");
  maskCrack.setAttribute("stroke-width", "1.5");
  svg.appendChild(maskCrack);
  
  // Mask details (blue decorative elements)
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M65,48 Q75,41 85,48");
  maskTop.setAttribute("stroke", "#3a6aac"); // Dimmer
  maskTop.setAttribute("stroke-width", "1.5");
  maskTop.setAttribute("fill", "none");
  svg.appendChild(maskTop);
  
  // mouth - grimacing in pain
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M71,62 Q75,57 79,62"); // Grimace of pain
  mouth.setAttribute("stroke", "#3a6aac");
  mouth.setAttribute("stroke-width", "1");
  mouth.setAttribute("fill", "none");
  svg.appendChild(mouth);
  
  // Orange facial hair tufts - drooping
  const leftTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftTuft.setAttribute("d", "M61,55 Q54,62 57,67"); // Droopier
  leftTuft.setAttribute("fill", "#d5641e");
  svg.appendChild(leftTuft);
  
  const rightTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightTuft.setAttribute("d", "M89,55 Q96,62 93,67"); // Droopier
  rightTuft.setAttribute("fill", "#d5641e");
  svg.appendChild(rightTuft);
  
  // Eyes - squinting in pain
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftEye.setAttribute("cx", "68");
  leftEye.setAttribute("cy", "53"); // Lower due to hunched posture
  leftEye.setAttribute("rx", "4");
  leftEye.setAttribute("ry", "1"); // Nearly closed in pain
  leftEye.setAttribute("fill", "#d59432");
  svg.appendChild(leftEye);
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightEye.setAttribute("cx", "82");
  rightEye.setAttribute("cy", "53"); // Lower due to hunched posture
  rightEye.setAttribute("rx", "4");
  rightEye.setAttribute("ry", "1"); // Nearly closed in pain
  rightEye.setAttribute("fill", "#d59432");
  svg.appendChild(rightEye);
  
  const leftPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  leftPupil.setAttribute("cx", "68");
  leftPupil.setAttribute("cy", "53");
  leftPupil.setAttribute("rx", "1.5");
  leftPupil.setAttribute("ry", "0.5"); // Peering through squinted eyes
  leftPupil.setAttribute("fill", "#000");
  svg.appendChild(leftPupil);
  
  const rightPupil = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  rightPupil.setAttribute("cx", "82");
  rightPupil.setAttribute("cy", "53");
  rightPupil.setAttribute("rx", "1.5");
  rightPupil.setAttribute("ry", "0.5"); // Peering through squinted eyes
  rightPupil.setAttribute("fill", "#000");
  svg.appendChild(rightPupil);
  
  // Horns - one broken
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M59,43 Q45,28 51,20"); // Shorter broken horn
  leftHorn.setAttribute("stroke", "#90a4c6");
  leftHorn.setAttribute("stroke-width", "6");
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(leftHorn);
  
  // Broken horn fragment
  const leftHornBroken = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHornBroken.setAttribute("d", "M51,20 Q48,15 53,15");
  leftHornBroken.setAttribute("stroke", "#90a4c6");
  leftHornBroken.setAttribute("stroke-width", "4");
  leftHornBroken.setAttribute("fill", "none");
  leftHornBroken.setAttribute("stroke-linecap", "round");
  leftHornBroken.setAttribute("transform", "rotate(15, 51, 20)"); // Tilted broken piece
  svg.appendChild(leftHornBroken);
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M91,43 Q105,28 97,18");
  rightHorn.setAttribute("stroke", "#90a4c6");
  rightHorn.setAttribute("stroke-width", "6");
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(rightHorn);
  
  // Ears - one damaged
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M59,57 Q52,62 55,70");
  leftEar.setAttribute("fill", "#8e2d52");
  svg.appendChild(leftEar);
  
  // Torn ear
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M91,57 Q98,62 95,70");
  rightEar.setAttribute("fill", "#8e2d52");
  svg.appendChild(rightEar);
  
  const rightEarTear = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEarTear.setAttribute("d", "M95,63 L98,67");
  rightEarTear.setAttribute("stroke", "#6a1432");
  rightEarTear.setAttribute("stroke-width", "1.5");
  svg.appendChild(rightEarTear);
  
  // Arms - some limp/damaged
  
  // Upper arms - one hanging limp
  const upperArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmLeft.setAttribute("d", "M65,74 Q50,67 35,74");
  upperArmLeft.setAttribute("stroke", "#c66835");
  upperArmLeft.setAttribute("stroke-width", "3.5");
  upperArmLeft.setAttribute("fill", "none");
  upperArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmLeft);
  
  const upperHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandLeft.setAttribute("d", "M35,74 Q29,70 28,78 Q34,80 35,74");
  upperHandLeft.setAttribute("fill", "#c66835");
  svg.appendChild(upperHandLeft);
  
  // Drooping, damaged arm
  const upperArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmRight.setAttribute("d", "M85,74 Q95,80 98,95"); // Hanging limp
  upperArmRight.setAttribute("stroke", "#c66835");
  upperArmRight.setAttribute("stroke-width", "3.5");
  upperArmRight.setAttribute("fill", "none");
  upperArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmRight);
  
  const upperHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandRight.setAttribute("d", "M98,95 Q102,99 104,96 Q100,91 98,95"); // Hanging limp
  upperHandRight.setAttribute("fill", "#c66835");
  svg.appendChild(upperHandRight);
  
  // Middle arms 
  const middleArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmLeft.setAttribute("d", "M65,80 Q45,82 40,92");
  middleArmLeft.setAttribute("stroke", "#c66835");
  middleArmLeft.setAttribute("stroke-width", "3.5");
  middleArmLeft.setAttribute("fill", "none");
  middleArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmLeft);
  
  const middleHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandLeft.setAttribute("d", "M40,92 Q34,93 37,99 Q43,96 40,92");
  middleHandLeft.setAttribute("fill", "#c66835");
  svg.appendChild(middleHandLeft);
  
  // Severely damaged arm - bent at unnatural angle
  const middleArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmRight.setAttribute("d", "M85,80 Q105,85 105,100 Q102,105 100,103"); // Broken bend
  middleArmRight.setAttribute("stroke", "#c66835");
  middleArmRight.setAttribute("stroke-width", "3.5");
  middleArmRight.setAttribute("fill", "none");
  middleArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmRight);
  
  // Mangled hand
  const middleHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandRight.setAttribute("d", "M100,103 Q102,105 98,106 Q96,102 100,103");
  middleHandRight.setAttribute("fill", "#c66835");
  svg.appendChild(middleHandRight);
  
  // Lower arms
  const lowerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmLeft.setAttribute("d", "M65,87 Q50,97 48,112");
  lowerArmLeft.setAttribute("stroke", "#c66835");
  lowerArmLeft.setAttribute("stroke-width", "3.5");
  lowerArmLeft.setAttribute("fill", "none");
  lowerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmLeft);
  
  const lowerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandLeft.setAttribute("d", "M48,112 Q42,116 47,121 Q53,117 48,112");
  lowerHandLeft.setAttribute("fill", "#c66835");
  svg.appendChild(lowerHandLeft);
  
  // Missing lower right arm - just a stump
  const lowerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmRight.setAttribute("d", "M85,87 Q95,92 90,95"); // Just a stump
  lowerArmRight.setAttribute("stroke", "#c66835");
  lowerArmRight.setAttribute("stroke-width", "3.5");
  lowerArmRight.setAttribute("fill", "none");
  lowerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmRight);
  
  // Center praying hands - one arm limp/damaged
  const centerArmLeftOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeftOutline.setAttribute("d", "M69,77 L69,87 L73,85 L74,81");
  centerArmLeftOutline.setAttribute("stroke", "#a55825");
  centerArmLeftOutline.setAttribute("stroke-width", "4.5");
  centerArmLeftOutline.setAttribute("fill", "none");
  centerArmLeftOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeftOutline);
  const centerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeft.setAttribute("d", "M69,77 L69,87 L73,85 L74,81");
  centerArmLeft.setAttribute("stroke", "#c66835");
  centerArmLeft.setAttribute("stroke-width", "3");
  centerArmLeft.setAttribute("fill", "none");
  centerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeft);
  
  // Drooping damaged arm
  const centerArmRightOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRightOutline.setAttribute("d", "M80,77 L83,85 L78,87 L77,83");
  centerArmRightOutline.setAttribute("stroke", "#a55825");
  centerArmRightOutline.setAttribute("stroke-width", "4.5");
  centerArmRightOutline.setAttribute("fill", "none");
  centerArmRightOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRightOutline);
  const centerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRight.setAttribute("d", "M80,77 L83,85 L78,87 L77,83");
  centerArmRight.setAttribute("stroke", "#c66835");
  centerArmRight.setAttribute("stroke-width", "3");
  centerArmRight.setAttribute("fill", "none");
  centerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRight);

  return svg;
}

function createBeastAfraidSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - slightly darker for afraid state
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "48");
  background.setAttribute("fill", "#4b4d8e"); // Updated to match createBeastSvg
  svg.appendChild(background);
  
  // Circular halo - dimmer but solid in fear
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "48");
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#f5a442"); // Updated to match createBeastSvg
  halo.setAttribute("stroke-width", "1.5");
  svg.appendChild(halo);
  
  // Halo above head - dimmer but solid
  const topHalo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  topHalo.setAttribute("cx", "65");
  topHalo.setAttribute("cy", "37");
  topHalo.setAttribute("rx", "17");
  topHalo.setAttribute("ry", "2.5");
  topHalo.setAttribute("fill", "none");
  topHalo.setAttribute("stroke", "#f5a442"); // Updated to match createBeastSvg
  topHalo.setAttribute("stroke-width", "1.5");
  topHalo.setAttribute("transform", "rotate(-15, 65, 37)");
  svg.appendChild(topHalo);
  
  // Cloud at bottom - trembling
  const cloudTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudTop.setAttribute("d", "M30,115 Q45,105 60,110 Q75,100 90,110 Q105,105 120,115");
  cloudTop.setAttribute("fill", "#c4d7f2"); // Updated to match createBeastSvg
  svg.appendChild(cloudTop);
  
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M30,114 Q55,114 75,114 Q95,114 120,114 L120,130 Q95,135 75,135 Q55,135 30,130 Z");
  cloudBottom.setAttribute("fill", "#c4d7f2"); // Updated to match createBeastSvg
  svg.appendChild(cloudBottom);
  
  // Legs drawn closer together in fear
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M75,90 Q68,95 65,110 Q70,105 75,110");
  leftLeg.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  leftLeg.setAttribute("stroke", "#d16b35"); // Updated to match createBeastSvg
  leftLeg.setAttribute("stroke-width", "1");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M75,90 Q82,95 85,110 Q80,105 75,110");
  rightLeg.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  rightLeg.setAttribute("stroke", "#d16b35"); // Updated to match createBeastSvg
  rightLeg.setAttribute("stroke-width", "1");
  svg.appendChild(rightLeg);
  
  // Body - hunched and contracted in fear
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M65,77 Q75,74 85,77 Q89,87 85,100 Q75,105 65,100 Q61,87 65,77");
  body.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(body);
  
  // Slightly shaking belly
  const belly = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  belly.setAttribute("cx", "75");
  belly.setAttribute("cy", "93");
  belly.setAttribute("rx", "9");
  belly.setAttribute("ry", "7");
  belly.setAttribute("fill", "#d16b35"); // Updated to match createBeastSvg
  svg.appendChild(belly);
  
  // Navel
  const navel = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  navel.setAttribute("cx", "75");
  navel.setAttribute("cy", "95");
  navel.setAttribute("rx", "2");
  navel.setAttribute("ry", "1");
  navel.setAttribute("fill", "#9e3d62"); // Already matches createBeastSvg
  svg.appendChild(navel);
  
  // Head with mask - cowering and turned away slightly
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "70"); // Shifted to show turning away
  head.setAttribute("cy", "56"); // Lower position
  head.setAttribute("rx", "16");
  head.setAttribute("ry", "18");
  head.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  head.setAttribute("transform", "rotate(-15, 70, 56)"); // Turned away slightly
  svg.appendChild(head);
  
  // Face mask - tense expression, turned away
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M60,46 Q70,36 80,46 Q80,61 70,66 Q60,61 60,46 Z");
  faceMask.setAttribute("fill", "#f08a45"); // Updated to match createBeastSvg
  faceMask.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(faceMask);
  
  // Mask details
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M60,46 Q70,39 80,46");
  maskTop.setAttribute("stroke", "#4a7abc"); // Updated to match createBeastSvg
  maskTop.setAttribute("stroke-width", "1.5");
  maskTop.setAttribute("fill", "none");
  maskTop.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(maskTop);
  
  // Mouth - wincing expression
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M66,60 Q70,58 74,60");
  mouth.setAttribute("stroke", "#4a7abc"); // Updated to match createBeastSvg
  mouth.setAttribute("stroke-width", "1");
  mouth.setAttribute("fill", "none");
  mouth.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(mouth);
  
  // Orange facial hair tufts - moved with head
  const leftTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftTuft.setAttribute("d", "M56,55 Q51,60 54,65");
  leftTuft.setAttribute("fill", "#f5742e"); // Updated to match createBeastSvg
  leftTuft.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(leftTuft);
  
  const rightTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightTuft.setAttribute("d", "M84,55 Q89,60 86,65");
  rightTuft.setAttribute("fill", "#f5742e"); // Updated to match createBeastSvg
  rightTuft.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(rightTuft);
  
  // Eyes - closed tightly in fear
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M58,51 Q62,48 66,51");
  leftEye.setAttribute("stroke", "#f5a442"); // Updated to match createBeastSvg eyes fill color
  leftEye.setAttribute("stroke-width", "1");
  leftEye.setAttribute("fill", "none");
  leftEye.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(leftEye);
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M72,51 Q76,48 80,51");
  rightEye.setAttribute("stroke", "#f5a442"); // Updated to match createBeastSvg eyes fill color
  rightEye.setAttribute("stroke-width", "1");
  rightEye.setAttribute("fill", "none");
  rightEye.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(rightEye);
  
  // Horns - turned with head
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M54,41 Q40,30 48,20");
  leftHorn.setAttribute("stroke", "#a0b4d6"); // Already matches createBeastSvg
  leftHorn.setAttribute("stroke-width", "6");
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  leftHorn.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(leftHorn);
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M86,41 Q100,30 92,20");
  rightHorn.setAttribute("stroke", "#a0b4d6"); // Already matches createBeastSvg
  rightHorn.setAttribute("stroke-width", "6");
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  rightHorn.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(rightHorn);
  
  // Ears - flattened back in fear, turned with head
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M54,56 Q48,59 51,66");
  leftEar.setAttribute("fill", "#9e3d62"); // Already matches createBeastSvg
  leftEar.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(leftEar);
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M86,56 Q92,59 89,66");
  rightEar.setAttribute("fill", "#9e3d62"); // Already matches createBeastSvg
  rightEar.setAttribute("transform", "rotate(-15, 70, 56)"); // Matches head tilt
  svg.appendChild(rightEar);
  
  // Arms in protective positions
  
  // Center arm protecting face
  const centerArmLeftOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeftOutline.setAttribute("d", "M70,75 Q60,65 60,55");
  centerArmLeftOutline.setAttribute("fill", "none");
  centerArmLeftOutline.setAttribute("stroke", "#c16025"); // Updated to match createBeastSvg centerArmLeftOutline
  centerArmLeftOutline.setAttribute("stroke-width", "4.5");
  centerArmLeftOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeftOutline);
  const centerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeft.setAttribute("d", "M70,75 Q60,65 60,55");
  centerArmLeft.setAttribute("fill", "none");
  centerArmLeft.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  centerArmLeft.setAttribute("stroke-width", "3");
  centerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeft);
  
  // Hand covering face area
  const centerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  centerHandLeft.setAttribute("cx", "60");
  centerHandLeft.setAttribute("cy", "55");
  centerHandLeft.setAttribute("rx", "4");
  centerHandLeft.setAttribute("ry", "3");
  centerHandLeft.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  centerHandLeft.setAttribute("stroke-width", "0.75");
  centerHandLeft.setAttribute("stroke", "#c16025"); // Updated to match createBeastSvg
  svg.appendChild(centerHandLeft);
  
  // Second arm protecting head
  const centerArmRightOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRightOutline.setAttribute("d", "M80,75 Q88,62 83,50");
  centerArmRightOutline.setAttribute("fill", "none");
  centerArmRightOutline.setAttribute("stroke", "#c16025"); // Updated to match createBeastSvg
  centerArmRightOutline.setAttribute("stroke-width", "4.5");
  centerArmRightOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRightOutline);
  const centerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRight.setAttribute("d", "M80,75 Q88,62 83,50");
  centerArmRight.setAttribute("fill", "none");
  centerArmRight.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  centerArmRight.setAttribute("stroke-width", "3");
  centerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRight);
  
  // Hand covering head area
  const centerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  centerHandRight.setAttribute("cx", "83");
  centerHandRight.setAttribute("cy", "50");
  centerHandRight.setAttribute("rx", "4");
  centerHandRight.setAttribute("ry", "3");
  centerHandRight.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  centerHandRight.setAttribute("stroke-width", "0.75");
  centerHandRight.setAttribute("stroke", "#c16025"); // Updated to match createBeastSvg
  svg.appendChild(centerHandRight);
  
  // Upper arms wrapped around self protectively
  const upperArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmLeft.setAttribute("d", "M65,72 Q50,70 45,80");
  upperArmLeft.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  upperArmLeft.setAttribute("stroke-width", "3.5");
  upperArmLeft.setAttribute("fill", "none");
  upperArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmLeft);
  
  const upperHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandLeft.setAttribute("d", "M45,80 Q41,84 45,87 Q49,83 45,80");
  upperHandLeft.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(upperHandLeft);
  
  const upperArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmRight.setAttribute("d", "M85,72 Q100,70 105,80");
  upperArmRight.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  upperArmRight.setAttribute("stroke-width", "3.5");
  upperArmRight.setAttribute("fill", "none");
  upperArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmRight);
  
  const upperHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandRight.setAttribute("d", "M105,80 Q109,84 105,87 Q101,83 105,80");
  upperHandRight.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(upperHandRight);
  
  // Middle arms - shielding the body
  const middleArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmLeft.setAttribute("d", "M65,78 Q52,82 48,92");
  middleArmLeft.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  middleArmLeft.setAttribute("stroke-width", "3.5");
  middleArmLeft.setAttribute("fill", "none");
  middleArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmLeft);
  
  const middleHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandLeft.setAttribute("d", "M48,92 Q44,96 47,100 Q52,97 48,92");
  middleHandLeft.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(middleHandLeft);
  
  const middleArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmRight.setAttribute("d", "M85,78 Q98,82 102,92");
  middleArmRight.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  middleArmRight.setAttribute("stroke-width", "3.5");
  middleArmRight.setAttribute("fill", "none");
  middleArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmRight);
  
  const middleHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandRight.setAttribute("d", "M102,92 Q106,96 103,100 Q98,97 102,92");
  middleHandRight.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(middleHandRight);
  
  // Lower arms - clutched close to body
  const lowerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmLeft.setAttribute("d", "M65,85 Q60,95 63,105");
  lowerArmLeft.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  lowerArmLeft.setAttribute("stroke-width", "3.5");
  lowerArmLeft.setAttribute("fill", "none");
  lowerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmLeft);
  
  const lowerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandLeft.setAttribute("d", "M63,105 Q60,109 64,112 Q67,108 63,105");
  lowerHandLeft.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(lowerHandLeft);
  
  const lowerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmRight.setAttribute("d", "M85,85 Q90,95 87,105");
  lowerArmRight.setAttribute("stroke", "#e67e45"); // Updated to match createBeastSvg
  lowerArmRight.setAttribute("stroke-width", "3.5");
  lowerArmRight.setAttribute("fill", "none");
  lowerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmRight);
  
  const lowerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandRight.setAttribute("d", "M87,105 Q90,109 86,112 Q83,108 87,105");
  lowerHandRight.setAttribute("fill", "#e67e45"); // Updated to match createBeastSvg
  svg.appendChild(lowerHandRight);
  
  return svg;
}

function createBeastSolemnSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - now just filling the halo area
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "50");
  background.setAttribute("fill", "#4b4d8e");
  svg.appendChild(background);
  
  // Circular halo
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "50");
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#f5a442");
  halo.setAttribute("stroke-width", "2");
  svg.appendChild(halo);
  
  // Halo above head
  const topHalo = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  topHalo.setAttribute("cx", "75");
  topHalo.setAttribute("cy", "35");
  topHalo.setAttribute("rx", "18");
  topHalo.setAttribute("ry", "3");
  topHalo.setAttribute("fill", "none");
  topHalo.setAttribute("stroke", "#f5a442");
  topHalo.setAttribute("stroke-width", "1.5");
  svg.appendChild(topHalo);
  
  // Cloud at bottom
  const cloudTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudTop.setAttribute("d", "M30,115 Q45,105 60,110 Q75,100 90,110 Q105,105 120,115");
  cloudTop.setAttribute("fill", "#c4d7f2");
  svg.appendChild(cloudTop);
  
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M30,114 Q55,114 75,114 Q95,114 120,114 L120,130 Q95,135 75,135 Q55,135 30,130 Z");
  cloudBottom.setAttribute("fill", "#c4d7f2");
  svg.appendChild(cloudBottom);
  
  // Legs
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M75,90 Q65,95 65,110 Q70,105 75,110");
  leftLeg.setAttribute("fill", "#e67e45");
  leftLeg.setAttribute("stroke", "#d16b35");
  leftLeg.setAttribute("stroke-width", "1");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M75,90 Q85,95 85,110 Q80,105 75,110");
  rightLeg.setAttribute("fill", "#e67e45");
  rightLeg.setAttribute("stroke", "#d16b35");
  rightLeg.setAttribute("stroke-width", "1");
  svg.appendChild(rightLeg);
  
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
  body.setAttribute("d", "M65,75 Q75,71 85,75 Q90,85 85,100 Q75,105 65,100 Q60,85 65,75");
  body.setAttribute("fill", "#e67e45");
  svg.appendChild(body);
  
  // Belly
  const belly = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  belly.setAttribute("cx", "75");
  belly.setAttribute("cy", "92");
  belly.setAttribute("rx", "10");
  belly.setAttribute("ry", "8");
  belly.setAttribute("fill", "#d16b35");
  svg.appendChild(belly);
  
  // Navel
  const navel = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  navel.setAttribute("cx", "75");
  navel.setAttribute("cy", "95");
  navel.setAttribute("rx", "2");
  navel.setAttribute("ry", "1");
  navel.setAttribute("fill", "#9e3d62");
  svg.appendChild(navel);
  
  // Head
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "55");
  head.setAttribute("rx", "16");
  head.setAttribute("ry", "18");
  head.setAttribute("fill", "#e67e45");
  svg.appendChild(head);
  
  // Face mask
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M65,45 Q75,35 85,45 Q85,60 75,65 Q65,60 65,45 Z");
  faceMask.setAttribute("fill", "#f08a45");
  svg.appendChild(faceMask);
  
  // Mask details
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M65,45 Q75,38 85,45");
  maskTop.setAttribute("stroke", "#4a7abc");
  maskTop.setAttribute("stroke-width", "1.5");
  maskTop.setAttribute("fill", "none");
  svg.appendChild(maskTop);
  
  // Mouth - slightly curved down for a more solemn expression
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M70,60 Q75,58.5 80,60");
  mouth.setAttribute("stroke", "#4a7abc");
  mouth.setAttribute("stroke-width", "1.5");
  mouth.setAttribute("fill", "none");
  svg.appendChild(mouth);
  
  // Orange facial hair tufts
  const leftTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftTuft.setAttribute("d", "M59,55 Q53,60 56,65");
  leftTuft.setAttribute("fill", "#f5742e");
  svg.appendChild(leftTuft);
  
  const rightTuft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightTuft.setAttribute("d", "M91,55 Q97,60 94,65");
  rightTuft.setAttribute("fill", "#f5742e");
  svg.appendChild(rightTuft);
  
  // Eyes - closed for solemn expression
  const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEye.setAttribute("d", "M65,50 Q68,48 71,50");
  leftEye.setAttribute("stroke", "#f5a442");
  leftEye.setAttribute("stroke-width", "1.5");
  leftEye.setAttribute("fill", "none");
  svg.appendChild(leftEye);
  
  const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEye.setAttribute("d", "M79,50 Q82,48 85,50");
  rightEye.setAttribute("stroke", "#f5a442");
  rightEye.setAttribute("stroke-width", "1.5");
  rightEye.setAttribute("fill", "none");
  svg.appendChild(rightEye);
  
  // Horns
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M59,40 Q45,25 53,15");
  leftHorn.setAttribute("stroke", "#a0b4d6");
  leftHorn.setAttribute("stroke-width", "6");
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(leftHorn);
  
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M91,40 Q105,25 97,15");
  rightHorn.setAttribute("stroke", "#a0b4d6");
  rightHorn.setAttribute("stroke-width", "6");
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  svg.appendChild(rightHorn);
  
  // Ears
  const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEar.setAttribute("d", "M59,55 Q52,60 55,68");
  leftEar.setAttribute("fill", "#9e3d62");
  svg.appendChild(leftEar);
  
  const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEar.setAttribute("d", "M91,55 Q98,60 95,68");
  rightEar.setAttribute("fill", "#9e3d62");
  svg.appendChild(rightEar);
  
  // Upper arms
  const upperArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmLeft.setAttribute("d", "M65,75 Q50,70 40,75");
  upperArmLeft.setAttribute("stroke", "#e67e45");
  upperArmLeft.setAttribute("stroke-width", "3.5");
  upperArmLeft.setAttribute("fill", "none");
  upperArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmLeft);
  
  const upperHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandLeft.setAttribute("d", "M40,75 Q36,79 40,82 Q44,78 40,75");
  upperHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(upperHandLeft);
  
  const upperArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArmRight.setAttribute("d", "M85,75 Q100,70 110,75");
  upperArmRight.setAttribute("stroke", "#e67e45");
  upperArmRight.setAttribute("stroke-width", "3.5");
  upperArmRight.setAttribute("fill", "none");
  upperArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArmRight);
  
  const upperHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperHandRight.setAttribute("d", "M110,75 Q114,79 110,82 Q106,78 110,75");
  upperHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(upperHandRight);
  
  // Middle arms
  const middleArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmLeft.setAttribute("d", "M65,80 Q52,80 43,85");
  middleArmLeft.setAttribute("stroke", "#e67e45");
  middleArmLeft.setAttribute("stroke-width", "3.5");
  middleArmLeft.setAttribute("fill", "none");
  middleArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmLeft);
  
  const middleHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandLeft.setAttribute("d", "M43,85 Q39,89 43,92 Q47,88 43,85");
  middleHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(middleHandLeft);
  
  const middleArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArmRight.setAttribute("d", "M85,80 Q98,80 107,85");
  middleArmRight.setAttribute("stroke", "#e67e45");
  middleArmRight.setAttribute("stroke-width", "3.5");
  middleArmRight.setAttribute("fill", "none");
  middleArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArmRight);
  
  const middleHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleHandRight.setAttribute("d", "M107,85 Q111,89 107,92 Q103,88 107,85");
  middleHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(middleHandRight);
  
  // Lower arms
  const lowerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmLeft.setAttribute("d", "M65,85 Q60,95 63,105");
  lowerArmLeft.setAttribute("stroke", "#e67e45");
  lowerArmLeft.setAttribute("stroke-width", "3.5");
  lowerArmLeft.setAttribute("fill", "none");
  lowerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmLeft);
  
  const lowerHandLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandLeft.setAttribute("d", "M63,105 Q60,109 64,112 Q67,108 63,105");
  lowerHandLeft.setAttribute("fill", "#e67e45");
  svg.appendChild(lowerHandLeft);
  
  const lowerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArmRight.setAttribute("d", "M85,85 Q90,95 87,105");
  lowerArmRight.setAttribute("stroke", "#e67e45");
  lowerArmRight.setAttribute("stroke-width", "3.5");
  lowerArmRight.setAttribute("fill", "none");
  lowerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArmRight);
  
  const lowerHandRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerHandRight.setAttribute("d", "M87,105 Q90,109 86,112 Q83,108 87,105");
  lowerHandRight.setAttribute("fill", "#e67e45");
  svg.appendChild(lowerHandRight);
  
  // Center praying hands
  const centerArmLeftOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeftOutline.setAttribute("d", "M69,75 L71,81 L73,68 L73,64");
  centerArmLeftOutline.setAttribute("stroke", "#c16025");
  centerArmLeftOutline.setAttribute("stroke-width", "4.5");
  centerArmLeftOutline.setAttribute("fill", "none");
  centerArmLeftOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeftOutline);
  const centerArmLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmLeft.setAttribute("d", "M69,75 L71,81 L73,68 L73,64");
  centerArmLeft.setAttribute("stroke", "#e67e45");
  centerArmLeft.setAttribute("stroke-width", "3");
  centerArmLeft.setAttribute("fill", "none");
  centerArmLeft.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmLeft);
  
  const centerArmRightOutline = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRightOutline.setAttribute("d", "M81,75 L79,81 L77,68 L77,64");
  centerArmRightOutline.setAttribute("stroke", "#c16025");
  centerArmRightOutline.setAttribute("stroke-width", "4.5");
  centerArmRightOutline.setAttribute("fill", "none");
  centerArmRightOutline.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRightOutline);
  const centerArmRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerArmRight.setAttribute("d", "M81,75 L79,81 L77,68 L77,64");
  centerArmRight.setAttribute("stroke", "#e67e45");
  centerArmRight.setAttribute("stroke-width", "3");
  centerArmRight.setAttribute("fill", "none");
  centerArmRight.setAttribute("stroke-linecap", "round");
  svg.appendChild(centerArmRight);

  return svg;
}

function createBeastDeadSvg() {
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 150 150");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  
  // Background - now just filling the halo area
  const background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  background.setAttribute("cx", "75");
  background.setAttribute("cy", "75");
  background.setAttribute("r", "45"); // Smaller for dead state
  background.setAttribute("fill", "#2d2e54"); // Very dark, faded background
  svg.appendChild(background);
  
  // Faded circular halo
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", "75");
  halo.setAttribute("cy", "75");
  halo.setAttribute("r", "45");
  halo.setAttribute("fill", "none");
  halo.setAttribute("stroke", "#8a6225"); // Very dim
  halo.setAttribute("stroke-width", "1");
  halo.setAttribute("stroke-dasharray", "2,5"); // Very broken halo
  halo.setAttribute("opacity", "0.5");
  svg.appendChild(halo);
  
  // Cloud at bottom - dissipating
  const cloudBottom = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cloudBottom.setAttribute("d", "M30,114 Q55,114 75,114 Q95,114 120,114 L120,130 Q95,135 75,135 Q55,135 30,130 Z");
  cloudBottom.setAttribute("fill", "#747d8e"); // Grayed out cloud
  cloudBottom.setAttribute("opacity", "0.6"); // Fading away
  svg.appendChild(cloudBottom);

  // Beast lying on its side (sideways)
  // Body
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "75");
  body.setAttribute("cy", "95");
  body.setAttribute("rx", "25");
  body.setAttribute("ry", "15");
  body.setAttribute("fill", "#9c5628"); // Desaturated color
  body.setAttribute("transform", "rotate(15, 75, 95)"); // Tilted in death
  svg.appendChild(body);
  
  // Head
  const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  head.setAttribute("cx", "50");
  head.setAttribute("cy", "85");
  head.setAttribute("rx", "15");
  head.setAttribute("ry", "17");
  head.setAttribute("fill", "#9c5628"); // Desaturated color
  head.setAttribute("transform", "rotate(-15, 50, 85)"); // Lolled to the side
  svg.appendChild(head);
  
  // Face mask
  const faceMask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  faceMask.setAttribute("d", "M40,75 Q50,65 60,75 Q60,90 50,95 Q40,90 40,75 Z");
  faceMask.setAttribute("fill", "#b06a2b");
  faceMask.setAttribute("transform", "rotate(-15, 50, 85)"); // Matches head tilt
  svg.appendChild(faceMask);
  
  // Mask details
  const maskTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
  maskTop.setAttribute("d", "M40,75 Q50,68 60,75");
  maskTop.setAttribute("stroke", "#2a4a8c"); // Dimmer
  maskTop.setAttribute("stroke-width", "1.5");
  maskTop.setAttribute("fill", "none");
  maskTop.setAttribute("transform", "rotate(-15, 50, 85)"); // Matches head tilt
  svg.appendChild(maskTop);
  
  // X-ed out eyes (classic death symbol)
  const leftEyeX1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEyeX1.setAttribute("d", "M43,78 L48,83");
  leftEyeX1.setAttribute("stroke", "#2a4a8c");
  leftEyeX1.setAttribute("stroke-width", "1.5");
  leftEyeX1.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(leftEyeX1);
  
  const leftEyeX2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftEyeX2.setAttribute("d", "M48,78 L43,83");
  leftEyeX2.setAttribute("stroke", "#2a4a8c");
  leftEyeX2.setAttribute("stroke-width", "1.5");
  leftEyeX2.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(leftEyeX2);
  
  const rightEyeX1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEyeX1.setAttribute("d", "M53,78 L58,83");
  rightEyeX1.setAttribute("stroke", "#2a4a8c");
  rightEyeX1.setAttribute("stroke-width", "1.5");
  rightEyeX1.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(rightEyeX1);
  
  const rightEyeX2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightEyeX2.setAttribute("d", "M58,78 L53,83");
  rightEyeX2.setAttribute("stroke", "#2a4a8c");
  rightEyeX2.setAttribute("stroke-width", "1.5");
  rightEyeX2.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(rightEyeX2);
  
  // Mouth - straight line showing no expression
  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mouth.setAttribute("d", "M48,90 L52,90");
  mouth.setAttribute("stroke", "#2a4a8c");
  mouth.setAttribute("stroke-width", "1");
  mouth.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(mouth);
  
  // Broken horn
  const leftHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftHorn.setAttribute("d", "M37,70 Q30,63 33,58");
  leftHorn.setAttribute("stroke", "#7084a6");
  leftHorn.setAttribute("stroke-width", "5");
  leftHorn.setAttribute("fill", "none");
  leftHorn.setAttribute("stroke-linecap", "round");
  leftHorn.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(leftHorn);
  
  // Broken horn fragment lying on the ground
  const brokenHornPiece = document.createElementNS("http://www.w3.org/2000/svg", "path");
  brokenHornPiece.setAttribute("d", "M95,105 Q100,100 98,95");
  brokenHornPiece.setAttribute("stroke", "#7084a6");
  brokenHornPiece.setAttribute("stroke-width", "4");
  brokenHornPiece.setAttribute("fill", "none");
  brokenHornPiece.setAttribute("stroke-linecap", "round");
  svg.appendChild(brokenHornPiece);
  
  // Second horn, also broken
  const rightHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightHorn.setAttribute("d", "M63,70 Q70,63 67,58");
  rightHorn.setAttribute("stroke", "#7084a6");
  rightHorn.setAttribute("stroke-width", "5");
  rightHorn.setAttribute("fill", "none");
  rightHorn.setAttribute("stroke-linecap", "round");
  rightHorn.setAttribute("transform", "rotate(-15, 50, 85)");
  svg.appendChild(rightHorn);
  
  // Limp arms sprawled out
  // Upper arm
  const upperArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  upperArm.setAttribute("d", "M75,90 Q85,70 95,65");
  upperArm.setAttribute("stroke", "#9c5628");
  upperArm.setAttribute("stroke-width", "3.5");
  upperArm.setAttribute("fill", "none");
  upperArm.setAttribute("stroke-linecap", "round");
  svg.appendChild(upperArm);
  
  // Middle arm
  const middleArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleArm.setAttribute("d", "M85,95 Q95,90 105,85");
  middleArm.setAttribute("stroke", "#9c5628");
  middleArm.setAttribute("stroke-width", "3.5");
  middleArm.setAttribute("fill", "none");
  middleArm.setAttribute("stroke-linecap", "round");
  svg.appendChild(middleArm);
  
  // Lower arm
  const lowerArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  lowerArm.setAttribute("d", "M80,105 Q90,105 100,110");
  lowerArm.setAttribute("stroke", "#9c5628");
  lowerArm.setAttribute("stroke-width", "3.5");
  lowerArm.setAttribute("fill", "none");
  lowerArm.setAttribute("stroke-linecap", "round");
  svg.appendChild(lowerArm);
  
  // Bent legs
  const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  leftLeg.setAttribute("d", "M60,105 Q50,110 45,120");
  leftLeg.setAttribute("stroke", "#9c5628");
  leftLeg.setAttribute("stroke-width", "3.5");
  leftLeg.setAttribute("fill", "none");
  leftLeg.setAttribute("stroke-linecap", "round");
  svg.appendChild(leftLeg);
  
  const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rightLeg.setAttribute("d", "M70,105 Q65,115 70,125");
  rightLeg.setAttribute("stroke", "#9c5628");
  rightLeg.setAttribute("stroke-width", "3.5");
  rightLeg.setAttribute("fill", "none");
  rightLeg.setAttribute("stroke-linecap", "round");
  svg.appendChild(rightLeg);
  
  // Essence/energy leaving body (spirit departing)
  const essence1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  essence1.setAttribute("d", "M60,70 Q65,60 70,55");
  essence1.setAttribute("stroke", "#b06a2b");
  essence1.setAttribute("stroke-width", "1");
  essence1.setAttribute("fill", "none");
  essence1.setAttribute("opacity", "0.4");
  svg.appendChild(essence1);
  
  const essence2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  essence2.setAttribute("d", "M70,65 Q75,55 73,45");
  essence2.setAttribute("stroke", "#b06a2b");
  essence2.setAttribute("stroke-width", "1");
  essence2.setAttribute("fill", "none");
  essence2.setAttribute("opacity", "0.3");
  svg.appendChild(essence2);
  
  const essence3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  essence3.setAttribute("d", "M80,70 Q85,60 80,50");
  essence3.setAttribute("stroke", "#b06a2b");
  essence3.setAttribute("stroke-width", "1");
  essence3.setAttribute("fill", "none");
  essence3.setAttribute("opacity", "0.2");
  svg.appendChild(essence3);
  
  return svg;
}

export class TheBeast {
  constructor() {
    this.create = createBeastSvg;
    this.createAttack = createBeastAttackSvg;
    this.createDamaged = createBeastDamagedSvg;
    this.createDead = createBeastDeadSvg;
    this.createAfraid = createBeastAfraidSvg;
    this.createSolemn = createBeastSolemnSvg;
    
    this.maxHealth = 600;
    this.health = this.maxHealth;
    this.strength = 80;
    this.attacks = 1;
    this.xp = 0;
    this.size = 10;

    this.attackCount = 0;
    this.isAngry = false;
  }

  nextAttack() {
    this.attackCount++;

    if (!this.isAngry && this.attackCount < 3) {
      return { image: this.createAfraid(), strength: 0, attacks: 0 };
    } else {
      return { image: this.createAttack(), strength: this.strength, attacks: 1 };
    }
  }
}
