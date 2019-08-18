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
});
