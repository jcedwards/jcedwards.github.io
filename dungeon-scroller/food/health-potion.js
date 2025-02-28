function createHealthPotionSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create the potion group and position it similarly to the mushrooms
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", "translate(150 155) scale(0.96)");

  // Add shadow at base
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  shadow.setAttribute("cx", "0");
  shadow.setAttribute("cy", "2");
  shadow.setAttribute("rx", "20");
  shadow.setAttribute("ry", "4");
  shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

  // Flask body - Florence flask shape
  const flask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  flask.setAttribute("d", `
    M-8 -70
    C-8 -72 -5 -75 0 -75
    C5 -75 8 -72 8 -70
    L8 -45
    C8 -20 25 0 25 20
    C25 40 15 50 0 50
    C-15 50 -25 40 -25 20
    C-25 0 -8 -20 -8 -45
    Z
  `);
  flask.setAttribute("fill", "rgba(240,240,240,0.2");
  flask.setAttribute("stroke", "#ddd");
  flask.setAttribute("stroke-width", "1");

  // Red potion liquid
  const liquid = document.createElementNS("http://www.w3.org/2000/svg", "path");
  liquid.setAttribute("d", `
    M-7 -20
    C-7 -20 -22 0 -22 20
    C-22 37 -13 46 0 46
    C13 46 22 37 22 20
    C22 0 7 -20 7 -20
    Z
  `);
  liquid.setAttribute("fill", "#ff3333");
  liquid.setAttribute("opacity", "0.9");

  // Cork
  const cork = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cork.setAttribute("d", `
    M-6 -75
    L-6 -82
    C-6 -84 -4 -86 0 -86
    C4 -86 6 -84 6 -82
    L6 -75
    Z
  `);
  cork.setAttribute("fill", "#D2691E");
  cork.setAttribute("stroke", "#A0522D");
  cork.setAttribute("stroke-width", "0.5");

  // Shine/highlight
  const shine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shine.setAttribute("d", `
    M-3 -15
    C-3 -15 -8 0 -8 15
    C-8 25 -4 30 0 30
    C-8 25 -12 15 -12 5
    C-12 -5 -3 -20 -3 -15
    Z
  `);
  shine.setAttribute("fill", "#ff6666");
  shine.setAttribute("opacity", "0.4");

  group.appendChild(shadow);
  group.appendChild(flask);
  group.appendChild(liquid);
  group.appendChild(shine);
  group.appendChild(cork);
  svg.appendChild(group);

  return svg;
}

function createHealthPotionOneSwigSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create the potion group and position it similarly to the mushrooms
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", "translate(150 155) scale(0.96)");

  // Add shadow at base
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  shadow.setAttribute("cx", "0");
  shadow.setAttribute("cy", "2");
  shadow.setAttribute("rx", "20");
  shadow.setAttribute("ry", "4");
  shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

  // Flask body - Florence flask shape
  const flask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  flask.setAttribute("d", `
    M-8 -70
    C-8 -72 -5 -75 0 -75
    C5 -75 8 -72 8 -70
    L8 -45
    C8 -20 25 0 25 20
    C25 40 15 50 0 50
    C-15 50 -25 40 -25 20
    C-25 0 -8 -20 -8 -45
    Z
  `);
  flask.setAttribute("fill", "rgba(240,240,240,0.2");
  flask.setAttribute("stroke", "#ddd");
  flask.setAttribute("stroke-width", "1");

  // Red potion liquid - 3/4 full with flatter top
  const liquid = document.createElementNS("http://www.w3.org/2000/svg", "path");
  liquid.setAttribute("d", `
    M-15 0
    L15 0
    C15 0 22 5 22 20
    C22 37 13 46 0 46
    C-13 46 -22 37 -22 20
    C-22 5 -15 0 -15 0
    Z
  `);
  liquid.setAttribute("fill", "#ff3333");
  liquid.setAttribute("opacity", "0.9");

  // Cork - placed to the side as in the two and three swigs versions
  const cork = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cork.setAttribute("d", `
    M30 40
    L30 33
    C30 31 32 29 36 29
    C40 29 42 31 42 33
    L42 40
    Z
  `);
  cork.setAttribute("fill", "#D2691E");
  cork.setAttribute("stroke", "#A0522D");
  cork.setAttribute("stroke-width", "0.5");

  // Shine/highlight - adjusted for lower liquid level
  const shine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shine.setAttribute("d", `
    M-10 5
    C-10 5 -15 10 -15 20
    C-15 25 -10 30 -5 30
    C-13 25 -17 20 -17 10
    C-17 5 -10 0 -10 5
    Z
  `);
  shine.setAttribute("fill", "#ff6666");
  shine.setAttribute("opacity", "0.4");

  group.appendChild(shadow);
  group.appendChild(flask);
  group.appendChild(liquid);
  group.appendChild(shine);
  group.appendChild(cork);
  svg.appendChild(group);

  return svg;
}

function createHealthPotionTwoSwigsSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create the potion group and position it similarly to the mushrooms
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", "translate(150 155) scale(0.96)");

  // Add shadow at base
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  shadow.setAttribute("cx", "0");
  shadow.setAttribute("cy", "2");
  shadow.setAttribute("rx", "20");
  shadow.setAttribute("ry", "4");
  shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

  // Flask body - Florence flask shape
  const flask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  flask.setAttribute("d", `
    M-8 -70
    C-8 -72 -5 -75 0 -75
    C5 -75 8 -72 8 -70
    L8 -45
    C8 -20 25 0 25 20
    C25 40 15 50 0 50
    C-15 50 -25 40 -25 20
    C-25 0 -8 -20 -8 -45
    Z
  `);
  flask.setAttribute("fill", "rgba(240,240,240,0.2");
  flask.setAttribute("stroke", "#ddd");
  flask.setAttribute("stroke-width", "1");

  // Red potion liquid - half height with flat top
  const liquid = document.createElementNS("http://www.w3.org/2000/svg", "path");
  liquid.setAttribute("d", `
    M-17 10
    L17 10
    C17 12 22 15 22 20
    C22 37 13 46 0 46
    C-13 46 -22 37 -22 20
    C-22 15 -17 12 -17 10
    Z
  `);
  liquid.setAttribute("fill", "#ff3333");
  liquid.setAttribute("opacity", "0.9");

  // Cork - placed near base
  const cork = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cork.setAttribute("d", `
    M30 40
    L30 33
    C30 31 32 29 36 29
    C40 29 42 31 42 33
    L42 40
    Z
  `);
  cork.setAttribute("fill", "#D2691E");
  cork.setAttribute("stroke", "#A0522D");
  cork.setAttribute("stroke-width", "0.5");

  // Shine/highlight - adjusted for half liquid with flat top
  const shine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shine.setAttribute("d", `
    M-12 15
    C-12 15 -15 17 -15 20
    C-15 25 -10 30 -5 30
    C-12 25 -16 20 -16 17
    C-16 15 -12 12 -12 15
    Z
  `);
  shine.setAttribute("fill", "#ff6666");
  shine.setAttribute("opacity", "0.4");

  group.appendChild(shadow);
  group.appendChild(flask);
  group.appendChild(liquid);
  group.appendChild(shine);
  group.appendChild(cork);
  svg.appendChild(group);

  return svg;
}

function createHealthPotionThreeSwigsSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create the potion group and position it similarly to the mushrooms
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("transform", "translate(150 155) scale(0.96)");

  // Add shadow at base
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  shadow.setAttribute("cx", "0");
  shadow.setAttribute("cy", "2");
  shadow.setAttribute("rx", "20");
  shadow.setAttribute("ry", "4");
  shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

  // Flask body - Florence flask shape
  const flask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  flask.setAttribute("d", `
    M-8 -70
    C-8 -72 -5 -75 0 -75
    C5 -75 8 -72 8 -70
    L8 -45
    C8 -20 25 0 25 20
    C25 40 15 50 0 50
    C-15 50 -25 40 -25 20
    C-25 0 -8 -20 -8 -45
    Z
  `);
  flask.setAttribute("fill", "rgba(240,240,240,0.2");
  flask.setAttribute("stroke", "#ddd");
  flask.setAttribute("stroke-width", "1");

  // Red potion liquid - 1/4 full with flat top
  const liquid = document.createElementNS("http://www.w3.org/2000/svg", "path");
  liquid.setAttribute("d", `
    M-15 25
    L15 25
    C15 26 22 28 22 30
    C22 37 13 46 0 46
    C-13 46 -22 37 -22 30
    C-22 28 -15 26 -15 25
    Z
  `);
  liquid.setAttribute("fill", "#ff3333");
  liquid.setAttribute("opacity", "0.9");

  // Cork - placed to the side as in the two swigs version
  const cork = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cork.setAttribute("d", `
    M30 40
    L30 33
    C30 31 32 29 36 29
    C40 29 42 31 42 33
    L42 40
    Z
  `);
  cork.setAttribute("fill", "#D2691E");
  cork.setAttribute("stroke", "#A0522D");
  cork.setAttribute("stroke-width", "0.5");

  // Shine/highlight - adjusted for 1/4 liquid with flat top
  const shine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shine.setAttribute("d", `
    M-10 30
    C-10 30 -12 31 -12 33
    C-12 35 -8 38 -3 38
    C-10 36 -14 34 -14 32
    C-14 30 -10 29 -10 30
    Z
  `);
  shine.setAttribute("fill", "#ff6666");
  shine.setAttribute("opacity", "0.4");

  group.appendChild(shadow);
  group.appendChild(flask);
  group.appendChild(liquid);
  group.appendChild(shine);
  group.appendChild(cork);
  svg.appendChild(group);

  return svg;
}

function createHealthPotionFourSwigsSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create the potion group and position it similarly to the mushrooms
  const bottleGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  bottleGroup.setAttribute("transform", "translate(150 166) scale(0.96) rotate(-95)");

  // Add shadow at base - elongated for sideways bottle
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  shadow.setAttribute("cx", "0");
  shadow.setAttribute("cy", "2");
  shadow.setAttribute("rx", "45");
  shadow.setAttribute("ry", "6");
  shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

  // Flask body - Florence flask shape
  const flask = document.createElementNS("http://www.w3.org/2000/svg", "path");
  flask.setAttribute("d", `
    M-8 -70
    C-8 -72 -5 -75 0 -75
    C5 -75 8 -72 8 -70
    L8 -45
    C8 -20 25 0 25 20
    C25 40 15 50 0 50
    C-15 50 -25 40 -25 20
    C-25 0 -8 -20 -8 -45
    Z
  `);
  flask.setAttribute("fill", "rgba(240,240,240,0.2");
  flask.setAttribute("stroke", "#ddd");
  flask.setAttribute("stroke-width", "1");

  // Shine/highlight - adjusted for empty bottle
  const shine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shine.setAttribute("d", `
    M-3 -15
    C-3 -15 -8 0 -8 15
    C-8 25 -4 30 0 30
    C-8 25 -12 15 -12 5
    C-12 -5 -3 -20 -3 -15
    Z
  `);
  shine.setAttribute("fill", "#ffffff");
  shine.setAttribute("opacity", "0.2");

  bottleGroup.appendChild(shadow);
  bottleGroup.appendChild(flask);
  bottleGroup.appendChild(shine);

  // Create separate group for cork that doesn't rotate
  const corkGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  corkGroup.setAttribute("transform", "translate(150 155) scale(0.96)");

  // Cork - placed near base without rotation
  const cork = document.createElementNS("http://www.w3.org/2000/svg", "path");
  cork.setAttribute("d", `
    M30 40
    L30 33
    C30 31 32 29 36 29
    C40 29 42 31 42 33
    L42 40
    Z
  `);
  cork.setAttribute("fill", "#D2691E");
  cork.setAttribute("stroke", "#A0522D");
  cork.setAttribute("stroke-width", "0.5");

  corkGroup.appendChild(cork);
  
  svg.appendChild(bottleGroup);
  svg.appendChild(corkGroup);

  return svg;
}

let healthPotion = {
  createSvgFns: [createHealthPotionSvg, createHealthPotionOneSwigSvg, createHealthPotionTwoSwigsSvg, createHealthPotionThreeSwigsSvg, createHealthPotionFourSwigsSvg],
  healing: 100,
  makesRatDrunk: true,
};

export default healthPotion;