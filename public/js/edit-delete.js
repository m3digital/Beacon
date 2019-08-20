function deleteBeacon() {
  var thisBeaconID = $(this).data("id");
  console.log("Delete Beacon with the following ID: " + thisBeaconID);
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
  console.log("Edit Beacon with the following ID: " + $(this).data("id"));
}

function deleteComment() {
  console.log("Delete Comment with the following ID: " + $(this).data("id"));
}

function editComment() {
  console.log("Edit Comment with the following ID: " + $(this).data("id"));
}

$(".beacon-buttons").on("click", ".btn-delete", deleteBeacon);
$(".beacon-buttons").on("click", ".btn-edit", editBeacon);
$("#comments").on("click", ".btn-delete", deleteComment);
$("#comments").on("click", ".btn-edit", editComment);
