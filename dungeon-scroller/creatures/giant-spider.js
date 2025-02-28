function createGiantSpiderSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  // Body - main thorax
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "25");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#2d2d2d");

  // Head
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "50");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#1a1a1a");

  // Eyes (4 pairs)
  const eyes = [];
  const eyePositions = [
    {x: 70, y: 45}, {x: 80, y: 45},  // Top pair
    {x: 70, y: 50}, {x: 80, y: 50},  // Middle pair
    {x: 70, y: 55}, {x: 80, y: 55},  // Bottom pair
    {x: 65, y: 47}, {x: 85, y: 47}   // Outer pair
  ];

  eyePositions.forEach(pos => {
    const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye.setAttribute("cx", pos.x);
    eye.setAttribute("cy", pos.y);
    eye.setAttribute("r", "2");
    eye.setAttribute("fill", "#ff0000");
    eyes.push(eye);
  });

  // Legs
  const legs = [];
  const legPositions = [
    // Left legs (front to back)
    {
      start: {x: 30, y: 40},
      joint: {x: 15, y: 25},
      end: {x: 5, y: 65}
    },
    {
      start: {x: 35, y: 45},
      joint: {x: 18, y: 28},
      end: {x: 10, y: 67}
    },
    {
      start: {x: 40, y: 50},
      joint: {x: 22, y: 32},
      end: {x: 15, y: 66}
    },
    {
      start: {x: 45, y: 55},
      joint: {x: 28, y: 35},
      end: {x: 20, y: 68}
    },
    // Right legs (front to back)
    {
      start: {x: 70, y: 40},
      joint: {x: 85, y: 25},
      end: {x: 95, y: 65}
    },
    {
      start: {x: 65, y: 45},
      joint: {x: 82, y: 28},
      end: {x: 90, y: 67}
    },
    {
      start: {x: 60, y: 50},
      joint: {x: 78, y: 32},
      end: {x: 85, y: 66}
    },
    {
      start: {x: 55, y: 55},
      joint: {x: 72, y: 35},
      end: {x: 80, y: 68}
    }
  ];

  legPositions.forEach(pos => {
    // First segment
    const legSegment1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment1.setAttribute("x1", pos.start.x);
    legSegment1.setAttribute("y1", pos.start.y);
    legSegment1.setAttribute("x2", pos.joint.x);
    legSegment1.setAttribute("y2", pos.joint.y);
    legSegment1.setAttribute("stroke", "#2d2d2d");
    legSegment1.setAttribute("stroke-width", "4");
    legs.push(legSegment1);

    // Second segment
    const legSegment2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment2.setAttribute("x1", pos.joint.x);
    legSegment2.setAttribute("y1", pos.joint.y);
    legSegment2.setAttribute("x2", pos.end.x);
    legSegment2.setAttribute("y2", pos.end.y);
    legSegment2.setAttribute("stroke", "#2d2d2d");
    legSegment2.setAttribute("stroke-width", "4");
    legs.push(legSegment2);
  }); 

  // Fangs
  const fangs = [];
  const fangPositions = [
      {x1: 75, y1: 60, x2: 70, y2: 70},
      {x1: 85, y1: 60, x2: 80, y2: 70}
  ];

  fangPositions.forEach(pos => {
    const fang = document.createElementNS("http://www.w3.org/2000/svg", "line");
    fang.setAttribute("x1", pos.x1);
    fang.setAttribute("y1", pos.y1);
    fang.setAttribute("x2", pos.x2);
    fang.setAttribute("y2", pos.y2);
    fang.setAttribute("stroke", "#8b0000");
    fang.setAttribute("stroke-width", "3");
    fangs.push(fang);
  });

  // Add all elements to SVG
  legs.forEach(leg => svg.appendChild(leg));
  svg.appendChild(body);
  svg.appendChild(head);
  eyes.forEach(eye => svg.appendChild(eye));
  fangs.forEach(fang => svg.appendChild(fang));

  return svg;
}

function createGiantSpiderAttackSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  // Body - main thorax (raised slightly)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "45");  // Moved up slightly
  body.setAttribute("rx", "25");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#2d2d2d");

  // Head (raised and tilted forward)
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "40");  // Moved up
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#1a1a1a");

  // Eyes with eyebrows (4 pairs)
  const eyes = [];
  const eyebrows = [];
  const eyePositions = [
    {x: 70, y: 35}, {x: 80, y: 35},  // Top pair
    {x: 70, y: 40}, {x: 80, y: 40},  // Middle pair
    {x: 70, y: 45}, {x: 80, y: 45},  // Bottom pair
    {x: 65, y: 37}, {x: 85, y: 37}   // Outer pair
  ];

  eyePositions.forEach((pos, index) => {
    // Create eye
    const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    eye.setAttribute("cx", pos.x);
    eye.setAttribute("cy", pos.y);
    eye.setAttribute("r", "2");
    eye.setAttribute("fill", "#ff0000");
    eyes.push(eye);

    // Add angry eyebrow
    const eyebrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // Left side eyes (even indices)
    if (index % 2 === 0) {
      eyebrow.setAttribute("x1", pos.x - 3);
      eyebrow.setAttribute("y1", pos.y - 5);
      eyebrow.setAttribute("x2", pos.x + 2);
      eyebrow.setAttribute("y2", pos.y - 2);
    } else { // Right side eyes (odd indices)
      eyebrow.setAttribute("x1", pos.x - 2);
      eyebrow.setAttribute("y1", pos.y - 2);
      eyebrow.setAttribute("x2", pos.x + 3);
      eyebrow.setAttribute("y2", pos.y - 5);
    }
    eyebrow.setAttribute("stroke", "#ee8888");
    eyebrow.setAttribute("stroke-width", "1.5");  // Thicker lines
    eyebrows.push(eyebrow);
  });

  // Legs
  const legs = [];
  const legPositions = [
    // Left legs (front to back) - front legs raised for attack
    {
      start: {x: 30, y: 35},
      joint: {x: 15, y: 15},
      end: {x: 5, y: 25}
    },
    {
      start: {x: 35, y: 40},
      joint: {x: 18, y: 20},
      end: {x: 10, y: 35}
    },
    {
      start: {x: 40, y: 45},
      joint: {x: 22, y: 32},
      end: {x: 15, y: 66}
    },
    {
      start: {x: 45, y: 50},
      joint: {x: 28, y: 35},
      end: {x: 20, y: 68}
    },
    // Right legs (front to back) - front legs raised for attack
    {
      start: {x: 70, y: 35},
      joint: {x: 85, y: 15},
      end: {x: 95, y: 25}
    },
    {
      start: {x: 65, y: 40},
      joint: {x: 82, y: 20},
      end: {x: 90, y: 35}
    },
    {
      start: {x: 60, y: 45},
      joint: {x: 78, y: 32},
      end: {x: 85, y: 66}
    },
    {
      start: {x: 55, y: 50},
      joint: {x: 72, y: 35},
      end: {x: 80, y: 68}
    }
  ];

  legPositions.forEach(pos => {
    // First segment
    const legSegment1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment1.setAttribute("x1", pos.start.x);
    legSegment1.setAttribute("y1", pos.start.y);
    legSegment1.setAttribute("x2", pos.joint.x);
    legSegment1.setAttribute("y2", pos.joint.y);
    legSegment1.setAttribute("stroke", "#2d2d2d");
    legSegment1.setAttribute("stroke-width", "4");
    legs.push(legSegment1);

    // Second segment
    const legSegment2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment2.setAttribute("x1", pos.joint.x);
    legSegment2.setAttribute("y1", pos.joint.y);
    legSegment2.setAttribute("x2", pos.end.x);
    legSegment2.setAttribute("y2", pos.end.y);
    legSegment2.setAttribute("stroke", "#2d2d2d");
    legSegment2.setAttribute("stroke-width", "4");
    legs.push(legSegment2);
  }); 

  // Fangs (more aggressive angle)
  const fangs = [];
  const fangPositions = [
      {x1: 75, y1: 50, x2: 70, y2: 65},
      {x1: 85, y1: 50, x2: 80, y2: 65}
  ];

  fangPositions.forEach(pos => {
    const fang = document.createElementNS("http://www.w3.org/2000/svg", "line");
    fang.setAttribute("x1", pos.x1);
    fang.setAttribute("y1", pos.y1);
    fang.setAttribute("x2", pos.x2);
    fang.setAttribute("y2", pos.y2);
    fang.setAttribute("stroke", "#8b0000");
    fang.setAttribute("stroke-width", "3");
    fangs.push(fang);
  });

  // Add all elements to SVG
  legs.forEach(leg => svg.appendChild(leg));
  svg.appendChild(body);
  svg.appendChild(head);
  eyes.forEach(eye => svg.appendChild(eye));
  eyebrows.forEach(eyebrow => svg.appendChild(eyebrow));  // Add eyebrows after eyes
  fangs.forEach(fang => svg.appendChild(fang));

  return svg;
}

function createGiantSpiderDamagedSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  // Body - main thorax with wounds
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "25");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#2d2d2d");

  // Add wounds/gashes to body
  const wounds = [];
  const woundPositions = [
    {x1: 40, y1: 45, x2: 50, y2: 45},
    {x1: 45, y1: 55, x2: 55, y2: 55}
  ];

  woundPositions.forEach(pos => {
    const wound = document.createElementNS("http://www.w3.org/2000/svg", "line");
    wound.setAttribute("x1", pos.x1);
    wound.setAttribute("y1", pos.y1);
    wound.setAttribute("x2", pos.x2);
    wound.setAttribute("y2", pos.y2);
    wound.setAttribute("stroke", "#8b0000");
    wound.setAttribute("stroke-width", "2");
    wounds.push(wound);
  });

  // Head (slightly tilted)
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "52");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#1a1a1a");

  // Eyes (some damaged/closed)
  const eyes = [];
  const eyePositions = [
    {x: 70, y: 47}, {x: 80, y: 47},  // Top pair
    {x: 70, y: 52}, {x: 80, y: 52},  // Middle pair
    {x: 70, y: 57}, {x: 80, y: 57},  // Bottom pair
    {x: 65, y: 49}, {x: 85, y: 49}   // Outer pair
  ];

  eyePositions.forEach((pos, index) => {
    if (index % 3 === 0) { // Make some eyes appear damaged (X shape)
      const eyeX1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const eyeX2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      eyeX1.setAttribute("x1", pos.x - 2);
      eyeX1.setAttribute("y1", pos.y - 2);
      eyeX1.setAttribute("x2", pos.x + 2);
      eyeX1.setAttribute("y2", pos.y + 2);
      eyeX2.setAttribute("x1", pos.x - 2);
      eyeX2.setAttribute("y1", pos.y + 2);
      eyeX2.setAttribute("x2", pos.x + 2);
      eyeX2.setAttribute("y2", pos.y - 2);
      eyeX1.setAttribute("stroke", "#8b0000");
      eyeX2.setAttribute("stroke", "#8b0000");
      eyeX1.setAttribute("stroke-width", "1");
      eyeX2.setAttribute("stroke-width", "1");
      eyes.push(eyeX1, eyeX2);
    } else {
      const eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      eye.setAttribute("cx", pos.x);
      eye.setAttribute("cy", pos.y);
      eye.setAttribute("r", "2");
      eye.setAttribute("fill", "#ff0000");
      eyes.push(eye);
    }
  });

  // Legs
  const legs = [];
  const legPositions = [
    // Left legs (front to back)
    {
      start: {x: 30, y: 40},
      joint: {x: 15, y: 25},
      end: {x: 5, y: 65}
    },
    {
      start: {x: 35, y: 45},
      joint: {x: 18, y: 28},
      end: {x: 10, y: 67}
    },
    {
      start: {x: 40, y: 50},
      joint: {x: 22, y: 32},
      end: {x: 15, y: 66}
    },
    {
      start: {x: 45, y: 55},
      joint: {x: 28, y: 35},
      end: {x: 20, y: 68}
    },
    // Right legs (front to back)
    {
      start: {x: 70, y: 40},
      joint: {x: 85, y: 25},
      end: {x: 95, y: 65}
    },
    {
      start: {x: 65, y: 45},
      joint: {x: 82, y: 28},
      end: {x: 90, y: 67}
    },
    {
      start: {x: 60, y: 50},
      joint: {x: 78, y: 32},
      end: {x: 85, y: 66}
    },
    {
      start: {x: 55, y: 55},
      joint: {x: 72, y: 35},
      end: {x: 80, y: 68}
    }
  ];

  legPositions.forEach(pos => {
    // First segment
    const legSegment1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment1.setAttribute("x1", pos.start.x);
    legSegment1.setAttribute("y1", pos.start.y);
    legSegment1.setAttribute("x2", pos.joint.x);
    legSegment1.setAttribute("y2", pos.joint.y);
    legSegment1.setAttribute("stroke", "#2d2d2d");
    legSegment1.setAttribute("stroke-width", "4");
    legs.push(legSegment1);

    // Second segment
    const legSegment2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment2.setAttribute("x1", pos.joint.x);
    legSegment2.setAttribute("y1", pos.joint.y);
    legSegment2.setAttribute("x2", pos.end.x);
    legSegment2.setAttribute("y2", pos.end.y);
    legSegment2.setAttribute("stroke", "#2d2d2d");
    legSegment2.setAttribute("stroke-width", "4");
    legs.push(legSegment2);
  }); 

  // Fangs
  const fangs = [];
  const fangPositions = [
      {x1: 75, y1: 60, x2: 70, y2: 70},
      {x1: 85, y1: 60, x2: 80, y2: 70}
  ];

  fangPositions.forEach(pos => {
    const fang = document.createElementNS("http://www.w3.org/2000/svg", "line");
    fang.setAttribute("x1", pos.x1);
    fang.setAttribute("y1", pos.y1);
    fang.setAttribute("x2", pos.x2);
    fang.setAttribute("y2", pos.y2);
    fang.setAttribute("stroke", "#8b0000");
    fang.setAttribute("stroke-width", "3");
    fangs.push(fang);
  });

  // Add all elements to SVG
  legs.forEach(leg => svg.appendChild(leg));
  svg.appendChild(body);
  wounds.forEach(wound => svg.appendChild(wound));
  svg.appendChild(head);
  eyes.forEach(eye => svg.appendChild(eye));
  fangs.forEach(fang => svg.appendChild(fang));

  return svg;
}

function createGiantSpiderDeadSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  // Body - main thorax (flipped upside down)
  const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "50");
  body.setAttribute("rx", "25");
  body.setAttribute("ry", "20");
  body.setAttribute("fill", "#1a1a1a");

  // Head (positioned differently when upside down)
  const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  head.setAttribute("cx", "75");
  head.setAttribute("cy", "50");
  head.setAttribute("r", "15");
  head.setAttribute("fill", "#0f0f0f");

  // X eyes to show dead state
  const eyes = [];
  const eyePositions = [
    {x: 70, y: 45}, {x: 80, y: 45},  // Top pair
    {x: 70, y: 50}, {x: 80, y: 50},  // Middle pair
    {x: 70, y: 55}, {x: 80, y: 55},  // Bottom pair
    {x: 65, y: 47}, {x: 85, y: 47}   // Outer pair
  ];

  eyePositions.forEach(pos => {
    const eyeX1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const eyeX2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    eyeX1.setAttribute("x1", pos.x - 2);
    eyeX1.setAttribute("y1", pos.y - 2);
    eyeX1.setAttribute("x2", pos.x + 2);
    eyeX1.setAttribute("y2", pos.y + 2);
    eyeX2.setAttribute("x1", pos.x - 2);
    eyeX2.setAttribute("y1", pos.y + 2);
    eyeX2.setAttribute("x2", pos.x + 2);
    eyeX2.setAttribute("y2", pos.y - 2);
    eyeX1.setAttribute("stroke", "#666");
    eyeX2.setAttribute("stroke", "#666");
    eyeX1.setAttribute("stroke-width", "1");
    eyeX2.setAttribute("stroke-width", "1");
    eyes.push(eyeX1, eyeX2);
  });

  // Legs (curled up)
  const legs = [];
  const legPositions = [
    // Left legs (curled)
    {
      start: {x: 30, y: 40},
      joint: {x: 20, y: 35},
      end: {x: 25, y: 30}
    },
    {
      start: {x: 35, y: 45},
      joint: {x: 25, y: 40},
      end: {x: 30, y: 35}
    },
    {
      start: {x: 40, y: 50},
      joint: {x: 30, y: 45},
      end: {x: 35, y: 40}
    },
    {
      start: {x: 45, y: 55},
      joint: {x: 35, y: 50},
      end: {x: 40, y: 45}
    },
    // Right legs (curled)
    {
      start: {x: 70, y: 40},
      joint: {x: 80, y: 35},
      end: {x: 75, y: 30}
    },
    {
      start: {x: 65, y: 45},
      joint: {x: 75, y: 40},
      end: {x: 70, y: 35}
    },
    {
      start: {x: 60, y: 50},
      joint: {x: 70, y: 45},
      end: {x: 65, y: 40}
    },
    {
      start: {x: 55, y: 55},
      joint: {x: 65, y: 50},
      end: {x: 60, y: 45}
    }
  ];

  legPositions.forEach(pos => {
    const legSegment1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment1.setAttribute("x1", pos.start.x);
    legSegment1.setAttribute("y1", pos.start.y);
    legSegment1.setAttribute("x2", pos.joint.x);
    legSegment1.setAttribute("y2", pos.joint.y);
    legSegment1.setAttribute("stroke", "#1a1a1a");
    legSegment1.setAttribute("stroke-width", "4");
    legs.push(legSegment1);

    const legSegment2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    legSegment2.setAttribute("x1", pos.joint.x);
    legSegment2.setAttribute("y1", pos.joint.y);
    legSegment2.setAttribute("x2", pos.end.x);
    legSegment2.setAttribute("y2", pos.end.y);
    legSegment2.setAttribute("stroke", "#1a1a1a");
    legSegment2.setAttribute("stroke-width", "4");
    legs.push(legSegment2);
  });

  // Add all elements to SVG
  legs.forEach(leg => svg.appendChild(leg));
  svg.appendChild(body);
  svg.appendChild(head);
  eyes.forEach(eye => svg.appendChild(eye));

  return svg;
}

