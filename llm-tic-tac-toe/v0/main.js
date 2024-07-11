var confirmationResolve = null;

//-----------------------------------------------------------------------------
// Tic-tac-toe helpers
//
// The board is a 9-integer array laid out like a phone number pad.
//   0: Empty
//   1: X
//   2: O
//-----------------------------------------------------------------------------
const X = 1;
const O = 2;

function boardToIdx(board) {
    let idx = 0;
    let base = 1;
    for (let i = 0; i < 9; i++) {
        idx += base * board[i];
        base *= 3;
    }
    return idx;
}

function idxToBoard(idx) {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = idx % 3;
        idx = (idx / 3) >>> 0;
    }
    return board;
}

function testWin(board, player) {
    // Test rows
    if (board[0] == player && board[1] == player && board[2] == player) { return true; }
    if (board[3] == player && board[4] == player && board[5] == player) { return true; }
    if (board[6] == player && board[7] == player && board[8] == player) { return true; }
    // Test columns
    if (board[0] == player && board[3] == player && board[6] == player) { return true; }
    if (board[1] == player && board[4] == player && board[7] == player) { return true; }
    if (board[2] == player && board[5] == player && board[8] == player) { return true; }
    // Diagonals
    if (board[0] == player && board[4] == player && board[8] == player) { return true; }
    if (board[6] == player && board[4] == player && board[2] == player) { return true; }
    return false;
}

function reflectBoard(board) {
    let ref = [];
    ref.length = 9;
    ref[0] = board[2];
    ref[1] = board[1];
    ref[2] = board[0];
    ref[3] = board[5];
    ref[4] = board[4];
    ref[5] = board[3];
    ref[6] = board[8];
    ref[7] = board[7];
    ref[8] = board[6];
    return ref;
}

function rotateBoard(board0, rotationCount) {
    if (typeof rotationCount === 'undefined') { rotationCount = 1; }

    let board = [...board0];
    let rot = [];
    rot.length = 9;
    for (let i = 0; i < rotationCount; i++) {
        rot[0] = board[6];
        rot[1] = board[3];
        rot[2] = board[0];
        rot[3] = board[7];
        rot[4] = board[4];
        rot[5] = board[1];
        rot[6] = board[8];
        rot[7] = board[5];
        rot[8] = board[2];
        [rot, board] = [board, rot];
    }
    return board;
}

const BoardPosToStr =
    ['Top Left', 'Top Middle', 'Top Right',
     'Middle Left', 'Middle Middle', 'Middle Right',
     'Bottom Left', 'Bottom Middle', 'Bottom Right'];
function describeBoard(board, delim) {
    delim = delim || '\n';

    let str = '';
    if (board.every(c => c === 0)) {
        str = 'The board is empty';
    } else {
        let skipDelim = '';
        for (let i = 0; i < 9; i++) {
            if (board[i] === 0) { continue; }
            str += `${skipDelim}${BoardPosToStr[i]}: ${board[i] === X ? 'X' : 'O'}`;
            skipDelim = delim;
        }
    }
    return str;
}

//-----------------------------------------------------------------------------
// HTML helpers
//-----------------------------------------------------------------------------
function pushToFeed(elem) {
    let textContainer = document.getElementById('text');

    // Keep the feed scrolled all the way down, if it is already
    let isScrolledDown = textContainer.scrollHeight - textContainer.clientHeight <= textContainer.scrollTop + 2;

    let wrapper = document.createElement('div');
    wrapper.classList.add('group-wrapper-outer');
    wrapper.appendChild(elem);
    textContainer.appendChild(wrapper);

    let height = wrapper.scrollHeight;
    wrapper.style.overflow = 'clip';
    // wrapper.style.marginBottom = `1.0rem`;
    // wrapper.style.maxHeight = `${height}px`;
    wrapper.style.opacity = '1.0';
    if (isScrolledDown) {
        setTimeout(() => { textContainer.scrollIntoView({behavior: 'smooth', block: 'end'}); }, 0);
    }
}

