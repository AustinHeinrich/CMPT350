/*
 * Austin Heinrich
 * awh055
 * 11177796
 */

/*
 * addNewBoard()
 * initializes required elements for making a new messageboard
 */
function addNewBoard() {
  var newBoard = document.getElementById("newBoardEntry").value;
  var boardList = document.getElementById("boardList");

  document.getElementById("newBoardEntry").value = ""; // clear text

  if (newBoard == "") return;

  // useCheck - true if newBoard has been used previously
  // check if a board name has been used, break to ensure no duplicates
  var useCheck = false;
  for (var i = 0; i < boardList.length; i++) {
    if (boardList.options[i].value == newBoard) {
      alert("That is already a board.");
      useCheck = true;
      break;
    }
  }

  if (useCheck == false) handleBoards(newBoard);
  else return;
}

/*
 * handleBoards(newBoard)
 * aBoard - a board being added to the list of available messageboards
 * handles content of messageboard titles, adding a new messageboard
 */
function handleBoards(aBoard) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/messageboards");
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {
    if (this.readyState != 4) return;
    getBoards();
  };

  boards = {
    board: aBoard
  };
  xhttp.send(JSON.stringify(boards));
}

/*
 * getBoards()
 * reads a JSON, getting the names of the messageboards
 */
function getBoards() {
  var xhttp = new XMLHttpRequest();
  var boardList = document.getElementById("boardList");
  var boardSelect = document.getElementById("boardSelect");
  xhttp.open("GET", "/messageboards");

  xhttp.onreadystatechange = function() {
    if (this.readyState != 4) return;

    // get items from JSON, sort & place them into the board select list
    //  and also place them in the upper text area (list of message boards)
    var res = JSON.parse(this.responseText);
    res.sort();
    boardSelect.options.length = 0;
    boardList.value = "";
    for (var i = 0; i < res.length; i++) {
      var opt = document.createElement("option");
      var el = res[i];
      opt.value = el;
      opt.innerHTML = el;
      boardSelect.appendChild(opt);

      boardList.value += boardSelect.options[i].value + "\n";
    }
  };

  xhttp.send();
}

/*
 * handleMessages()
 * initializes required elements for posting a new message to a specified messageboard
 * handles adding a new message, content of the messages
 */
function handleMessages() {
  var messageBoards = document.getElementById("boardSelect");
  var selectedBoard = messageBoards.value;
  var newMessage = document.getElementById("newPostEntry").value;

  if (!selectedBoard) return;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/messages/${selectedBoard}`);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function() {
    if (this.readyState != 4) return;
    getMessages();
  };

  xhttp.send(
    JSON.stringify({
      message: newMessage
    })
  );
}

/*
 * getMessages()
 * pull all messages for a selected board
 */
function getMessages() {
  var xhttp = new XMLHttpRequest();
  var posts = document.getElementById("posts");
  var selectedBoard = document.getElementById("boardSelect").value;
  if (!selectedBoard) return;

  xhttp.open("GET", `/messages/${selectedBoard}`);

  xhttp.onreadystatechange = function() {
    if (this.readyState != 4) return;

    var res = JSON.parse(this.responseText);
    posts.value = "";

    res.forEach(e => {
      posts.value += e + "\n";
    });
  };

  xhttp.send();
}
