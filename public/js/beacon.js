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
      startTime: moment(startTimeInput.val().trim(), "HH:mm").format("hh:mm a"),
      endTime: moment(endTimeInput.val().trim(), "HH:mm").format("hh:mm a"),
      date: moment(dateInput.val().trim()).format("MMMM Do YYYY")
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
    $(".btn-edit").attr("style", "display: none");
    $(".btn-delete").attr("style", "display: none");
    $(".btn-submit").attr("style", "display: inline");
    var currentBeacon = $(".detail-data").text();
    $(".details")
      .children()
      .hide();
    $(".details")
      .children("input.edit")
      .val(currentBeacon);
    $(".details")
      .children("input.edit")
      .show();
    $(".details")
      .children("input.edit")
      .focus();
  }

  function finishEditBeacon() {
    $(".btn-edit").attr("style", "display: inline");
    $(".btn-delete").attr("style", "display: inline");
    $(".btn-submit").attr("style", "display: none");

    // var titleInput = $("#title");
    // var categoryInput = $("#category");
    var descriptionInput = $("#desc-edit").val();
    var inputId = $("#desc-edit").data("id");
    // var addressInput = $("#address");
    // var startTimeInput = $("#start-time");
    // var endTimeInput = $("#end-time");
    // var dateInput = $("#date");
    console.log(descriptionInput);
    $(".details")
      .children()
      .show();
    $(".details")
      .children("input.edit")
      .hide();
    console.log(inputId);
    var newVersion = {
      // title: titleInput.trim(),
      // category: categoryInput.trim(),
      description: descriptionInput,
      // address: addressInput.trim(),
      // startTime: startTimeInput.trim(),
      // endTime: endTimeInput.trim(),
      // date: dateInput.trim()
      id: inputId
    };
    console.log(newVersion);
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

  $(document).on("click", ".btn-delete", deleteBeacon);
  $(document).on("click", ".btn-edit", editBeacon);
  $(document).on("click", ".btn-submit", finishEditBeacon);
});
