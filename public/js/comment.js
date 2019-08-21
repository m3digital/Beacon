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
    bodyInput.val("");
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
    $("#comments").empty();
    for (var i = 0; i < commentList.length; i++) {
      var commentBody =
        "<div class='comment-body'>" + commentList[i].body + "</div>";
      var commentUser =
        "<div class='comment-user'>" +
        commentList[i].User.displayName +
        "</div>";
      var commentTime =
        "<div class='comment-time'>" +
        moment(commentList[i].createdAt)
          .startOf("hour")
          .fromNow() +
        "</div>";
      var commentDelete =
        "<div class='btn-delete btn btn-sm btn-danger' data-id=" +
        commentList[i].id +
        ">Delete</div>";
      var commentEdit =
        "<div class='btn-edit btn btn-sm btn-warning' data-id=" +
        commentList[i].id +
        ">Edit</div>";
      var commentButtons =
        "<div class='comment-buttons'>" +
        commentDelete +
        commentEdit +
        "</div>";
      var newComment =
        "<div class='comment'>" +
        commentUser +
        commentTime +
        commentBody +
        commentButtons +
        "</div>";
      $("#comments").append(newComment);
    }
  });
}
