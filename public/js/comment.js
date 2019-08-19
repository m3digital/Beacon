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
    $.post("/api/comments", {
      body: body
    })
      .then(getComments)
      .catch(function(err) {
        console.log(err);
      });
  }
});

// function getComments() {

// };
