var app = {
	initialize: function(){
		this.bindEvents();
	},
	


	bindEvents: function(){
			document.addEventListener('deviceready', this.onDeviceReady, false);
	},




	onDeviceReady: function(){
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
	},


	onSuccess: function(position){


		var lng = position.coords.longitude;
		var lat = position.coords.latitude;
		var latLong = new google.maps.LatLng(lat, lng);

		var mapOptions = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("mapPage"), mapOptions);
	},

	onError: function(error){
		alert('code: '		+error.code		+ '\n' + 'message: ' + error.message + '\n');
	},

};

