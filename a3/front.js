// set up authorization -- very secure
// YWRtaW46cGFzc3dvcmQ=
const axiosSettings = {
  auth: {
    username: "admin",
    password: "password"
  }
};

async function getChatRooms() {
  try {
    const res = await axios.get("/messageboards", axiosSettings);
    const chatrooms = res.data;

    //console.log(chatrooms);
  } catch (error) {
    console.error(error);
  }
}

async function createNewBoard() {}

async function deleteBoard() {}

async function postMessage() {}

async function main() {
  getChatRooms();
}

main();
