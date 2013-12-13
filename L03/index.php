<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">

    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>

    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtJs5Lz6qV0SnxxE_tEumFq4CaB54g-S0&sensor=true">
    </script>

    <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>


  </head>
  <body>
    <div id="map-canvas"/>
    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>

    <script type="text/javascript">
    	/*$.getJSON( "http://api.sr.se/api/v2/traffic/messages?format=json, callback =success&indent=true&page=1", function( data ) {
		  var items = [];
		  $.each( data, function( key, val ) {
		    items.push( "<li id='" + key + "'>" + val + "</li>" );
		  });
		 
		  $( "<ul/>", {
		    "class": "my-new-list",
		    html: items.join( "" )
		  }).appendTo( "body" );
		});*/

		

/*(function($) {
var url = 'http://api.sr.se/api/v2/traffic/messages?format=json&callback=?&indent=true&pagination=false';

$.ajax({
	type: "GET",
	url: url,
	jsonpCallback: 'jsonCallback',
	contentType: "application/json",
	dataType: 'jsonp',
	success: function(json) {
	console.dir(json.messages);
  console.dir(json.pagination);
	},
	error: function(e) {
	console.log(e.message);
	}
});

})(jQuery);

jsonCallback(
    {
        "messages": [],
        "pagination": {}

    }
);
*/

    </script>
    <script src="traffic.js"></script>

  </body>
</html>