function createGiantSpiderTrap(trapContainer) {
  // Clear existing content
  trapContainer.innerHTML = '';

  // Get actual dimensions of the container
  const style = window.getComputedStyle(trapContainer);
  const width = parseFloat(style.width);
  const height = parseFloat(style.height);
  const aspectRatio = width / height;

  // Create SVG element that fills the container
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  // Set viewBox to match container's aspect ratio
  svg.setAttribute("viewBox", `0 0 ${100 * aspectRatio} 100`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  // Helper function to create slightly randomized points
  function randomizePoint(x, y, amount = 2) {
    return {
      x: x + (Math.random() - 0.5) * amount,
      y: y + (Math.random() - 0.5) * amount
    };
  }

  // Helper function to calculate distance to container edge
  function getDistanceToEdge(angle) {
    const x = center.x;
    const y = center.y;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    // Calculate intersections with container edges, accounting for aspect ratio
    let dist;
    if (Math.abs(cos) > 0.0001) {
      // Check horizontal edges
      const dx = cos > 0 ? (100 * aspectRatio - x) : -x;
      const dy = dx * sin / cos;
      const yIntersect = y + dy;
      if (yIntersect >= 0 && yIntersect <= 100) {
        dist = Math.sqrt(dx * dx + dy * dy);
      }
    }
    if (Math.abs(sin) > 0.0001) {
      // Check vertical edges
      const dy = sin > 0 ? (100 - y) : -y;
      const dx = dy * cos / sin;
      const xIntersect = x + dx;
      if (xIntersect >= 0 && xIntersect <= 100 * aspectRatio) {
        const newDist = Math.sqrt(dx * dx + dy * dy);
        dist = dist ? Math.min(dist, newDist) : newDist;
      }
    }
    return dist - 5.0; // Leave a small margin from the edge
  }

  // Create radial threads
  const center = { x: 50 * aspectRatio, y: 50 };
  const numRadials = 11;
  const radials = [];

  for (let i = 0; i < numRadials; i++) {
    const baseAngle = (i * 2 * Math.PI) / numRadials;
    const angle = baseAngle + (Math.random() - 0.5) * 0.35;
    const length = getDistanceToEdge(angle);
    const endX = center.x + length * Math.cos(angle);
    const endY = center.y + length * Math.sin(angle);
    
    const radial = document.createElementNS("http://www.w3.org/2000/svg", "line");
    radial.setAttribute("x1", center.x);
    radial.setAttribute("y1", center.y);
    radial.setAttribute("x2", endX);
    radial.setAttribute("y2", endY);
    radial.setAttribute("stroke", "rgba(255, 255, 255, 0.85)");
    radial.setAttribute("stroke-width", "0.333");
    svg.appendChild(radial);
    radials.push({ endX, endY, length });
  }

  // Create spiral threads - now using relative distances based on radial lengths
  for (let radius = 0.2; radius <= 1.0; radius += 0.111) { // Use relative distances
    const spiralPath = [];
    for (let angle = 0; angle < 2 * Math.PI + 0.2; angle += 0.2) {
      const modAngle = angle % (2 * Math.PI);
      const radialIndex = Math.floor((modAngle * numRadials) / (2 * Math.PI));
      const nextIndex = (radialIndex + 1) % numRadials;
      const progress = (modAngle * numRadials) / (2 * Math.PI) - radialIndex;
      
      // Interpolate between radial lengths
      const currentLength = radials[radialIndex].length;
      const nextLength = radials[nextIndex].length;
      const interpolatedLength = currentLength * (1 - progress) + nextLength * progress;
      
      const currentRadius = interpolatedLength * radius;
      const x = center.x + currentRadius * Math.cos(modAngle);
      const y = center.y + currentRadius * Math.sin(modAngle);
      const point = randomizePoint(x, y, 1.0);
      spiralPath.push(`${spiralPath.length === 0 ? 'M' : 'L'}${point.x},${point.y}`);
    }
    
    const spiral = document.createElementNS("http://www.w3.org/2000/svg", "path");
    spiral.setAttribute("d", spiralPath.join(' '));
    spiral.setAttribute("stroke", "rgba(255, 255, 255, 0.6)");
    spiral.setAttribute("stroke-width", "0.333");
    spiral.setAttribute("fill", "none");
    svg.appendChild(spiral);
  }

  // Add dew drops / connection points - adjusted for variable web size
  for (let i = 0; i < 15; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radialIndex = Math.floor((angle * numRadials) / (2 * Math.PI));
    const maxRadius = radials[radialIndex].length * 0.8; // Stay within web bounds
    const radius = Math.random() * maxRadius;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    
    const dewDrop = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dewDrop.setAttribute("cx", x);
    dewDrop.setAttribute("cy", y);
    dewDrop.setAttribute("r", Math.random() * 0.8 + 0.2);
    dewDrop.setAttribute("fill", "rgba(255, 255, 255, 0.9)");
    svg.appendChild(dewDrop);
  }

  trapContainer.appendChild(svg);
}

export class GiantSpider {
  constructor() {
    this.create = createGiantSpiderSvg;
    this.createAttack = createGiantSpiderAttackSvg;
    this.createDamaged = createGiantSpiderDamagedSvg;
    this.createDead = createGiantSpiderDeadSvg;
    this.createTrap = (trapContainer) => {
      createGiantSpiderTrap(trapContainer);
      this.justTrapped = true;
    };
    
    this.maxHealth = 45;
    this.health = this.maxHealth;
    this.strength = 6;
    this.attacks = 1;
    this.xp = 24;
    this.size = 6;

    this.attackCount = 0;
    this.justTrapped = false;
  }

  nextAttack() {
    this.attackCount++;

    let attacks = this.attackCount % 2 == 0 ? 8 : 1;

    if (this.justTrapped) {
      this.justTrapped = false;
      attacks = 4;
      this.attackCount = 0; // Make sure we don't punish immediately after a punish
    }
    
    return { image: this.createAttack(), strength: this.strength, attacks };
  }
}