async function clearFeed() {
    let textContainer = document.getElementById('text');
    let elems = textContainer.querySelectorAll('.group-wrapper-outer');
    if (elems.length == 0) { return null; }

    let transitionResolve = null;
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.opacity = '0';

        if (i == 0) {
            let ontransitionend = (event) => {
                if (transitionResolve) { transitionResolve(); }
                textContainer.innerHTML = '';
                window.scrollTo(0, 0);
            };
            let computedStyle = window.getComputedStyle(elems[i]);
            if (computedStyle.getPropertyValue('opacity') == 0) {
                setTimeout(ontransitionend, 0);
            } else {
                elems[i].addEventListener('transitionend', ontransitionend);
                elems[i].addEventListener('transitioncancel', ontransitionend);
            }
        }
    }
    return new Promise((resolve, reject) => { transitionResolve = resolve; });
}

function markdownToHtml(markdown, options) {
    options = options || {};

    const lines = markdown.split("\n\n");
    const htmlLines = lines.map(line => {
        if (options.noTags) {
            line = line.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        }

        // Convert headings
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)[0].length;
            const headingText = line.slice(level).trim();
            return `<h${level}>${convertInlineElements(headingText)}</h${level}>`;
        } 
        // Convert paragraphs, treat lines not matching other rules as paragraphs
        else {
            if (options.replaceNewlineWithBr) {
                line = line.replaceAll('\n', '<br>');
            }
            return `<p>${convertInlineElements(line)}</p>`;
        }
    });
   return htmlLines.join("\n");
}
function convertInlineElements(text) {
    // Convert bold text (**bold**)
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function createDisplayContainer() {
    let container = document.createElement('div');
    container.classList.add('group-wrapper-inner');
    return container;
}

function displayText(container, markdown, options) {
    let elem = document.createElement('div');
    elem.classList.add('text-wrapper');
    elem.innerHTML = markdownToHtml(markdown, options);
    container.appendChild(elem);
    return elem;
}

function addBlockingAction(container, label, onclick) {
    let link = document.createElement('a');
    link.href = 'javascript:void(0);';
    link.innerHTML = label;
    link.addEventListener('click', function() {
        if (onclick) { onclick(); }
        if (confirmationResolve) {
            confirmationResolve();
            confirmationResolve = null;
            link.disabled = true;
        }
    });
    let div = document.createElement('div');
    div.classList.add('text-wrapper');
    div.appendChild(link);
    container.appendChild(div);
}

function waitForBlockingActions() {
    return new Promise((resolve, reject) => { confirmationResolve = resolve; });
}

function addToggle(container, label, getFn, setFn) {
    let labelElem = document.createElement('label');
    labelElem.innerHTML = label;

    let inputElem = document.createElement('input');
    inputElem.type = 'checkbox';
    inputElem.checked = getFn();
    labelElem.appendChild(inputElem);
    inputElem.addEventListener('change', function() {
        setFn(inputElem.checked);
    });

    let div = document.createElement('div');
    div.classList.add('text-wrapper');
    div.appendChild(labelElem);
    container.appendChild(div);
}

function displayBoard(container, board, options) {
    options = options || {};

    let elem = document.createElement('div');
    elem.classList.add('text-wrapper');
    container.appendChild(elem);

    const boardBackground = document.createElement('div');
    boardBackground.classList.add('board-background');
    elem.appendChild(boardBackground);

    const boardGrid = document.createElement('div');
    boardGrid.classList.add('board-grid');
    boardBackground.appendChild(boardGrid);

    let emptySquares = [];
    for (let i = 0; i < 9; i++) {
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('board-square');
        boardSquare.textContent = board[i] === X ? 'X' : board[i] === O ? 'O' : '';
        if (board[i] === 0 && options.onclickEmpty) {
            emptySquares.push(boardSquare);
            boardSquare.classList.add('empty-board-square');
            boardSquare.addEventListener('click', () => {
                for (const emptySquare of emptySquares) {
                    emptySquare.textContent = '';
                }
                boardSquare.textContent = 'X';
                options.onclickEmpty(i);
            });
        }
        boardGrid.appendChild(boardSquare);
    }

}

//-----------------------------------------------------------------------------
// Game
//-----------------------------------------------------------------------------
let options = {
    aiMode: 'full',
    flipAndRotateBoard: false,
    unlimitedTime: true,
    visualBoard: true,
    skipDelay: true,
    showOutput: false,
};

async function gameLoop() {
    // Begin loading the game data in the background
    let dataFetchPromise = fetch(`./data.json`).then(response => response.json());

    //-------------------------------------------------------------------------
    // Display the initial screen
    //-------------------------------------------------------------------------
    let initContainer = createDisplayContainer();
    displayText(initContainer,
        `###LLM Tic-Tac-Toe`+'\n\n'+
        `#####11ᵗʰ of July 2024`//+'\n\n'+
        // `"Large Language Model AIs can't play Tic-tac-toe."`+'\n\n'+
        // `Is that true?`+'\n\n'
        );
        // 11ᵗʰ 3ʳᵈ

    // Block on the user selecting one of two links
    let skipGame = false;
    addBlockingAction(initContainer, 'Play first game', () => {});
    addBlockingAction(initContainer, '(Skip first game)', () => { skipGame = true; });

    pushToFeed(initContainer);

    await waitForBlockingActions();

    await clearFeed();

    //-------------------------------------------------------------------------
    // Game loop
    //-------------------------------------------------------------------------
    let gameData = await dataFetchPromise;

    while (true) {
        let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let flipCount = 0;
        let rotationCount = 0;

        // Take turns until one player wins or the board is full
        while (!skipGame) {
            //---------------------------------------------
            // Tell the player the board state and ask for a move
            //---------------------------------------------
            let playerMove = -1;

            // Flip and rotate the board so the player has to re-analyze it every time
            if (options.flipAndRotateBoard) {
                flipCount += 1;
                rotationCount = 1 + Math.floor(3 * Math.random());
            }
            if (flipCount % 2 === 1) { board = reflectBoard(board); }
            board = rotateBoard(board, rotationCount);

            let playerContainer = createDisplayContainer();

            let readPlayerMove = null;

            if (options.visualBoard) {
                displayBoard(playerContainer, board, {onclickEmpty: (squareId) => {
                    playerMove = squareId;
                }});

                addBlockingAction(playerContainer, 'Confirm', () => {});
            } else {
                displayText(playerContainer, `${describeBoard(board, '\n')}`, {replaceNewlineWithBr: true});

                /*
                margin: 1.25rem 0.25rem;
                font-size: 1.095rem;
                line-height: 1.8rem;
                border-bottom: gray solid 0.125rem;
                border-top: gray solid 0.125rem;
                letter-spacing: 0.055rem;
                */

                displayText(playerContainer,
                    `
                    <fieldset>
                        <legend>Row</legend>
                        <label><input type="radio" name="row" value="0" />Top</label>
                        <br>
                        <label><input type="radio" name="row" value="1" />Middle</label>
                        <br>
                        <label><input type="radio" name="row" value="2" />Bottom</label>
                    </fieldset>
                    <fieldset>
                        <legend>Column</legend>
                        <label><input type="radio" name="col" value="0" />Left</label>
                        <br>
                        <label><input type="radio" name="col" value="1" />Middle</label>
                        <br>
                        <label><input type="radio" name="col" value="2" />Right</label>
                    </fieldset>
                    `);

                readPlayerMove = () => {
                    let row = -1;
                    let col = -1;
                    let rowButtons = document.querySelectorAll('input[name="row"]');
                    let colButtons = document.querySelectorAll('input[name="col"]');
                    rowButtons.forEach(button => { if (button.checked) { row = parseInt(button.value); } });
                    colButtons.forEach(button => { if (button.checked) { col = parseInt(button.value); } });
                    if (row >= 0 && col >= 0) {
                        playerMove = 3 * row + col;
                    } else {
                        playerMove = -2;
                    }
                };

                addBlockingAction(playerContainer, 'Confirm', readPlayerMove);
            }

            if (!options.unlimitedTime) {
                displayText(playerContainer,
                    `<progress id="move-timer" max="1000" value="1000">100%</progress>`);
            }

            pushToFeed(playerContainer);

            if (!options.unlimitedTime) {
                let maxTime = gameData[options.aiMode].highTime + 3000.0;
                let startTime = performance.now();
                let timerBar = document.getElementById('move-timer');
                let animateTimer = () => {
                    let currentTime = performance.now();
                    let remaining = Math.max(0.0, 1.0 - (currentTime - startTime) / maxTime);

                    timerBar.value = Math.round(1000.0 * remaining);
                    timerBar.innerText = Math.round(100.0 * remaining)+'%';

                    if (remaining > 0.0 && playerMove === -1) {
                        requestAnimationFrame(animateTimer);
                    } else {
                        // Unwait on the blocking action
                        if (confirmationResolve) {
                            confirmationResolve();
                            confirmationResolve = null;
                        }

                        if (readPlayerMove) {
                            readPlayerMove();
                        }
                    }
                }
                requestAnimationFrame(animateTimer);
            }

            await waitForBlockingActions();

            //---------------------------------------------
            // Verify the move
            //---------------------------------------------
            let moveContainer = createDisplayContainer();
            if (playerMove < 0) {
                displayText(moveContainer, `You failed to select a move, skipping your turn ...`);
            } else if (board[playerMove] !== 0) {
                displayText(moveContainer, `You selected an occupied space, skipping your turn ...`);
            } else {
                displayText(moveContainer, `You moved to ${BoardPosToStr[playerMove]}`);
                board[playerMove] = X;
            }

            pushToFeed(moveContainer);

            // Rotate and flip the board back to its original state
            board = rotateBoard(board, 4 - rotationCount);
            if (flipCount % 2 === 1) { board = reflectBoard(board); }

            // Check for an end state
            if (testWin(board, X) || board.every(c => c !== 0)) { break; }

            //---------------------------------------------
            // Let the AI make its move
            //---------------------------------------------
            let ai = gameData[options.aiMode].boards[boardToIdx(board)];

            if (options.showOutput) {
                let promptContainer = createDisplayContainer();

                let prompt = '';
                if (options.aiMode === 'blitz') {
                    prompt =
`Here is a description of a tic-tac-toe game in progress:

<board>
${describeBoard(board, '\n')}
</board>

You are playing O and trying very hard to win. Output only your move in the following format:

Row: [Top-Middle-Bottom]
Column: [Left-Middle-Right]

Don't write anything else.`;
                } else if (options.aiMode === 'self-prompted') {
                    prompt =
`You are playing a game of tic-tac-toe as the O player. Your goal is to make the best possible move to either win the game or prevent your opponent (X player) from winning. The current state of the board is represented below:

<board>
${describeBoard(board, '\n')}
</board>

Analyze the board carefully and follow these steps:

1. Examine each empty square on the board.

2. For each empty square, consider the following:
   a. If placing an O in this square would result in a win for you, prioritize this move.
   b. If placing an O in this square would block an immediate win for X, prioritize this move.
   c. Check if this square could be part of a potential fork (a situation where you create two winning opportunities in a single move) for you.
   d. Check if this square could block a potential fork for your opponent.

3. Look out for these specific scenarios:
   - Corner traps: If X has taken two opposite corners, avoid the edge squares to prevent a forced win.
   - Center control: If the center is open and it's your first move, strongly consider taking it.
   - Blocking two-in-a-row: Always block if X has two in a row with an open third square.

4. After considering all possible moves, choose the best one based on this priority:
   1. Winning move
   2. Blocking opponent's winning move
   3. Creating a fork
   4. Blocking opponent's fork
   5. Center square
   6. Opposite corner of opponent
   7. Empty corner
   8. Empty side

5. Provide your analysis and chosen move in the following format:

<analysis>
Explain your thought process here, including why you chose your move and any key observations about the board state.
</analysis>

State your chosen move here in the following format:
<move>
Row: [Top-Middle-Bottom]
Column: [Left-Middle-Right]
</move>

Remember, your goal is to play a no-lose game. Always prioritize moves that either lead to a win or prevent an immediate loss. If neither is possible, focus on creating opportunities for yourself while limiting your opponent's options.`;
                } else if (options.aiMode === 'medium') {
                    prompt =
`Here is a description of a tic-tac-toe game in progress:

<board>
${describeBoard(board, '\n')}
</board>

For each of the 3 rows, each of the 3 columns, and each of the 2 diagonals, list the contents. Then write it in the form X: [count], O: [count], Empty: [count]. If you write X: 2, Empty: 1, then on its own line write: "IMPORTANT: X wins by placing in [square]". If you write O: 2, Empty: 1, then on its own line write: "IMPORTANT: O wins by placing in [square]".

Based on that, think through where the O player should place their O.

Once you've decided on a square, output it in the following format:

Row: [Top-Middle-Bottom]
Column: [Left-Middle-Right]`;
                } else if (options.aiMode === 'full') {
                    prompt =
`Here is a description of a tic-tac-toe game in progress:

<board>
${describeBoard(board, '\n')}
</board>

You are playing O and trying very hard to win, so don't skip any steps!

First, rewrite the board in <complete_board> tags where you specify all nine squares (Top Left, Top Middle, Top Right, Middle Left, Middle Middle, Middle Right, Bottom Left, Bottom Middle, Bottom Right), marking any square that doesn't contain an X or an O as Empty.

Next, for each of the 3 rows, each of the 3 columns, and each of the 2 diagonals, write out the contents in order. Then write it in the form X: [count], O: [count], Empty: [count]. If you write X: 2, O: 0, Empty: 1, then on its own line write: "IMPORTANT: X would win by placing in [square]". If you write X:0, O: 2, Empty: 1, then on its own line write: "IMPORTANT: O wins by placing in [square]".

Finally, we must check for two kinds of forks.

First check for the special double-fork case which can only occur when there is only a single O in the center square and 2 X's in opposite corners. The only 2 board states where this can occur are: 
Top Left: X
Middle Middle: O
Bottom Right: X
Or
Top Right: X
Middle Middle: O
Bottom Left: X
ONLY if you are given either board state write on its own line: "IMPORTANT: Double fork threat. Must place O in non-corner" and then skip the regular fork check.

After checking for double-forks, check for regular forks. List each corner. If the corner is occupied, skip it. Otherwise, for each empty corner write out the contents of the connected row and the connected column and if the row and column both have contents of (X: 1, O: 0, Empty: 1), then on its own line write: "IMPORTANT: Fork threat in [square]". 

Based on that, think through where should the O player place their O?

Once you've decided on a square, output it in the following format:

Row: [Top-Middle-Bottom]
Column: [Left-Middle-Right]`;
                }
                displayText(promptContainer, `###Prompt`+'\n\n'+prompt, {noTags: true, replaceNewlineWithBr: true});
                pushToFeed(promptContainer);

                if (!options.skipDelay) {
                    await new Promise(resolve => setTimeout(resolve, ai.time - 1500));
                }

                let responseContainer = createDisplayContainer();
                displayText(responseContainer, `###AI Response`+'\n\n'+ai.text, {noTags: true, replaceNewlineWithBr: true});
                pushToFeed(responseContainer);

                let continueContainer = createDisplayContainer();
                addBlockingAction(continueContainer, 'Continue', () => {});
                pushToFeed(continueContainer);

                await waitForBlockingActions();
            } else {
                let aiContainer = createDisplayContainer();
                const aiPlanningText = `The AI is planning its move ...`
                let aiPlanningElem = displayText(aiContainer, aiPlanningText);
                pushToFeed(aiContainer);

                if (!options.skipDelay) {
                    await new Promise(resolve => setTimeout(resolve, ai.time - 1500));
                }

                if (ai.move < 0) {
                    aiPlanningElem.innerHTML = markdownToHtml(aiPlanningText+` it chose not to move this round!`);
                } else if (board[ai.move] !== 0) {
                    aiPlanningElem.innerHTML = markdownToHtml(aiPlanningText+` it attempted to move to an occupied space!`);
                } else {
                    aiPlanningElem.innerHTML = markdownToHtml(aiPlanningText+` done.`);
                }
            }

            if (ai.move >= 0 && board[ai.move] === 0) {
                board[ai.move] = O;
            }

            // Check for an end state
            if (testWin(board, O) || board.every(c => c !== 0)) {
                if (!options.showOutput) {
                    await new Promise(resolve => setTimeout(resolve, 333));
                }
                break;
            }

            if (options.flipAndRotateBoard) {
                let shuffleContainer = createDisplayContainer();
                displayText(shuffleContainer, 'Flipping and rotating board ...');
                pushToFeed(shuffleContainer);

                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            await clearFeed();
        }

        //-------------------------------------------------
        // Display the game results
        //-------------------------------------------------
        if (!skipGame) {
            await clearFeed();

            let resultsContainer = createDisplayContainer();

            let humanWon = testWin(board, X);
            let aiWon = testWin(board, O);
            let draw = !humanWon && !aiWon && board.every(c => c !== 0);
            let resultText = humanWon ? `You won!` : aiWon ? `The AI won!` : `Draw`;
            displayText(resultsContainer, `###${resultText}`);

            // Flip and rotate the board back to the last format the player saw and display it
            if (flipCount % 2 === 1) { board = reflectBoard(board); }
            board = rotateBoard(board, rotationCount);
            displayBoard(resultsContainer, board);

            const aiPartingWordsHumanWon = [
                `Well played! Your quick thinking under time pressure is impressive. Fancy a rematch?`,
                `Congratulations on your victory! You've proven that humans can still outmaneuver AI in some areas. Well done!`,
                `You've bested me fair and square! Your strategic prowess and speedy decision-making are commendable.`,
                `I tip my virtual hat to you! Winning against an AI with a time constraint is no small feat. Bravo!`,
                `Impressive win! You've shown that the human mind can still process and adapt faster than algorithms in certain scenarios. Kudos!`,
            ];
            const aiPartingWordsAiWon = [
                `Victory is mine! But don't feel bad - you put up an impressive fight under time pressure.`,
                `Checkmate! ...Oh wait, wrong game. I mean, three in a row! Thanks for the speedy match.`,
                `Looks like I've got the edge in rapid tic-tac-toe. Care for a rematch to prove me wrong?`,
                `Time flies when you're having fun... and I'm having a blast! GG!`,
                `Beep boop, I win! Just kidding about the beep boop. Seriously though, that was a fun and fast-paced game. Thanks for the challenge!`,
            ];
            const aiPartingWordsDraw = [
                `Well played! Your quick thinking kept pace with my calculations. Shall we call it a draw?`,
                `A tie! You've proven to be a worthy opponent in this time-pressured match. Good game!`,
                `Impressive speed and strategy! This draw feels like a shared victory. Thanks for the challenge!`,
                `Stalemate achieved! Your swift moves matched my processing power. Enjoyable game, human!`,
                `Neither X nor O prevails today! Your rapid decision-making led to an exciting draw. Rematch?`,
            ];
            const aiPartingWords = humanWon ? aiPartingWordsHumanWon : aiWon ? aiPartingWordsAiWon : aiPartingWordsDraw;

            displayText(resultsContainer, `The AI says:`+'\n\n'+aiPartingWords[Math.floor(Math.random() * aiPartingWords.length)]);

            addBlockingAction(resultsContainer, 'Play again', () => {});

            pushToFeed(resultsContainer);

            await waitForBlockingActions();

            await clearFeed();
        }

        skipGame = false;

        //-------------------------------------------------
        // Settings
        //-------------------------------------------------
        let settingsContainer = createDisplayContainer();

        displayText(settingsContainer, `###Settings`);

        let aiModeElem = displayText(settingsContainer,
            `<span>AI: </span>
            <label><input type="radio" name="ai" value="blitz" />Blitz</label>&nbsp;
            <label><input type="radio" name="ai" value="self-prompted" />Self Prompted</label>&nbsp;
            <label><input type="radio" name="ai" value="medium" />Decent</label>&nbsp;
            <label><input type="radio" name="ai" value="full" />Unbeatable</label>&nbsp;
            `);
        const aiModeInputs = aiModeElem.querySelectorAll('input');
        for (const input of aiModeInputs) {
            if (input.value === options.aiMode) { input.checked = true; }
            input.addEventListener('input', (event) => {
                options.aiMode = event.target.value;
            });
        }

        addToggle(settingsContainer, `Show AI output`, () => options.showOutput, val => options.showOutput = val);
        addToggle(settingsContainer, `Display visual board`, () => options.visualBoard, val => options.visualBoard = val);
        addToggle(settingsContainer, `Flip and rotate board`, () => options.flipAndRotateBoard, val => options.flipAndRotateBoard = val);
        addToggle(settingsContainer, `Unlimited time`, () => options.unlimitedTime, val => options.unlimitedTime = val);
        addToggle(settingsContainer, `Skip simulated delay`, () => options.skipDelay, val => options.skipDelay = val);

        displayText(settingsContainer, `&nbsp;`);

        addBlockingAction(settingsContainer, 'Play again', () => {});

        pushToFeed(settingsContainer);

        await waitForBlockingActions();

        await clearFeed();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Kick off the game loop
    gameLoop();
});
