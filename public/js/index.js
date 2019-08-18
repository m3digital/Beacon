// $(function() {
//   $("#btn-signup").on("click", function() {
//     var newUser = {
//       firstName: $("#first-name")
//         .val()
//         .trim(),
//       lastName: $("#last-name")
//         .val()
//         .trim(),
//       email: $("#email")
//         .val()
//         .trim(),
//       password: $("#password")
//         .val()
//         .trim(),
//       confirmPassword: $("#confirm-password")
//         .val()
//         .trim()
//     };
//     if (password !== confirmPassword) {
//       return error;
//     } // clarify this later as redirect to error page
//     $.ajax("/api/users", {
//       type: "POST",
//       data: newUser
//     }).then(function() {
//       // get browse route here?
//     });
//   });

//   $("#btn-login").on("click", function() {
//     var login = {
//       email: $("#email")
//         .val()
//         .trim(),
//       password: $("#password")
//         .val()
//         .trim()
//     };
//     console.log(login);
//   });
// });
