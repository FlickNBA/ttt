let player1, player2;

const player = (char) => {
    return {char}
}

const gameBoard = (function () {
    const boardDiv = document.querySelector("#board");
    const lineDiv = document.querySelector("#line");
    let roundH1 = document.querySelector("#round");
    let turnOf;
    let counter = 1;
    let freeTiles;
    let gameOver = false;
    let boardWidth;

    const endGame = (result, combo) => {
        if (!gameOver) {
            gameOver = true;
            console.log(result);
            let winner = player1.char == result ? "Player 1" : "Player 2";
            roundH1.innerHTML = `<span class="white">${winner} (${result}) won in ${counter - 2} rounds!</span>`;
            if (combo) drawLine(combo);
        }
    }

    const drawLine = (combo) => {
        console.log(combo);
        switch (combo) {
            case "123":
                lineDiv.style["margin-bottom"] = `${(boardWidth * 0.6667) - 48}px`;
                break;
            case "789":
                lineDiv.style["margin-top"] = `${(boardWidth * 0.6667) + 48}px`;
                break;
            case "147":
                lineDiv.style["transform"] = "rotate(90deg)";
                lineDiv.style["margin-right"] = `${boardWidth * 0.6667 + 12}px`;
                lineDiv.style["margin-top"] = "48px";
                break;
            case "258":
                lineDiv.style["transform"] = "rotate(90deg)";
                lineDiv.style["margin-top"] = "48px";
                break;
            case "369":
                lineDiv.style["transform"] = "rotate(90deg)";
                lineDiv.style["margin-left"] = `${(boardWidth * 0.6667) + 12}px`;
                lineDiv.style["margin-top"] = "48px";
                break;
            case "159":
                lineDiv.style["transform"] = "rotate(45deg)";
                lineDiv.style["margin-top"] = "48px";
                lineDiv.style["width"] = `${(boardWidth * Math.sqrt(2)) - 8}px`;
                break;
            case "357":
                lineDiv.style["transform"] = "rotate(135deg)";
                lineDiv.style["margin-top"] = "48px";
                lineDiv.style["width"] = `${(boardWidth * Math.sqrt(2)) - 8}px`;
                break;
        }

        setTimeout(() => {
            lineDiv.style["transition"] = "all 1s";
            lineDiv.classList.remove("opacity-0");
        }, 1);

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
        boardWidth = boardDiv.style["width"].slice(0, -2);
        lineDiv.style["offsetTop"] = boardDiv.offsetTop;
        lineDiv.style["width"] = boardDiv.style["width"];
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
                countRounds();
            })
        })
    }

    const countRounds = () => {
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
            tileValues.push({ tileId, tileValue });
        })

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
            }
            combinations.push({combined, winningCombination});
        }
        for (let combo of combinations) {
            let firstLetter = combo["combined"][0];
            if (combo["combined"] == `${firstLetter}${firstLetter}${firstLetter}`) {
                //console.log(`${combo["combined"]} ${combo["winningCombination"]}`);
                endGame(firstLetter, combo["winningCombination"].join(""));
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