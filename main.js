const boardDiv = document.querySelector("#board");

let player1, player2;

const player = (char) => {
    return {char}
}

const gameBoard = (function () {
    let turnOf;
    let counter = 1;
    let freeTiles;
    let gameOver = false;

    const endGame = (result) => {
        gameOver = true;
        console.log(result);
    }

    const prepareBoard = () => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        if (windowWidth > windowHeight) {
            boardDiv.style["width"] = `${windowHeight * 0.6667}px`;
            boardDiv.style["height"] = `${windowHeight * 0.6667}px`;
        } else {
            boardDiv.style["width"] = `${windowWidth * 0.6667}px`;
            boardDiv.style["height"] = `${windowWidth * 0.6667}px`;
        }
    }

    const fillWithTiles = () => {
        for (let i = 0; i < 9; i++) {
            let newTile = document.createElement("div");
            newTile.classList.add("tile");
            newTile.setAttribute("data-tile", i + 1);
            boardDiv.appendChild(newTile);
        }
    }

    const bindTiles = () => {
        let boardTiles = document.querySelectorAll(".tile");
        boardTiles.forEach((tile) => {
            tile.addEventListener("click", (tile) => {
                let tileClicked = tile.target.attributes["data-tile"].value;
                fillTile(turnOf, tileClicked);
            })
        })
    }

    const checkFreeTiles = () => {
        let tilesWithValues = []
        let boardTiles = document.querySelectorAll(".tile");
        boardTiles.forEach((tile) => {
            if (tile.textContent) {
                tilesWithValues.push(tile.textContent);
            }
        })
        freeTiles = 9 - tilesWithValues.length;
    }

    const fillTile = (p, tile) => {
        if (p == undefined || gameOver) return;
        let targetTile = document.querySelector(`[data-tile="${tile}"]`);
        // console.log(targetTile.textContent);
        if (!targetTile.textContent) {
            targetTile.textContent = p.char;
            countRounds();
        } else {
            console.log("Choose different tile.");
        }
        checkFreeTiles();
        if (freeTiles == 0) {
            endGame("DRAW");
        }
    }

    const bindSpans = () => {
        let spans = document.querySelectorAll(".choose");
        spans.forEach((span) => {
            span.addEventListener("click", (span) => {
                let p1 = span.target.attributes["data-char"].value;
                let p2 = p1 == "X" ? "O" : "X";
                player1 = player(p1);
                player2 = player(p2);
                let chooseH1 = document.querySelector("#choose");
                chooseH1.remove();
                // let chosenH1 = document.querySelector("#chosen");
                // chosenH1.innerHTML = `Player 1: <span class="white">${p1}</span> ----- Player 2: <span class="white">${p2}</span>`;
                countRounds();
            })
        })
    }

    const countRounds = () => {
        let roundH1 = document.querySelector("#round");
        if (counter % 2 == 1) {
            roundH1.innerHTML = `Round: <span class="white">${counter}</span>, waiting for <span class="white">Player 1 (${player1.char})</span> move...`;
            whoPlaysNow(player1);
        } else {
            roundH1.innerHTML = `Round: <span class="white">${counter}</span>, waiting for <span class="white">Player 2 (${player2.char})</span> move...`;
            whoPlaysNow(player2);
        }
        counter++;
        checkIfSomeoneWon();
    }

    const checkIfSomeoneWon = () => {
        let allTiles = document.querySelectorAll(".tile");
        let tileValues = ["DUMMY"];
        allTiles.forEach((tile) => {
            let tileId = tile.attributes["data-tile"].value;
            let tileValue = tile.textContent;
            // console.log(`${tileId} => ${tileValue}`);
            tileValues.push({ tileId, tileValue });
        })
        // console.log(tileValues);
        // check each row for 3 the same
        // check each column for 3 the same
        // check 1, 5, 9 for 3 the same
        // let _159 = `${tileValues[1].tileValue}${tileValues[5].tileValue}${tileValues[9].tileValue}`
        // console.log(_159);
        // check 3, 5, 7 for 3 the same
        // const TEST = tileValues.map((tile) => {
        //     return tile.tileValue;
        // })
        // console.log(TEST);

        let winningIndexGroups = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ]

        let combinations = []

        for (let winningCombination of winningIndexGroups) {
            let combined = "";
            for (let tile of winningCombination) {
                //tile = tile ID
                let value = tileValues[tile].tileValue;
                combined += value;
                //console.log(value);
                //value = tile value
                //console.log(`Tile ID: ${tile}, value: ${value}`);
            }
            combinations.push(combined);
            // console.log(`${winningCombination.join("")} ${combined}`);
        }
        //console.log(combinations);
        for (let combo of combinations) {
            let firstLetter = combo[0];
            if (combo == `${firstLetter}${firstLetter}${firstLetter}`) {
                endGame(firstLetter);
            }
        }
        
    }

    const whoPlaysNow = (p) => {
        turnOf = p;
    }

    return { prepareBoard, fillWithTiles, bindTiles, bindSpans, countRounds }
})();

gameBoard.prepareBoard();
gameBoard.fillWithTiles();
gameBoard.bindTiles();
gameBoard.bindSpans();