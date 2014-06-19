
var map,
    userPosition,
    footscrayLocation,
    directionsDisplay,
    directionsService;

    google.maps.event.addDomListener(window, 'load', setup);

function setup() {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true});
    }
}

function onSuccess(position) {
    userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    navigator.notification.alert("Found user position");

    initializeMaps();
    //$('#map-canvas').css({'height': $(window).height()/2, 'width': '99%'});
}

function onError(error) {
    navigator.notification.alert("Code: " + error.code + ",\n" +
                                 "Message: " + error.message);
}

function initializeMaps() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

    footscrayLocation = new google.maps.LatLng(37.8007873, -144.8996734);

    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: footscrayLocation
    };
       map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    directionsDisplay.setMap(map);

    if (userPosition != '') {
        var userPosMarker = new google.maps.Marker({
            position: userPosition,
            map: map,
            title: "Din Placering"
        });

        calculateRoute();
    }
    else {
        navigator.notification.alert("userPosition is null");
    }
}

function reloadGoogleMap() {
    if (map === null || map === undefined) {
        navigator.notification.alert("map is %s", map);
    }
    else {
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currCenter);
        map.setZoom(12);
        //navigator.notification.alert("reloaded map");
    }
}







/*

//Button function
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




  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
*/

