$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("#form-signup");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var passwordConfirmInput = $("#confirm-password");
  var firstNameInput = $("#first-name");
  var lastNameInput = $("#last-name");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      passwordConfirm: passwordConfirmInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      return; // Set up appropriate error later
    }

    if (userData.password !== userData.passwordConfirm) {
      return; // Set up appropriate error later
    }
    console.log(userData.displayName);
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.displayName
    );
    emailInput.val("");
    passwordInput.val("");
    passwordConfirmInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, displayName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName
    })
      .then(function(data) {
        window.location.replace("/login");
        console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
