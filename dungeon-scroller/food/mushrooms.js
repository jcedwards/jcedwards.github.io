function createMushroomsFullSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create three mushrooms with different sizes, positions, and colors
  const mushrooms = [
    { 
      x: 100, y: 200, scale: 1.2, rotation: -8,
      capColor: "#8B4513", // standard brown
      stalkShape: `
        M-19 0
        C-19 -20 -14 -35 -13 -65
        C-11 -70 -6 -72 0 -72
        C6 -72 9 -70 11 -65
        C12 -40 17 -25 19 0
        Z
      `
    },
    { 
      x: 150, y: 180, scale: 1, rotation: 0,
      capColor: "#966F33", // lighter brown
      stalkShape: `
        M-18 0
        C-18 -30 -16 -50 -12 -65
        C-10 -70 -6 -72 0 -72
        C6 -72 8 -70 10 -65
        C13 -45 16 -20 18 0
        Z
      `
    },
    { 
      x: 200, y: 210, scale: 0.9, rotation: 5,
      capColor: "#8B5E3C", // warmer brown
      stalkShape: `
        M-21 0
        C-21 -35 -17 -45 -11 -65
        C-9 -70 -6 -72 0 -72
        C6 -72 8 -70 9 -65
        C13 -50 19 -25 21 0
        Z
      `
    }
  ];

  mushrooms.forEach(({ x, y, scale, rotation, capColor, stalkShape }) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x} ${y}) scale(${scale}) rotate(${rotation})`);

    // Thick white stalk with organic shape
    const stalk = document.createElementNS("http://www.w3.org/2000/svg", "path");
    stalk.setAttribute("d", stalkShape);
    stalk.setAttribute("fill", "#FFFFFF");
    stalk.setAttribute("stroke", "#F8F8F8");
    stalk.setAttribute("stroke-width", "1");

    // Squatter brown cap
    const cap = document.createElementNS("http://www.w3.org/2000/svg", "path");
    cap.setAttribute("d", `
      M-18 -65
      C-18 -72 -10 -75 0 -75
      C10 -75 18 -72 18 -65
      C18 -62 10 -60 0 -60
      C-10 -60 -18 -62 -18 -65
      Z
    `);
    cap.setAttribute("fill", capColor);
    cap.setAttribute("stroke", "#654321");
    cap.setAttribute("stroke-width", "1");

    // Add shadow at base
    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    shadow.setAttribute("cx", "0");
    shadow.setAttribute("cy", "2");
    shadow.setAttribute("rx", "16");
    shadow.setAttribute("ry", "3");
    shadow.setAttribute("fill", "rgba(0,0,0,0.1)");

    group.appendChild(shadow);
    group.appendChild(stalk);
    group.appendChild(cap);
    svg.appendChild(group);
  });

  return svg;
}

function createMushroomsOneEatenSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create three mushrooms - first one eaten, other two intact
  const mushrooms = [
    { 
      x: 100, y: 200, scale: 1.2, rotation: -8,
      capColor: "#8B4513", // standard brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 19 0
        L-19 0
        Z
      `
    },
    { 
      x: 150, y: 180, scale: 1, rotation: 0,
      capColor: "#966F33", // lighter brown
      isEaten: false,
      stalkShape: `
        M-18 0
        C-18 -30 -16 -50 -12 -65
        C-10 -70 -6 -72 0 -72
        C6 -72 8 -70 10 -65
        C13 -45 16 -20 18 0
        Z
      `
    },
    { 
      x: 200, y: 210, scale: 0.9, rotation: 5,
      capColor: "#8B5E3C", // warmer brown
      isEaten: false,
      stalkShape: `
        M-21 0
        C-21 -35 -17 -45 -11 -65
        C-9 -70 -6 -72 0 -72
        C6 -72 8 -70 9 -65
        C13 -50 19 -25 21 0
        Z
      `
    }
  ];

  mushrooms.forEach(({ x, y, scale, rotation, capColor, isEaten, stalkShape }) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x} ${y}) scale(${scale}) rotate(${rotation})`);

    // Add shadow at base first
    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    shadow.setAttribute("cx", "0");
    shadow.setAttribute("cy", "2");
    shadow.setAttribute("rx", "16");
    shadow.setAttribute("ry", "3");
    shadow.setAttribute("fill", "rgba(0,0,0,0.1)");
    group.appendChild(shadow);

    // Then stalk
    const stalk = document.createElementNS("http://www.w3.org/2000/svg", "path");
    stalk.setAttribute("d", stalkShape);
    stalk.setAttribute("fill", "#FFFFFF");
    stalk.setAttribute("stroke", "#F8F8F8");
    stalk.setAttribute("stroke-width", "1");
    group.appendChild(stalk);

    // Cap last if not eaten
    if (!isEaten) {
      const cap = document.createElementNS("http://www.w3.org/2000/svg", "path");
      cap.setAttribute("d", `
        M-18 -65
        C-18 -72 -10 -75 0 -75
        C10 -75 18 -72 18 -65
        C18 -62 10 -60 0 -60
        C-10 -60 -18 -62 -18 -65
        Z
      `);
      cap.setAttribute("fill", capColor);
      cap.setAttribute("stroke", "#654321");
      cap.setAttribute("stroke-width", "1");
      group.appendChild(cap);
    }

    svg.appendChild(group);
  });

  return svg;
}

function createMushroomsTwoEatenSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create three mushrooms - first two eaten, last one intact
  const mushrooms = [
    { 
      x: 100, y: 200, scale: 1.2, rotation: -8,
      capColor: "#8B4513", // standard brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 19 0
        L-19 0
        Z
      `
    },
    { 
      x: 150, y: 180, scale: 1, rotation: 0,
      capColor: "#966F33", // lighter brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 18 0
        L-18 0
        Z
      `
    },
    { 
      x: 200, y: 210, scale: 0.9, rotation: 5,
      capColor: "#8B5E3C", // warmer brown
      isEaten: false,
      stalkShape: `
        M-21 0
        C-21 -35 -17 -45 -11 -65
        C-9 -70 -6 -72 0 -72
        C6 -72 8 -70 9 -65
        C13 -50 19 -25 21 0
        Z
      `
    }
  ];

  mushrooms.forEach(({ x, y, scale, rotation, capColor, isEaten, stalkShape }) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x} ${y}) scale(${scale}) rotate(${rotation})`);

    // Add shadow at base first
    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    shadow.setAttribute("cx", "0");
    shadow.setAttribute("cy", "2");
    shadow.setAttribute("rx", "16");
    shadow.setAttribute("ry", "3");
    shadow.setAttribute("fill", "rgba(0,0,0,0.1)");
    group.appendChild(shadow);

    // Then stalk
    const stalk = document.createElementNS("http://www.w3.org/2000/svg", "path");
    stalk.setAttribute("d", stalkShape);
    stalk.setAttribute("fill", "#FFFFFF");
    stalk.setAttribute("stroke", "#F8F8F8");
    stalk.setAttribute("stroke-width", "1");
    group.appendChild(stalk);

    // Cap last if not eaten
    if (!isEaten) {
      const cap = document.createElementNS("http://www.w3.org/2000/svg", "path");
      cap.setAttribute("d", `
        M-18 -65
        C-18 -72 -10 -75 0 -75
        C10 -75 18 -72 18 -65
        C18 -62 10 -60 0 -60
        C-10 -60 -18 -62 -18 -65
        Z
      `);
      cap.setAttribute("fill", capColor);
      cap.setAttribute("stroke", "#654321");
      cap.setAttribute("stroke-width", "1");
      group.appendChild(cap);
    }

    svg.appendChild(group);
  });

  return svg;
}

function createMushroomsThreeEatenSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";

  // Create three mushrooms - all eaten
  const mushrooms = [
    { 
      x: 100, y: 200, scale: 1.2, rotation: -8,
      capColor: "#8B4513", // standard brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 19 0
        L-19 0
        Z
      `
    },
    { 
      x: 150, y: 180, scale: 1, rotation: 0,
      capColor: "#966F33", // lighter brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 18 0
        L-18 0
        Z
      `
    },
    { 
      x: 200, y: 210, scale: 0.9, rotation: 5,
      capColor: "#8B5E3C", // warmer brown
      isEaten: true,
      stalkShape: `
        M-15 -35
        C-15 -40 -14 -42 -12 -42
        L-8 -37
        L-4 -41
        L0 -37
        L4 -41
        L8 -37
        L12 -41
        C14 -41 15 -40 15 -35
        C16 -20 17 -10 19 0
        L-19 0
        Z
      `
    }
  ];

  mushrooms.forEach(({ x, y, scale, rotation, capColor, isEaten, stalkShape }) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x} ${y}) scale(${scale}) rotate(${rotation})`);

    // Add shadow at base first
    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    shadow.setAttribute("cx", "0");
    shadow.setAttribute("cy", "2");
    shadow.setAttribute("rx", "16");
    shadow.setAttribute("ry", "3");
    shadow.setAttribute("fill", "rgba(0,0,0,0.1)");
    group.appendChild(shadow);

    // Then stalk
    const stalk = document.createElementNS("http://www.w3.org/2000/svg", "path");
    stalk.setAttribute("d", stalkShape);
    stalk.setAttribute("fill", "#FFFFFF");
    stalk.setAttribute("stroke", "#F8F8F8");
    stalk.setAttribute("stroke-width", "1");
    group.appendChild(stalk);

    // Cap last if not eaten (none in this case since all are eaten)
    if (!isEaten) {
      const cap = document.createElementNS("http://www.w3.org/2000/svg", "path");
      cap.setAttribute("d", `
        M-18 -65
        C-18 -72 -10 -75 0 -75
        C10 -75 18 -72 18 -65
        C18 -62 10 -60 0 -60
        C-10 -60 -18 -62 -18 -65
        Z
      `);
      cap.setAttribute("fill", capColor);
      cap.setAttribute("stroke", "#654321");
      cap.setAttribute("stroke-width", "1");
      group.appendChild(cap);
    }

    svg.appendChild(group);
  });

  return svg;
}

let mushrooms = {
  createSvgFns: [createMushroomsFullSvg, createMushroomsOneEatenSvg, createMushroomsTwoEatenSvg, createMushroomsThreeEatenSvg],
  healing: 5,
  makesRatDrunk: false,
};

export default mushrooms;