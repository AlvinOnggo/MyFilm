document
  .getElementById("toggle-password")
  .addEventListener("click", function () {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

document.querySelector("form").addEventListener("submit", function (event) {
  var username = document.getElementById("name");
  var password = document.getElementById("password");
  var errorName = document.getElementById("error-name");
  var inputName = document.getElementById("name-box");
  var inputPassword = document.getElementById("password-box");
  var errorPassword = document.getElementById("error-password");
  var labelName = document.getElementById("label-name");
  var labelPassword = document.getElementById("label-password");
  

  errorName.textContent = "";
  errorPassword.textContent = "";
  inputName.classList.remove("valid", "invalid");
  inputPassword.classList.remove("valid", "invalid");
  labelName.classList.remove("valid", "invalid");
  labelPassword.classList.remove("valid", "invalid");

  if (username.value == "") {
    errorName.textContent = "Please fill the username field.";
    inputName.classList.add("invalid");
    labelName.classList.add("invalid");
    event.preventDefault();
  } else {
    inputName.classList.add("valid");
    labelName.classList.add("valid");
  }

  if (password.value == "") {
    errorPassword.textContent = "Please fill the password field.";
    inputPassword.classList.add("invalid");
    labelPassword.classList.add("invalid");
    event.preventDefault();
  } else {
    inputPassword.classList.add("valid");
    labelPassword.classList.add("valid");
  }
});

document.querySelectorAll(".input-box input").forEach((input) => {
  input.addEventListener("change", (event) => {
    if (event.target.value) {
      event.target.classList.add("filled");
    } else {
      event.target.classList.remove("filled");
    }
  });
});
