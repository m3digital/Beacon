$(document).ready(function() {
  var commentForm = $("#form-comment");
  var bodyInput = $("#body");

  commentForm.on("submit", function(event) {
    event.preventDefault();
    var commentData = {
      body: bodyInput.val().trim()
    };

    logComment(commentData.body);
  });

  function logComment(body) {
    var link = window.location.href.split("/");
    BeaconId = link[link.length - 1];
    console.log(BeaconId);
    $.post("/api/comments", {
      BeaconId: BeaconId,
      body: body
    })
      .then(getComments)
      .catch(function(err) {
        console.log(err);
      });
  }
});
//   .then(function() {
//         // window.location.replace("/browse");
//         // If there's an error, log the error
//       })
function getComments() {
  console.log("hi");
}
