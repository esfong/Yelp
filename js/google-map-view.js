(function(window, document, undefined) {
  var GoogleMapView = {};
  
  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
	  var request = new XMLHttpRequest();
	  var geoLocation = encodeURIComponent(entryData.address);
	  request.addEventListener('load', function(event) {
		  if (request.status === STATUS_OK) {
			  var coordinates = JSON.parse(request.responseText);
			  var coordLat = coordinates.results[0].geometry.location.lat;
			  var coordLng = coordinates.results[0].geometry.location.lng;
			  var mapOptions = {
				  center: { lat: coordLat, lng: coordLng},
				  zoom: DEFAULT_ZOOM
			  };
			  var map = new google.maps.Map($map,mapOptions);
			  var marker = new google.maps.Marker({
				  position: { lat: coordLat, lng: coordLng},
				  map: map,
				  title: 'Your Restaurant'
			  });
		  } else {
			  return;
		  }
	  });
      request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + geoLocation);
      request.send();
  };
  
  window.GoogleMapView = GoogleMapView;
})(this, this.document);
