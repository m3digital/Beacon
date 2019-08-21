function deleteBeacon() {
  var thisBeaconID = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/beacons/" + thisBeaconID
  })
    .then(function() {
      window.location.replace("/browse");
    })
    .catch(function(err) {
      console.log(err);
    });
}

function editBeacon() {
  var titleInput = $("#title");
  var categoryInput = $("#category");
  var descriptionInput = $("#desc");
  var addressInput = $("#address");
  var startTimeInput = $("#start-time");
  var endTimeInput = $("#end-time");
  var dateInput = $("#date");

  var newVersion = {
    title: titleInput.val().trim(),
    category: categoryInput.val().trim(),
    description: descriptionInput.val().trim(),
    address: addressInput.val().trim(),
    startTime: startTimeInput.val().trim(),
    endTime: endTimeInput.val().trim(),
    date: dateInput.val().trim()
  };
  $.ajax({
    method: "PUT",
    url: "/api/beacons",
    data: newVersion
  }).then(function(data) {
    var id = data.id;
    console.log(data);
    window.location.assign("/beacon/" + id);
  });
}

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
      // window.location.replace("/browse"); // This needs to be beacon with ID
    })
    .catch(function(err) {
      console.log(err);
    });
}

// function getComments(id) {
//   $.get("/api/comments/" + id, {}).then(function(commentList) {
//     $("#comments").empty();
//     for (var i = 0; i < commentList.length; i++) {
//       console.log("-------------------" + commentList[i].BeaconId);
//       var commentBody =
//         "<div class='comment-body'>" + commentList[i].body + "</div>";
//       var commentUser =
//         "<div class='comment-user'>" +
//         commentList[i].User.displayName +
//         "</div>";
//       var commentTime =
//         "<div class='comment-time'>" +
//         moment(commentList[i].createdAt)
//           .startOf("hour")
//           .fromNow() +
//         "</div>";
//       var commentDelete =
//         "<div class='btn-delete btn btn-sm btn-danger' data-id=" +
//         commentList[i].id +
//         " data-beacon-id=" +
//         commentList[i].BeaconId + // this is new, and I haven't updated the comment.js version
//         ">Delete</div>";
//       var commentEdit =
//         "<div class='btn-edit btn btn-sm btn-warning' data-id=" +
//         commentList[i].id +
//         " data-beacon-id=" +
//         commentList[i].BeaconId + // this too
//         ">Edit</div>";
//       var commentButtons =
//         "<div class='comment-buttons'>" +
//         commentDelete +
//         commentEdit +
//         "</div>";
//       var newComment =
//         "<div class='comment'>" +
//         commentUser +
//         commentTime +
//         commentBody +
//         commentButtons +
//         "</div>";
//       $("#comments").append(newComment);
//     }
//   });
// }

function editComment() {
  console.log("Edit Comment with the following ID: " + $(this).data("id"));
}

$(".beacon-buttons").on("click", ".btn-delete", deleteBeacon);
$(".beacon-buttons").on("click", ".btn-edit", editBeacon);
$("#comments").on("click", ".btn-delete", deleteComment);
$("#comments").on("click", ".btn-edit", editComment);
