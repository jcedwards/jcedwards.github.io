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

function disableItems(itemContainer) {
    let inputs = itemContainer.querySelectorAll('input');
    let itemNames = [];
    let wrappers = [];
    inputs.forEach((input) => {
        itemNames.push(input.nextElementSibling.textContent);
        wrappers.push(input.parentElement);
    });
    for (let i = 0; i < wrappers.length; i++) {
        wrappers[i].innerHTML = `<span class="item-disabled">${itemNames[i]}</span>`;
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
    let { realms, shops, challenges, challengeResults, rumors, endings } = gameData;

    while (true) {
        let acts, shopText, shops, rumors, challengeResults, endings;

        let log = { acts: [] };

        let inventory = [];

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
                buttons.push(button);
                button.innerHTML = label;
                button.addEventListener('click', function() {
                    buttons.forEach(button => { button.disable = true; });
                    clearFeed().then(() => {
                        feedClear = true;
                        if (gameLoaded) {
                            confirmationResolve();
                        }
                    });
                    fetch(`./${path}/game-data.json`).then(response => response.json()).then(gameData => {
                        ({ acts, shops, shopText, challengeResults, rumors, endings } = gameData);
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
            addButton('English Cozy', 'english-cosy');

            pushToFeed(wrapper);

            await new Promise((resolve, reject) => { confirmationResolve = resolve; });
        }

        // There used to be a welcome screen here. Do we still need it?

        for (let actIdx = 0; actIdx < acts.length; actIdx++) {
            let act = acts[actIdx];
            let actLog = { challengeResults: [] };
            log.acts.push(actLog);

            function displayAct() {
                act.name = act.name || `Act ${actIdx + 1}`; //@HACK:!!!
                // Display the current act
                let actContainer = document.createElement('div');
                actContainer.classList.add('text-wrapper-inner');
                actContainer.style.color = '#777';
                actContainer.innerHTML = markdownToHtml('###'+act.name+'\n\n'+act.introduction);
                pushToFeed(actContainer);
            }

            //
            // Shop
            //
            displayAct();
            
            let buyCount = actIdx == 0 ? 4 : 2;
            let shopContainer = document.createElement('div');
            shopContainer.classList.add('text-wrapper-inner');
            let shopTextFilledIn =
                shopText.replace('<|rumor|>', '\n\n###'+rumors[actIdx]+'\n\n').replace('<|count|>', `${buyCount}`);
            shopContainer.innerHTML = markdownToHtml('###Requisitions\n\n'+shopTextFilledIn);
            let shop = shops[actIdx];
            let displayedItems = [];
            for (let i = 0; i < shop.length; i++) {
                if (!inventory.includes(shop[i])) { displayedItems.push(shop[i]); }
            }
            let selectedShopItems = [];
            let confirmButton = addItems(shopContainer, displayedItems, selectedShopItems, { selectCount: buyCount, createAndReturnConfirmButtonLabled: 'Accept' });
            pushToFeed(shopContainer);

            // Helpfully display the player's current inventory, as well
            if (inventory.length > 0) {
                let invContainer = document.createElement('div');
                invContainer.classList.add('text-wrapper-inner');
                invContainer.innerHTML = markdownToHtml(`###Inventory`);
                addItems(invContainer, inventory, [], { startDisabled: true });
                pushToFeed(invContainer);
            }

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

            // Player confirmed purchase, so move selected items into inventory
            for (let i = 0; i < selectedShopItems.length; i++) {
                inventory.push(selectedShopItems[i]);
            }
            selectedShopItems.length = 0;

            await clearFeed();

            //
            // Challenges
            //
            for (let i = 0; i < act.challenges.length; i++) {
                let challenge = act.challenges[i];

                displayAct();

                displayText('###'+challenge.name+'\n\n'+challenge.description);

                // Let the player select from their inventory
                let invContainer = document.createElement('div');
                invContainer.classList.add('text-wrapper-inner');
                invContainer.innerHTML = markdownToHtml(`###Inventory`);
                let selectedInventoryItems = [];
                let confirmButton = addItems(invContainer, inventory, selectedInventoryItems, { createAndReturnConfirmButtonLabled: 'Confirm' });
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
                let result = challengeResults[actIdx][i][itemName];
                if (!result) {
                    displayText('###AUTO FAIL\n\n'+`Error: No result for ${itemName}`+'\n\n###AUTO FAIL');
                    actLog.challengeResults.push({success: false});
                    await waitForConfirmation('Continue');
                    await clearFeed();
                    continue;
                }

                displayText(`###${result.success ? 'SUCCESS' : 'FAILURE'}`+'\n\n'+result.text);
                actLog.challengeResults.push(result);

                let score = 0;
                log.acts.forEach(act => act.challengeResults.forEach(result => score += result.success ? 1 : 0));
                displayText(`Score: ${score}`);

                await waitForConfirmation('Continue');
                await clearFeed();
            }
        }

        // The player has finished the quest! Give them an ending.
        {
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
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Kick off the game loop
    gameLoop();
});
