var customLabel = {
  restaurant: {
    label: 'R'
  },
  bar: {
    label: 'B'
  }
};

  function initMap() {
  var map = new google.maps.Map(document.getElementById('beacon-map'), {
    center: new google.maps.LatLng(35.227085, -80.843124),
    zoom: 10
  });
  var infoWindow = new google.maps.InfoWindow;

    // Change this depending on the name of your PHP or XML file
    $.get('/api/beacons').then(function(beaconList) {

      for (beacon of beaconList) {
        var id = beacon.id;
        var name = beacon.title;
        var address = beacon.address;
        var type = beacon.category;
        var point = new google.maps.LatLng(
            parseFloat(beacon.latitude),
            parseFloat(beacon.longitude));

        var infowincontent = document.createElement('div');
        var strong = document.createElement('strong');
        strong.textContent = name
        infowincontent.appendChild(strong);
        infowincontent.appendChild(document.createElement('br'));

        var text = document.createElement('text');
        text.textContent = address
        infowincontent.appendChild(text);
        var icon = customLabel[type] || {};
        var marker = new google.maps.Marker({
          map: map,
          position: point,
          label: icon.label
        });
        marker.addListener('click', function() {
          infoWindow.setContent(infowincontent);
          infoWindow.open(map, marker);
        });
      };
    });
  }




  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);


function doNothing() {}
