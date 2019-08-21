$(document).ready(function() {
  var beaconForm = $("#form-beacon");
  var titleInput = $("#title");
  var categoryInput = $("#category");
  var descriptionInput = $("#desc");
  var addressInput = $("#address");
  var startTimeInput = $("#start-time");
  var endTimeInput = $("#end-time");
  var dateInput = $("#date");

  beaconForm.on("submit", function(event) {
    event.preventDefault();
    var beaconData = {
      title: titleInput.val().trim(),
      category: categoryInput.val().trim(),
      description: descriptionInput.val().trim(),
      address: addressInput.val().trim(),
      startTime: startTimeInput.val().trim(),
      endTime: endTimeInput.val().trim(),
      date: dateInput.val().trim()
    };
    newBeacon(beaconData);
  });

  function newBeacon(object) {
    $.post("/api/beacons", object).then(function(data) {
      var id = data.id;
      console.log(data);
      window.location.assign("/beacon/" + id);
    });
  }

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
    var currentBeacon = $(this).text();
    $(this).children().hide();
    $(this).children("input.edit").val(currentBeacon);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  function finishEditBeacon() {
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

  $(".beacon-buttons").on("click", ".btn-delete", deleteBeacon);
  $(".beacon-buttons").on("click", ".btn-edit", editBeacon);
  $(".beacon-buttons").on("click", ".btn-submit", finishEditBeacon);
});
