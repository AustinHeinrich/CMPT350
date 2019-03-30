// set up authorization -- very secure
// YWRtaW46cGFzc3dvcmQ=
const axiosAuthentication = {
  auth: {
    username: "admin",
    password: "password"
  }
};

var latestMsg = "";

/*
 * getChatRooms()
 * retrieve the whole list of chat rooms, display it in the select box
 * retrieve all messages for the selected chatroom/messageboard
 */
async function getChatRooms() {
  var boardList = document.getElementById("boardSelect");

  try {
    const res = await axios.get("/messageboards", axiosAuthentication);
    const chatrooms = res.data; // e.g.) {msgboardname: "foo"}

    boardList.options.length = 0;
    for (var i = 0; i < chatrooms.length; i++) {
      var opt = document.createElement("option");
      var el = chatrooms[i].msgboardname;
      opt.value = el;
      opt.innerHTML = el;
      boardList.appendChild(opt);
    }

    getMessages();
  } catch (error) {
    console.error(error);
  }
}

/*
 * getMessages()
 * get all messages for the current messageboard
 */
async function getMessages() {
  var selectedBoard = document.getElementById("boardSelect").value;
  var posts = document.getElementById("posts");

  try {
    const res = await axios.get(
      `/messageboards/${selectedBoard}`,
      axiosAuthentication
    );
    const messageData = res.data;

    //console.log(messageData);

    posts.value = ""; // clear text
    for (var i = messageData.length - 1; i >= 0; i--) {
      posts.value +=
        "[" +
        messageData[i].username +
        ": " +
        messageData[i].id +
        "] " +
        messageData[i].message +
        " @ " +
        messageData[i].timestamp +
        "\n";
    }

    posts.scrollTop = posts.scrollHeight;
  } catch (error) {
    console.error(error);
  }
}

/*
 * createNewBoard()
 * creates a new message board
 * does not allow repeated boards or empty board names
 */
async function createNewBoard() {
  var newBoard = document.getElementById("newBoardEntry").value;
  var boardList = document.getElementById("boardSelect");

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
  if (useCheck != false) return;

  try {
    const req = await axios.post(
      "/messageboards",
      {
        msgboardname: newBoard
      },
      axiosAuthentication
    );
  } catch (error) {
    console.error(error);
  }

  getChatRooms();
}

/*
 * deleteBoard()
 * deletes the board currently selected by the board select
 */
async function deleteBoard() {
  var boardList = document.getElementById("boardSelect");
  var boardToDelete = boardList.value;

  if (!boardToDelete) return;

  try {
    const del = await axios.delete(
      `/messageboards/${boardToDelete}`,
      axiosAuthentication
    );

    getChatRooms();
  } catch (error) {
    console.error(error);
  }
}

/*
 * postMessage()
 * add a new message to the selected messageboard
 */
async function postMessage() {
  var newPost = document.getElementById("newPostEntry").value;
  var selectedBoard = document.getElementById("boardSelect").value;
  document.getElementById("newPostEntry").value = ""; // clear text

  if (newPost == "") return;

  try {
    const req = await axios.post(
      `/messageboards/${selectedBoard}`,
      {
        message: newPost
      },
      axiosAuthentication
    );

    // grab latest message -- quick and stupid way
    latestMsg = "Latest Message: '" + newPost + "' in (" + selectedBoard + ")";
    document.getElementById("latestmsg").innerHTML = latestMsg;
    getMessages();
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  getChatRooms();
}

main();
