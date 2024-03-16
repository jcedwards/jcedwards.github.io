var confirmationResolve = null;

function addItems(parentElement, items, selectedItemsArray, options) {
    options = options || {};
    const selectCount = options.selectCount || 1;
    const startDisabled = options.startDisabled || false;
    const createAndReturnConfirmButtonLabled = options.createAndReturnConfirmButtonLabled || null;

    let button = null;
    if (createAndReturnConfirmButtonLabled) {
        button = document.createElement('button');
        button.innerHTML = createAndReturnConfirmButtonLabled;
        button.disabled = true;
    }

    selectedItemsArray.length = 0;
    let checkboxes = [];
    for (let i = 0; i < items.length; i++) {
        let itemName = items[i];

        let wrapper = document.createElement('span');
        wrapper.classList.add('item-wrapper');
        parentElement.appendChild(wrapper);

        if (startDisabled) {
            let dummy = document.createElement('span');
            dummy.classList.add('item-disabled');
            dummy.innerHTML = itemName;
            wrapper.appendChild(dummy);
            continue;
        }

        let checkbox = document.createElement('input');
        checkboxes.push(checkbox);
        checkbox.classList.add('item-hidden');
        checkbox.id = itemName;
        checkbox.type = 'checkbox';
        wrapper.appendChild(checkbox);

        let label = document.createElement('label');
        label.classList.add('item');
        label.htmlFor = itemName;
        wrapper.appendChild(label);

        let text = document.createElement('span');
        text.classList.add('item-text');
        text.innerText = itemName;
        label.appendChild(text);

        checkbox.addEventListener('change', (event) => {
            if (checkbox.checked) {
                let oldCurrentSelectedCount = selectedItemsArray.length;

                // Don't allow the user to select more than the select count
                while (selectedItemsArray.length >= selectCount) {
                    let other = selectedItemsArray.pop();
                    checkboxes.forEach(cb => { if (cb.id == other) { cb.checked = false; } });
                }

                selectedItemsArray.push(itemName);

                // Once we've selected up to selectCount items, we can enable the confirmation button
                if (oldCurrentSelectedCount < selectCount && selectedItemsArray.length == selectCount && button) {
                    button.disabled = false;
                }
            } else {
                let idx = selectedItemsArray.findIndex((arrName) => arrName == itemName);
                selectedItemsArray.splice(idx, 1);
                if (selectedItemsArray.length <= selectCount - 1) {
                    button.disabled = true;
                }
            }
        });
    }

    return button;
}

function disableItems(itemContainer, onlyThese) {
    let inputs = itemContainer.querySelectorAll('input');
    let itemNames = [];
    let wrappers = [];
    inputs.forEach((input) => {
        itemNames.push(input.nextElementSibling.textContent);
        wrappers.push(input.parentElement);
    });
    for (let i = 0; i < wrappers.length; i++) {
        if (!onlyThese || onlyThese.includes(itemNames[i])) {
            wrappers[i].innerHTML = `<span class="item-disabled">${itemNames[i]}</span>`;
        }
    }
}

function pushToFeed(elem) {
    let textContainer = document.getElementById('text');

    // Keep the feed scrolled all the way down, if it is already
    let isScrolledDown = textContainer.scrollHeight - textContainer.clientHeight <= textContainer.scrollTop + 2;

    let wrapper = document.createElement('div');
    wrapper.classList.add('text-wrapper-outer');
    wrapper.appendChild(elem);
    textContainer.appendChild(wrapper);

    let height = wrapper.scrollHeight;
    wrapper.style.overflow = 'clip';
    // wrapper.style.marginBottom = `1.0rem`;
    // wrapper.style.maxHeight = `${height}px`;
    wrapper.style.opacity = '1.0';
    let transitioning = true;
    wrapper.addEventListener('transitionend', (event) => { transitioning = false; });
    let updater = function() {
        if (isScrolledDown) {
            textContainer.scrollTop = textContainer.scrollHeight - textContainer.clientHeight;
        }
        if (!transitioning) {
            wrapper.style.overflow = 'visible';
            return;
        }
        setTimeout(updater, 0);
    };
    updater();
}

async function clearFeed() {
    let textContainer = document.getElementById('text');
    let elems = textContainer.querySelectorAll('.text-wrapper-outer');
    if (elems.length == 0) { return null; }

    let transitionResolve = null;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.opacity = '0';

        if (i == elems.length - 1) {
            elems[i].addEventListener('transitionend', (event) => {
                if (transitionResolve) { transitionResolve(); }
                textContainer.innerHTML = '';
                window.scrollTo(0, 0);
            });
        }
    }
    return new Promise((resolve, reject) => { transitionResolve = resolve; });
}

