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
    if (!commentData.body) {
      console.log("comment null");
      return;
    }
    bodyInput.val("");
    logComment(commentData.body);
  });

  function logComment(body) {
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
        "<a class='comment-user' href='/profile/" +
        commentList[i].UserId +
        "'>" +
        commentList[i].User.displayName +
        "</a>";
      var commentTime =
        "<div class='comment-time'>" +
        moment(commentList[i].createdAt).fromNow() +
        "</div>";
      var commentDetails =
        "<div class='d-flex justify-content-between'>" +
        commentUser +
        commentTime +
        "</div>";
      var commentEdit =
        "<button class='btn-edit btn btn-sm btn-warning' data-id=" +
        commentList[i].id +
        " data-beacon-id=" +
        commentList[i].BeaconId +
        ">Edit</button>";
      var commentDelete =
        "<button class='btn-comment-delete btn btn-sm btn-danger' data-id=" +
        commentList[i].id +
        " data-beacon-id=" +
        commentList[i].BeaconId +
        ">Delete</button>";
      var commentSubmit =
        "<button class='btn-submit btn btn-sm btn-success' data-id=" +
        commentList[i].id +
        ">Submit</button>";
      var commentButtons =
        "<div class='comment-buttons d-flex justify-content-end'>" +
        commentEdit +
        commentDelete +
        commentSubmit +
        "</div>";
      var newComment =
        "<div class='comment' id=" +
        commentList[i].id +
        ">" +
        commentDetails +
        commentBody;
      var currentUserId = $("#currentUser-id").data("id");
      if (currentUserId === commentList[i].UserId) {
        newComment += commentButtons;
      }
      newComment += "</div>";
      $("#comments").append(newComment);
    }
  });

  function deleteComment() {
    var thisCommentID = $(this).data("id");
    var thisBeaconID = $(this).data("beacon-id");
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + thisCommentID
    })
      .then(function(result) {
        console.log(result);
        getComments(thisBeaconID);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function editComment() {
    console.log("Edit Comment with the following ID: " + $(this).data("id"));
  }

  $("#comments").on("click", ".btn-comment-delete", deleteComment);
  $("#comments").on("click", ".btn-edit", editComment);
}
