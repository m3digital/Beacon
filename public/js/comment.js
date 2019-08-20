$(document).ready(function() {
  var link = window.location.href.split("/");
  BeaconId = link[link.length - 1];
  getComments(BeaconId);
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
    console.log(BeaconId);
    $.post("/api/comments", {
      BeaconId: BeaconId,
      body: body
    })
      .then(function() {
        getComments(BeaconId);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
function getComments(id) {
  $.get("/api/comments/" + id, {}).then(function(commentList) {
    $("#comment-container").empty();
    for (var i = 0; i < commentList.length; i++) {
      var commentBody = "<div class=''>" + commentList[i].body + "</div>";
      var commentUser =
        "<div class=''>" + commentList[i].User.displayName + "</div>";
      var commentTime =
        "<div class=''>" +
        moment(commentList[i].createdAt)
          .startOf("hour")
          .fromNow() +
        "</div>";
      var newComment =
        "<div>" + commentUser + commentTime + commentBody + "</div>";
      $("#comment-container").append(newComment);
    }
  });
}