function markdownToHtml(markdown) {
    const lines = markdown.split("\n\n");
    const htmlLines = lines.map(line => {
        // Convert headings
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)[0].length;
            const headingText = line.slice(level).trim();
            return `<h${level}>${convertInlineElements(headingText)}</h${level}>`;
        } 
        // Convert paragraphs, treat lines not matching other rules as paragraphs
        else {
            return `<p>${convertInlineElements(line)}</p>`;
        }
    });
   return htmlLines.join("\n");
}
function convertInlineElements(text) {
    // Convert bold text (**bold**)
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function displayText(markdown) {
    let feedItem = document.createElement('div');
    feedItem.classList.add('text-wrapper-inner');
    feedItem.innerHTML = markdownToHtml(markdown);
    pushToFeed(feedItem);
}

function waitForConfirmation(confirmButtonLabel) {
    let confirmButton = document.createElement('button');
    confirmButton.innerText = confirmButtonLabel;
    let confirmationResolve = null;
    confirmButton.addEventListener('click', function() {
        if (confirmationResolve) {
            confirmationResolve();
            confirmationResolve = null;
            confirmButton.disabled = true;
        }
    });
    pushToFeed(confirmButton);
    return new Promise((resolve, reject) => { confirmationResolve = resolve; });
}

async function gameLoop() {
    while (true) {
        let items, challenges, challengeResults;

        // Ask the player which game they want to play
        {
            let confirmationResolve = null;
            let feedClear = false;
            let gameLoaded = false;

            let wrapper = document.createElement('div');
            wrapper.classList.add('text-wrapper-inner');
            wrapper.innerHTML = markdownToHtml(`Choose a theme`);

            let buttons = [];
            let addButton = (label, path) => {
                wrapper.appendChild(document.createElement('br'));
                let button = document.createElement('button');
                button.style.marginTop = '0.5rem';
                buttons.push(button);
                button.innerHTML = label;
                button.addEventListener('click', function() {
                    buttons.forEach(button => { button.disabled = true; });
                    clearFeed().then(() => {
                        feedClear = true;
                        if (gameLoaded) {
                            confirmationResolve();
                        }
                    });
                    fetch(`./${path}/game-data.json`).then(response => response.json()).then(gameData => {
                        ({ items, challenges, challengeResults } = gameData);
                        gameLoaded = true;
                        if (feedClear) {
                            confirmationResolve();
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                });
                wrapper.appendChild(button);
            };
            addButton('Taleday', 'taleday');
            addButton('Taleday 2', 'taleday2');
            addButton('Taleday 3', 'taleday3');

            pushToFeed(wrapper);

            await new Promise((resolve, reject) => { confirmationResolve = resolve; });
        }

        // Intro
        // if (intro) {
        //     displayText(`###${intro.title}`+'\n\n'+intro.text);
        //     await waitForConfirmation('Continue');
        //     await clearFeed();
        // }

        // Challenges
        let inventory = [... items];
        let log = { challengeResults: [] };

        function createProgressBarElement(color, chalIdx) {
            let progressContainer = document.createElement('div');
            let completionPercentage = Math.min(99.5, (100.0 * (chalIdx) / 9.0)).toFixed(3);
            progressContainer.innerHTML =
                `<div style="position: relative; width: 100%; height: 1.25rem; padding: 0 0.1rem;">
                    <div style="position: absolute; display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%">
                        <div style="width: 99.5%; height: 0.125rem; background-color: ${color};"></div>
                    </div>
                    <div style="position: absolute; display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; margin: 0 -0.1rem">
                        <div style="width: 0.2rem; height: 100%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 60%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 60%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 60%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 30%; background-color: ${color};"></div>
                        <div style="width: 0.2rem; height: 100%; background-color: ${color};"></div>
                    </div>
                    <div style="position: absolute; display: flex; align-items: center; justify-content: flex-start; width: 100%; height: 100%">
                        <div style="width: ${completionPercentage}%; height: 60%; background-color: ${color}; opacity: 0.2;"></div>
                    </div>
                    <div style="position: absolute; display: flex; align-items: center; justify-content: flex-start; width: 100%; height: 100%">
                        <div style="width: ${completionPercentage}%; height: 60%; background-image: radial-gradient(${color} 40%, transparent 40%), radial-gradient(${color} 40%, transparent 40%); background-position: 0.0625rem 0.0625rem, -0.0625rem -0.0625rem; background-size: 0.25rem 0.25rem; opacity: 0.6;"></div>
                    </div>
                </div>`;
            return progressContainer;
        }

        function displayProgress(chalIdx) {
            let container = document.createElement('div');
            container.classList.add('text-wrapper-inner');
            container.style.color = '#777';
            // Show a progress bar
            container.appendChild(createProgressBarElement('#777', chalIdx));
            pushToFeed(container);
        }

        //
        // Challenges
        //
        for (let i = 0; i < challenges.length; i++) {
            let challenge = challenges[i];

            let failedItems = [];

            // Keep trying this challenge until the user gets it right
            while (true) {
                displayProgress(i);

                displayText('###'+challenge.name+'\n\n'+challenge.description);

                // Let the player select from their inventory
                let invContainer = document.createElement('div');
                invContainer.classList.add('text-wrapper-inner');
                invContainer.innerHTML = markdownToHtml(`###Inventory`);
                let selectedInventoryItems = [];
                let confirmButton = addItems(invContainer, inventory, selectedInventoryItems, { createAndReturnConfirmButtonLabled: 'Confirm' });
                disableItems(invContainer, failedItems);
                pushToFeed(invContainer);

                // Hook up the confirmation button
                {
                    let confirmationResolve = null;
                    confirmButton.addEventListener('click', function() {
                        if (confirmationResolve) {
                            confirmationResolve();
                            confirmButton.disabled = true;
                        }
                    });
                    pushToFeed(confirmButton);
                    await new Promise((resolve, reject) => { confirmationResolve = resolve; });
                }
                disableItems(invContainer);

                let itemName = selectedInventoryItems[0];
                let result = challengeResults[i][itemName];
                if (!result) {
                    displayText('###AUTO FAIL\n\n'+`Error: No result for ${itemName}`+'\n\n###AUTO FAIL');
                    log.challengeResults.push({success: false});
                    await waitForConfirmation('Continue');
                    await clearFeed();
                    continue;
                }

                displayText(`###${result.success ? 'SUCCESS' : 'FAILURE'}`+'\n\n'+result.text);
                let logResult = log.challengeResults[i] || (log.challengeResults[i] = { mistakes: 0 });
                if (!result.success) {
                    logResult.mistakes += 1;
                    failedItems.push(itemName);
                }

                if (result.lost) {
                    inventory.splice(inventory.indexOf(itemName), 1);
                    displayText(`###${itemName} lost.`);
                } else if (result.newItem) {
                    inventory.splice(inventory.indexOf(itemName), 1, result.newItem);
                    displayText(`###${itemName} is now ${result.newItem}.`);
                }

                let mistakes = 0;
                log.challengeResults.forEach(result => mistakes += result.mistakes);
                displayText(`Total extra attempts: ${mistakes}`);

                await waitForConfirmation(result.success ? 'Continue' : 'Try Again');
                await clearFeed();

                if (result.success) {
                    break;
                }
            }
        }

        
        // The player has finished the quest! Give them an ending.
        {
            await clearFeed();

            let mistakes = 0;
            log.challengeResults.forEach(result => mistakes += result.mistakes);

            let msg =
                `Total extra attempts: ${mistakes > 0 ? '+' : ''}${mistakes}`+'\n\n'+
                `Breakdown:`+'\n\n';
            for (let i = 0; i < challenges.length; i++) {
                let mistakes = log.challengeResults[i].mistakes;
                msg += `${i + 1}. ${challenges[i].name}:`.padEnd(25)+` ${mistakes > 0 ? '+' : ''}${mistakes}${mistakes == 0 ? ' ✓' : ''}`+'\n\n';
            }
            displayText(msg);

            await waitForConfirmation('Play Again');
            await clearFeed();

            /*
            let score = 0, scorePossible = 0;
            log.acts.forEach(act => act.challengeResults.forEach(result => { score += result.success ? 1 : 0; ++scorePossible; }));

            let scoreMap = [
                { score: 6.0 / 20.0, desc: 'terrible' },
                { score: 10.0 / 20.0, desc: 'bad' },
                { score: 14.0 / 20.0, desc: 'middling' },
                { score: 17.0 / 20.0, desc: 'good' },
                { score: 20.0 / 20.0, desc: 'great' },
                { score: 21.0 / 20.0, desc: 'perfect' },
            ];
            let scoreDesc = scoreMap[0].desc;
            for (let i = 0; i < scoreMap.length; i++) {
                if (score / scorePossible < scoreMap[i].score) {
                    scoreDesc = scoreMap[i].desc;
                    break;
                }
            }

            displayText('###Epilogue');
            displayText(`###${endings[scoreDesc].name}`+'\n\n'+`${endings[scoreDesc].text}`);

            let msg =
                `Final score: ${score}/${scorePossible}`+'\n\n'+
                `Breakdown:`+'\n\n';
            for (let i = 0; i < acts.length; i++) {
                let score = 0, scorePossible = 0;
                log.acts[i].challengeResults.forEach(result => { score += result.success ? 1 : 0; ++scorePossible; });
                msg += `Act ${i + 1} - ${acts[i].name}:`.padEnd(20)+`${score}/${scorePossible}`+'\n\n';
            }
            displayText(msg);

            await waitForConfirmation('Play Again');
            await clearFeed();
            */
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Kick off the game loop
    gameLoop();
});
