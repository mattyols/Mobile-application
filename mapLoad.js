
var map;

function initialize() {
  var mapOptions = {
    zoom: 6
    
  };
  map = new google.maps.Map(document.getElementById('theMap'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are here!'
      });


      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

$('.mapIt').click(function () {   
    makeMap();
    var dest = null;
    var category = $(this).closest('div[data-role="page"][id]').attr('id');
    var restName = $(this).parent('div').siblings('h2').text();
    switch (category) {
      case 'taco':
        dest = new google.maps.LatLng(lat + 0.002, lng + 0.002);
        break;
      case 'greek':
        dest = new google.maps.LatLng(lat + 0.001, lng - 0.002);
        break;
      case 'burgers':
        dest = new google.maps.LatLng(lat + 0.003, lng + 0.0015);
        break;
    }
    if (destMarker == null) {
      destMarker = new google.maps.Marker({ position: dest, map: map, icon: 'fork.png', title: restName }); 
    } else {
      destMarker.setPosition(dest);
      destMarker.setTitle(restName);
    }
    $('#map h1').text(restName);
  });

  $('body > *').css({minHeight: window.innerHeight + 'px !important'});
  
  document.addEventListener('deviceready', doDeviceReady, false);
  
  function doDeviceReady () {
    // The following tells the app to fade #page1 in after the splash screen
    $('#page').fadeIn(5000);
  }


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
