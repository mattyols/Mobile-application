	function initialize(){
		this.bindEvents();
	}
	


	function bindEvents(){
			document.addEventListener('deviceready', this.onDeviceReady, false);
	}




	function onDeviceReady(){
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}


	function onSuccess(position){


		var lng = position.coords.longitude;
		var lat = position.coords.latitude;
		var latLong = new google.maps.LatLng(lat, lng);

		var mapOptions = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("tMap"), mapOptions);
	}

	function onError(error){
		alert('code: '		+error.code		+ '\n' + 'message: ' + error.message + '\n');
	}



