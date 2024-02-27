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
        let log = { realms: [] };

        let inventory = [];

        let welcomeText = '###Welcome traveler!\n\nYour journey will take you across the following realms:';
        for (let realmIdx = 0; realmIdx < realms.length; realmIdx++) {
            welcomeText += '\n\n&nbsp;\n\n###'+realms[realmIdx].name+'\n\n'+realms[realmIdx].desc;
        }
        displayText(welcomeText);
        await waitForConfirmation('continue');
        await clearFeed();

        for (let realmIdx = 0; realmIdx < realms.length; realmIdx++) {
            let realmLog = { challengeResults: [] };
            log.realms.push(realmLog);

            function displayRealm() {
                // Display the current realm
                let realmContainer = document.createElement('div');
                realmContainer.classList.add('text-wrapper-inner');
                realmContainer.style.color = '#777';
                realmContainer.innerHTML = markdownToHtml('###'+realms[realmIdx].name+'\n\n'+realms[realmIdx].desc);
                pushToFeed(realmContainer);
            }

            //
            // Shop
            //
            displayRealm();
            
            let buyCount = realmIdx == 0 ? 4 : 2;
            let shopContainer = document.createElement('div');
            shopContainer.classList.add('text-wrapper-inner');
            shopContainer.innerHTML = markdownToHtml(
                '###Requisitions\n\n'+
                `A small, breathless monk excitedly approaches you:`+
                '\n\n'+
                `"Adventurer, I've finally found you! Please hear my message:`+
                '\n\n'+
                `###${rumors[realmIdx]}`+
                '\n\n'+
                `And please accept from me **${buyCount}** precious boons!"`
            );
            let shop = shops[realmIdx];
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
            for (let i = 0; i < challenges[realmIdx].length; i++) {
                let challenge = challenges[realmIdx][i];

                displayRealm();

                displayText('###'+challenge.name+'\n\n'+challenge.desc);

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

                if (selectedInventoryItems.length != 1) {
                    displayText('###AUTO FAIL\n\nNo Item selected\n\n###AUTO FAIL');
                    realmLog.challengeResults.push({success: false});
                    await waitForConfirmation('Continue');
                    await clearFeed();
                    continue;
                }

                let itemName = selectedInventoryItems[0];
                let result = challengeResults[realmIdx][i][itemName];
                if (!result) {
                    displayText('###AUTO FAIL\n\n'+`Error: No result for ${itemName}`+'\n\n###AUTO FAIL');
                    realmLog.challengeResults.push({success: false});
                    await waitForConfirmation('Continue');
                    await clearFeed();
                    continue;
                }

                displayText(`###${result.success ? 'SUCCESS' : 'FAILURE'}`+'\n\n'+result.text);
                realmLog.challengeResults.push(result);

                let score = 0;
                log.realms.forEach(realm => realm.challengeResults.forEach(result => score += result.success ? 1 : 0));
                displayText(`Score: ${score}`);

                await waitForConfirmation('Continue');
                await clearFeed();
            }
        }

        // The player has finished the quest! Give them an ending.
        {
            let score = 0, scorePossible = 0;
            log.realms.forEach(realm => realm.challengeResults.forEach(result => { score += result.success ? 1 : 0; ++scorePossible; }));

            let scoreMap = [
                { score: 8.0 / 25.0, desc: 'terrible' },
                { score: 11.0 / 25.0, desc: 'bad' },
                { score: 14.0 / 25.0, desc: 'poor-to-middling' },
                { score: 16.0 / 25.0, desc: 'middling' },
                { score: 18.0 / 25.0, desc: 'decent' },
                { score: 20.0 / 25.0, desc: 'good' },
                { score: 22.0 / 25.0, desc: 'great' },
                { score: 25.0 / 25.0, desc: 'amazing' },
                { score: 26.0 / 25.0, desc: 'perfect' },
            ];
            let scoreDesc = scoreMap[0].desc;
            for (let i = 0; i < scoreMap.length; i++) {
                if (score / scorePossible < scoreMap[i].score) {
                    scoreDesc = scoreMap[i].desc;
                    break;
                }
            }

            let msg =
                `###Your journey is complete!`+'\n\n&nbsp;\n\n'+
                `Final score: ${score}/${scorePossible}`+'\n\n&nbsp;\n\n'+
                `Breakdown:`+'\n\n';
            for (let i = 0; i < realms.length; i++) {
                let score = 0, scorePossible = 0;
                log.realms[i].challengeResults.forEach(result => { score += result.success ? 1 : 0; ++scorePossible; });
                msg += `${realms[i].name}:`.padEnd(20)+`${score}/${scorePossible}`+'\n\n';
            }
            msg += '&nbsp;\n\n'+endings[scoreDesc];
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
