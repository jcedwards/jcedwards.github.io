function createFish(svg, x, y, rotation, options) {
  const { bodyColor, finColor, scale, width } = options;
  const fishGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  fishGroup.setAttribute("transform", `translate(${x} ${y}) rotate(${rotation}) scale(${scale})`);

  // Fish body - adjusted width
  const fishBody = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fishBody.setAttribute("d", `
    M${width} 0
    C${width-10} -20 40 -30 0 -30
    C-40 -30 -${width-10} -20 -${width} 0
    C-${width-10} 20 -40 30 0 30
    C40 30 ${width-10} 20 ${width} 0
    Z
  `);
  fishBody.setAttribute("fill", bodyColor);
  fishBody.setAttribute("stroke", "#B67B4B");
  fishBody.setAttribute("stroke-width", "2");

  // Add diagonal grill marks
  const grillMarks = document.createElementNS("http://www.w3.org/2000/svg", "path");
  grillMarks.setAttribute("d", `
    M-40 -25 L-30 25
    M-10 -28 L0 25
    M20 -25 L30 25
  `);
  grillMarks.setAttribute("stroke", "#8B4513");
  grillMarks.setAttribute("stroke-width", "2");
  grillMarks.setAttribute("stroke-linecap", "round");
  grillMarks.setAttribute("fill", "none");
  grillMarks.setAttribute("opacity", "0.5");

  // Side fin
  const sideFin = document.createElementNS("http://www.w3.org/2000/svg", "path");
  sideFin.setAttribute("d", `
    M20 15
    C10 30 -10 30 -20 20
    C-10 15 0 15 20 15
    Z
  `);
  sideFin.setAttribute("fill", finColor);
  sideFin.setAttribute("stroke", "#B67B4B");
  sideFin.setAttribute("stroke-width", "2");

  // Top fin
  const topFin = document.createElementNS("http://www.w3.org/2000/svg", "path");
  topFin.setAttribute("d", `
    M0 -30
    C-10 -45 -20 -45 -30 -40
    C-20 -35 -10 -30 0 -30
    Z
  `);
  topFin.setAttribute("fill", finColor);
  topFin.setAttribute("stroke", "#B67B4B");
  topFin.setAttribute("stroke-width", "2");

  // Tail - adjusted to match body width
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", `
    M-${width} 0
    L-${width+15} -15
    L-${width+25} 0
    L-${width+15} 15
    Z
  `);
  tail.setAttribute("fill", finColor);
  tail.setAttribute("stroke", "#B67B4B");
  tail.setAttribute("stroke-width", "2");

  // Eye
  const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  eye.setAttribute("cx", "50");
  eye.setAttribute("cy", "0");
  eye.setAttribute("r", "5");
  eye.setAttribute("fill", "#2F1F1F");

  // Assemble the fish
  fishGroup.appendChild(fishBody);
  fishGroup.appendChild(grillMarks);  // Add grill marks before the fins
  fishGroup.appendChild(tail);
  fishGroup.appendChild(topFin);
  fishGroup.appendChild(sideFin);
  fishGroup.appendChild(eye);
  svg.appendChild(fishGroup);
}

function createFishFullSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create two fish with different positions, rotations, colors, and sizes
  createFish(svg, 190, 120, -65, {
    bodyColor: "#E8B88C",
    finColor: "#D4976A",
    scale: 0.82,
    width: 95
  });
  createFish(svg, 120, 105, -80, {
    bodyColor: "#DBA681", // slightly different shade
    finColor: "#C68B61",
    scale: 0.9,  // slightly smaller
    width: 85    // slightly wider
  });

  return svg;
}

function createSkeletonFish(svg, x, y, rotation, options) {
  const { bodyColor, finColor, scale, width } = options;
  const fishGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  fishGroup.setAttribute("transform", `translate(${x} ${y}) rotate(${rotation}) scale(${scale})`);

  // Fish head
  const fishHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fishHead.setAttribute("d", `
    M${width} 0
    C${width-5} -15 ${width-20} -20 ${width-35} -20
    C${width-50} -20 ${width-65} -15 ${width-65} 0
    C${width-65} 15 ${width-50} 20 ${width-35} 20
    C${width-20} 20 ${width-5} 15 ${width} 0
    Z
  `);
  fishHead.setAttribute("fill", bodyColor);
  fishHead.setAttribute("stroke", "#B67B4B");
  fishHead.setAttribute("stroke-width", "2");

  // Skeleton body
  const skeleton = document.createElementNS("http://www.w3.org/2000/svg", "path");
  skeleton.setAttribute("d", `
    M${width-65} 0
    L-${width} 0
    M${width-70} 0 L${width-70} -18
    M${width-95} 0 L${width-95} -20
    M${width-115} 0 L${width-115} -15
    M${width-135} 0 L${width-135} -10
    M${width-155} 0 L${width-155} -8
    M${width-70} 0 L${width-70} 18
    M${width-95} 0 L${width-95} 20
    M${width-115} 0 L${width-115} 15
    M${width-135} 0 L${width-135} 10
    M${width-155} 0 L${width-155} 8
  `);
  skeleton.setAttribute("stroke", "#B67B4B");
  skeleton.setAttribute("stroke-width", "2");
  skeleton.setAttribute("fill", "none");

  // Eye
  const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  eye.setAttribute("cx", "50");
  eye.setAttribute("cy", "0");
  eye.setAttribute("r", "5");
  eye.setAttribute("fill", "#2F1F1F");

  // Tail
  const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
  tail.setAttribute("d", `
    M-${width} 0
    L-${width+15} -15
    L-${width+25} 0
    L-${width+15} 15
    Z
  `);
  tail.setAttribute("fill", finColor);
  tail.setAttribute("stroke", "#B67B4B");
  tail.setAttribute("stroke-width", "2");
  tail.setAttribute("opacity", "0.6");

  // Assemble the fish
  fishGroup.appendChild(tail);
  fishGroup.appendChild(skeleton);
  fishGroup.appendChild(fishHead);
  fishGroup.appendChild(eye);
  svg.appendChild(fishGroup);
}

function createFishOneEatenSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create one normal fish
  createFish(svg, 190, 120, -65, {
    bodyColor: "#E8B88C",
    finColor: "#D4976A",
    scale: 0.82,
    width: 95
  });

  // Create the eaten fish
  createSkeletonFish(svg, 120, 105, -80, {
    bodyColor: "#DBA681",
    finColor: "#C68B61",
    scale: 0.9,
    width: 85
  });

  return svg;
}

function createFishTwoEatenSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create both eaten fish
  createSkeletonFish(svg, 190, 120, -65, {
    bodyColor: "#E8B88C",
    finColor: "#D4976A",
    scale: 0.82,
    width: 95
  });

  createSkeletonFish(svg, 120, 105, -80, {
    bodyColor: "#DBA681",
    finColor: "#C68B61",
    scale: 0.9,
    width: 85
  });

  return svg;
}

let fish = {
  createSvgFns: [createFishFullSvg, createFishOneEatenSvg, createFishTwoEatenSvg],
  healing: 30,
  makesRatDrunk: false,
};

export default fish;