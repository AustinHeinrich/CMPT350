function mkBoard() {
    var aBoard;
    aBoard = document.getElementById("newboard").value;
    document.getElementById("newboard").value = "";  // clear text

    var boardList = document.getElementById("boardlist");
    var useCheck = false; // True if aBoard has been used previously
    for (var i = 0; i < boardList.length; i++) {
        if (boardList.options[i].value == aBoard) {
            alert("That is already a board.");
            useCheck = true;
            break;
        }
    }

    if (useCheck == false) addBoard(aBoard);
}

function addBoard(aBoard) {

    var boardList = document.getElementById("boardlist");
    boardList.options.length = 0;

    boardData.push(aBoard);
    boardData.sort();

    for (var i = 0; i < boardData.length; i++) {
        var opt = boardData[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        boardList.appendChild(el);
    }
}

function addPost() {
    let newPost = document.getElementById('newpost').value;
    postsBoard1.push(newPost + ' \n');

    document.getElementById('posts').value = "";
    document.getElementById('posts').value = postsBoard1;

    document.getElementById('newpost').value = "";
}

var boardData = new Array();
var postsBoard1 = new Array();
var postsBoard2 = new Array();
var postsBoard3 = new Array();
