// set up authorization -- very secure
// YWRtaW46cGFzc3dvcmQ=
const axiosAuthentication = {
  auth: {
    username: "admin",
    password: "password"
  }
};

/*
 * getChatRooms()
 * retrieve the whole list of chat rooms, display it in the select box
 * retrieve all messages for the selected chatroom/messageboard
 */
async function getChatRooms() {
  try {
    const res = await axios.get("/messageboards", axiosAuthentication);
    const chatrooms = res.data; // e.g.) {msgboardname: "foo"}

    $("#boardSelect").empty();

    // add all messageboards
    for (var i = 0; i < chatrooms.length; i++) {
      $(boardSelect).append(
        '<option value="">' + chatrooms[i].msgboardname + "</option>"
      );
    }

    $("#boardSelect").selectmenu("refresh");
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
  try {
    var selectedBoard = $("#boardSelect")
      .find(":selected")
      .text();
    const res = await axios.get(
      `/messageboards/${selectedBoard}`,
      axiosAuthentication
    );
    const messageData = res.data;

    $("#posts").empty(); // clear text
    var text = "";
    for (var i = messageData.length - 1; i >= 0; i--) {
      text +=
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
    $("#posts").val(text);
    $("#posts").scrollTop($("#posts")[0].scrollHeight);
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
  var newBoard = $("#newBoardEntry").val();
  $("#newBoardEntry").val(""); // clear text

  if (newBoard == "") return;

  // check if a board name has been used, break to ensure no duplicates
  if ($("#boardSelect option:contains(" + newBoard + ")").length) {
    alert(newBoard + " is already a board.");
    return;
  }

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
  var boardToDelete = $("#boardSelect")
    .find(":selected")
    .text();
  if (boardToDelete == "") return;

  try {
    const del = await axios.delete(
      `/messageboards/${boardToDelete}`,
      axiosAuthentication
    );

    console.log("Deleted " + boardToDelete);
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
  var newPost = $("#newPostEntry").val();
  var selectedBoard = $("#boardSelect")
    .find(":selected")
    .text();
  $("#newPostEntry").val(""); // clear text

  if (newPost == "") return;

  try {
    const req = await axios.post(
      `messageboards/${selectedBoard}`,
      {
        message: newPost
      },
      axiosAuthentication
    );

    getMessages();
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  getChatRooms();
}

$("document").ready(function() {
  $("#boardSelect").on("change", function() {
    getMessages();
  });
});

main();
