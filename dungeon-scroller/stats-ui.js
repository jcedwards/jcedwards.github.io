/**
 * This function builds out the stats screen UI using actual player data.
 * @param {HTMLElement} elem - The element to build the stats UI in
 * @param {Game} game - The game instance containing player data
 */
export function buildStatScreen(elem, game) {
  elem.innerHTML = '';
  
  // Create a container for proper positioning
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  elem.appendChild(container);

  // Stats section - positioned in the mid-upper part
  const statsSection = document.createElement('div');
  statsSection.style.marginTop = '10%';
  statsSection.style.textAlign = 'center';
  container.appendChild(statsSection);

  // Use actual player stats
  const stats = game.player.stats;
  
  // Create a more compact stat display
  const statsDisplay = document.createElement('div');
  statsDisplay.style.margin = '10px auto';
  statsDisplay.style.padding = '5px 15px';
  statsDisplay.style.display = 'inline-block';
  statsDisplay.style.minWidth = '150px';
  
  // Level on its own line
  const levelDiv = document.createElement('div');
  levelDiv.style.fontSize = '1.2em';
  levelDiv.style.fontWeight = 'bold';
  levelDiv.style.margin = '8px 0 20px 0'; // Increased bottom margin for more spacing
  levelDiv.textContent = `Level: ${stats.level}`;
  statsDisplay.appendChild(levelDiv);
  
  // Create a table for aligned stats
  const statsTable = document.createElement('table');
  statsTable.style.margin = '0 auto';
  statsTable.style.borderCollapse = 'collapse';
  statsTable.style.width = '100%';
  
  // Add each stat as a row with two columns
  const statsData = [
    { label: 'HP:', value: `${stats.health}/${stats.maxHealth}` },
    { label: 'XP:', value: `${stats.xp}` },
    { label: 'Strength:', value: `${stats.strength}` },
    { label: 'Attacks:', value: `${stats.attacks}` }
  ];
  
  statsData.forEach(stat => {
    const row = document.createElement('tr');
    
    const labelCell = document.createElement('td');
    labelCell.style.textAlign = 'left';
    labelCell.style.padding = '5px 10px 5px 0';
    labelCell.textContent = stat.label;
    
    const valueCell = document.createElement('td');
    valueCell.style.textAlign = 'right';
    valueCell.style.padding = '5px 0 5px 10px';
    valueCell.textContent = stat.value;
    
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    statsTable.appendChild(row);
  });
  
  statsDisplay.appendChild(statsTable);
  statsSection.appendChild(statsDisplay);

  // Add large pause icon in the center with animation
  const pauseIcon = document.createElement('div');
  pauseIcon.style.position = 'absolute';
  pauseIcon.style.top = '50%';
  pauseIcon.style.left = '50%';
  pauseIcon.style.transform = 'translate(-50%, -50%)';
  pauseIcon.style.opacity = '0';  // Start with 0 opacity for fade-in
  pauseIcon.style.fontSize = '85px';
  pauseIcon.style.color = 'white';
  pauseIcon.innerHTML = '&#10074;&#10074;'; // Unicode pause symbol
  
  // Add animation styles
  pauseIcon.style.animation = 'popIn 0.4s forwards';
  
  // Create and add the keyframes style element
  const keyframesStyle = document.createElement('style');
  keyframesStyle.textContent = `
    @keyframes popIn {
      0% { 
        transform: translate(-50%, -50%) scale(0.5); 
        opacity: 0;
      }
      50% { 
        transform: translate(-50%, -50%) scale(1.125); 
        opacity: 0.8;
      }
      75% { 
        transform: translate(-50%, -50%) scale(0.95); 
        opacity: 0.9;
      }
      100% { 
        transform: translate(-50%, -50%) scale(1); 
        opacity: 0.9;
      }
    }
  `;
  
  document.head.appendChild(keyframesStyle);
  container.appendChild(pauseIcon);
}
