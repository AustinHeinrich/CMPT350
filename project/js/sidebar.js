const sidebar = document.getElementById("sidebar");
var isUser = false;

function createLogin() {
  var loginText = document.createElement("h2");
  var message_user = document.createElement("p");
  var usernameField = document.createElement("input"),
    passwordField = document.createElement("input");
  var submitButton = document.createElement("button");
  var registerSuggest = document.createElement("p");

  loginText.innerHTML = "User Login";
  loginText.id = "login-text"
  sidebar.appendChild(loginText);

  message_user.innerHTML = "";
  message_user.id = "msg-user";
  sidebar.append(message_user);

  usernameField.type = "text";
  usernameField.placeholder = "Enter email";
  usernameField.id = "uname";
  usernameField.required = true;
  sidebar.appendChild(usernameField);

  passwordField.type = "password";
  passwordField.placeholder = "Enter password";
  passwordField.id = "pwd";
  passwordField.required = true;
  sidebar.appendChild(passwordField);

  submitButton.type = "submit";
  submitButton.id = "submit-user";
  submitButton.innerHTML = "Login";
  sidebar.appendChild(submitButton);

  registerSuggest.innerHTML = `New user? <a href="register-page">Register.</a>`;
  registerSuggest.id = "register-suggest";
  sidebar.appendChild(registerSuggest);

  // check username/password entry, proceed if valid
  let submit = document.getElementById("submit-user");
  submit.addEventListener("click", function (event) {
    let givenUser = document.getElementById("uname").value;
    let givenPass = document.getElementById("pwd").value;

    isUser = false;
    validate(givenUser, givenPass);
  });
}

async function validate(givenUser, givenPass) {
  try {
    const req = await axios.post(
      "/api/users/login", {
        "user": {
          "email": `${givenUser}`,
          "password": `${givenPass}`
        }
      });

    if (req.data.user.email == givenUser) {
      document.getElementById("msg-user").innerHTML = ""
      while (sidebar.firstChild) { // clear the sidebar
        sidebar.removeChild(sidebar.firstChild);
      }

      mainbar(req.data.user.email, req.data.user.token);
    }
  } catch (err) {
    document.getElementById("msg-user").innerHTML = "Username or password invalid."
  }
}

function mainbar(user, token) {

  var userDisplay = document.createElement("p");
  userDisplay.innerHTML = user;
  userDisplay.id = "user-display-name";
  sidebar.appendChild(userDisplay);
}


createLogin();