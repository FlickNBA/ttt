const boardDiv = document.querySelector("#board");

const gameBoard = (function () {
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
                console.log(tile.target.attributes["data-tile"].value);
            })
        })
    }

    return {prepareBoard, fillWithTiles, bindTiles}
})();

gameBoard.prepareBoard();
gameBoard.fillWithTiles();
gameBoard.bindTiles();