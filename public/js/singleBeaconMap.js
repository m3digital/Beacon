function initMap(id) {
  $.get("/api/beacons/" + id, { category: "client", type: "premium" }).then(
    function(beacon) {
      console.log(beacon);
      var beacon = { lat: lat, lng: lng };
      // The map, centered at BEACON
      var map = new google.maps.Map(document.getElementById("beacon-map"), {
        zoom: 4,
        center: beacon
      });
      // The marker, positioned at beacon
      var marker = new google.maps.Marker({ position: beacon, map: map });
    }
  );
}
