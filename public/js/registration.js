// query selector to select form tag
const form = document.querySelector("form");

// query selectors to select form's input tags
const username = document.getElementById("username");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// query selectors to select error-span-elements of the corresponding input tags
const firstNameErrorMessage = document.querySelector(".firstNameErrorMessage");
const lastNameErrorMessage = document.querySelector(".lastNameErrorMessage");
const emailErrorMessage = document.querySelector(".emailErrorMessage");
const addressErrorMessage = document.querySelector(".addressErrorMessage");
const usernameErrorMessage = document.querySelector(".usernameErrorMessage");
const passwordErrorMessage = document.querySelector(".passwordErrorMessage");
const confirmPasswordErrorMessage = document.querySelector(
  ".confirmPasswordErrorMessage"
);

var isValid = true;

//function that checks if any of the mandatory form fields are left empty.
//also checks if password and confirmPassword entered by the user are same or not.
function validateForm() {
    // Initialize isValid to true
    let isValid = true;
  
    // to check if user entered first name is valid or not
    if (firstName.value === "") {
      firstNameErrorMessage.innerText = " (First name cannot be empty!)";
      isValid = false;
    } else {
      firstNameErrorMessage.innerText = "*";
    }
  
    // to check if user entered last name is valid or not
    if (lastName.value === "") {
      lastNameErrorMessage.innerText = " (Last name cannot be empty!)";
      isValid = false;
    } else {
      lastNameErrorMessage.innerText = "*";
    }
  
    // to check if user entered email is valid or not
    if (!(email.value !== "")) {
      emailErrorMessage.innerText = " (Invalid email id entered!)";
      isValid = false;
    } else {
      emailErrorMessage.innerText = "*";
    }
  
    // to check if user entered valid username or not
    if (username.value === "") {
      usernameErrorMessage.innerText = " (Username cannot be empty!)";
      isValid = false;
    } else {
      usernameErrorMessage.innerText = "*";
    }
  
    // to check if user entered valid password or not
    if (password.value === "" || password.value.length < 6) {
      passwordErrorMessage.innerText =
        " (Password cannot be empty & must be minimum 6 characters!)";
      isValid = false;
    } else {
      passwordErrorMessage.innerText = "*";
    }
  
    // to check if both password and confirmPassword are same or not
    if (password.value !== confirmPassword.value) {
      confirmPasswordErrorMessage.innerText =
        " (Confirm-Password must be same as the password above!)";
      isValid = false;
    } else {
      confirmPasswordErrorMessage.innerText = "*";
    }
  
    // Check isValid before calling submitForm
    if (isValid) {
      submitForm();
    }
  }
  

function submitForm() {
  // Retrieve form values
  const username = document.getElementById("username").value;
  const firstname = document.getElementById("firstName").value;
  const lastname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;

  // Construct user data object
  const userData = {
    UserID: 1,
    UserName: username,
    FirstName: firstname,
    LastName: lastname,
    Email: email,
    Password: password,
    Address: address,
    Role: "Guest",
  };

  // Making a POST request to add a user
  fetch("/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User added successfully:", data);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}

function showLogin() {
  console.log("storedUser " + storedUser);
  if (!storedUser) {
    $("#login").css("display", "flex");
  } else {
    var $loggedIn = $("<h1>You are already logged in.</h1>");
    var $goToProducts = $(
      "<a href='index.html'><h3><u>Go to Home</u></h3></a>"
    );
    $(".register-form-container").append($loggedIn);
    $(".register-form-container").append($goToProducts);
  }
  $("#register").css("display", "none");
}

function hideLogin() {
  $("#login").css("display", "none");
  $("#register").css("display", "block");
}

$(document).ready(function () {
  hideLogin();
  $("#showLogin").click(showLogin);
  checkLogin();
});
