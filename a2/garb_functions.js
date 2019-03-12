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

    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messageboards');
    xReq.setRequestHeader('Content-Type', 'application/json');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getBoards();
    }

    xReq.send(JSON.stringify({
        newBoard : aBoard
    }))
}

function getBoards() {
    let xReq = new XMLHttpRequest();
    var boardList = document.getElementById("boardlist");

    xReq.open('GET', '/messageboards');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        
        let res = JSON.parse(this.responseText);

        boardList.options.length = 0;

        for (var i = 0; i < res.length; i++) {
            var opt = res[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            boardList.appendChild(el);
        }
    }

    xReq.send();
}

/*
 * for messages.html
 */
function mkPost() {
    var aPost;          // new post by user
    var selectedBoard;  // board for the post to go to

    selectedBoard = document.getElementById('boardSelect');
    aPost = document.getElementById('newpost').value;
    document.getElementById('newpost').value = "";

    addPost(aPost, selectedBoard);
}

function addPost(aPost, selectedBoard) {
    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messages');
    xReq.setRequestHeader('Content-Type', 'application/json');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getPosts();
    }

    xReq.send(JSON.stringify({
        newPost : aPost
    }))
}

function getPosts() {
    let xRew = new XMLHttpRequest();
    var posts = document.getElementById("posts");  // the large textarea
    
    xReq.open('GET', '/messages');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;

        let res = JSON.parse(this.responseText);

        posts.value = "";

        // use the switch statement
        // copy 'getboards' and place/append as appropriate in postsBoard

    }
}








function addPost() {
 
    let xReq = new XMLHttpRequest();
    xReq.open('POST', '/messages');
    xReq.setRequestHeader('Content-Type', 'application/json');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;
        getMessages();
    }

    xReq.send(JSON.stringify({
        newMessage : aMessage
    }))

}

function getMessages() {
    let xReq = new XMLHttpRequest();
    var newPost = document.getElementById('newpost').value;
    var selectedBoard = document.getElementById('boardSelect');

    xReq.open('GET', '/messages');

    xReq.onreadystatechange = function() {
        if (this.readyState != 4) return;

        let res = JSON.parse(this.responseText);

        if (selectedBoard.value == 'Board 1') {

            if (newPost != "") postsBoard1.push(newPost + ' \n'); 

            document.getElementById('posts').value = "";
            document.getElementById('posts').value = postsBoard1.join("");
        }
        else if (selectedBoard.value == 'Board 2') {

            if (newPost != "") postsBoard2.push(newPost + ' \n');

            document.getElementById('posts').value = "";
            document.getElementById('posts').value = postsBoard2.join("");
        }
        else if (selectedBoard.value == 'Board 3') {

            if (newPost != "") postsBoard3.push(newPost + ' \n');

            document.getElementById('posts').value = "";
            document.getElementById('posts').value = postsBoard3.join("");
        }
        else document.getElementById('posts').value = "error";

    }

    document.getElementById('newpost').value = "";
   
}

var boardData = new Array();
var postsBoard = new Array();
var postsBoard1 = new Array();
var postsBoard2 = new Array();
var postsBoard3 = new Array();

postsBoard = [
    postsBoard1,
    postsBoard2,
    postsBoard3
];