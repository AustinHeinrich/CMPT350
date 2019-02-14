function mkBoard() {
    var aBoard;
    aBoard = document.getElementById("newboard").value;

    document.getElementById("newboard").value = "";

    addBoard(aBoard);
}

function addBoard(aBoard) {
    boardData.push(aBoard)
    document.getElementById("boardlist").
}

var boardData = new Array();
