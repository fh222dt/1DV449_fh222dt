var FT = FT || {};

(FT.start = function () {

var url = 'http://api.sr.se/api/v2/traffic/messages?format=json&callback=?&indent=true&pagination=false';
var maxMessages = 100;

	$.ajax({
		type: "GET",
		url: url,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		/*success: function(json) {
			var messages = json.messages;
			messages.reverse();			//vänder på arrayen så nyast kommer först

			 for (var i = 0; i < maxMessages; i++) {
			 	$("<p>" +i + messages[i].title + "</p>").appendTo("body");
			 }


		},*/
		error: function(e) {
			console.log(e.message);
		}
	})
		.done(function(json){
			//console.log(json);

			var messages = json.messages;
			messages.reverse();			//vänder på arrayen så nyast kommer först

			var mapOptions = {
			          center: new google.maps.LatLng(59.32893, 18.06491),
			          zoom: 8
			        };
			 	 
		 	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		 	

			//presentera lista
			 for (var i = 0; i < maxMessages; i++) {
			 	$("<p>" +i +". "+ messages[i].title + "</p>").appendTo("#all-messages");
			 }

			 //placera ut markers

			var infowindow = new google.maps.InfoWindow();
			for (var i = 0; i < maxMessages; i++) {
			 	

			 	var content = '<h1>' + messages[i].title + '</h1>' +
			 	 			'<p> Datum: ' + messages[i].createddate + '</p>' +
			 	 			'<p> Beskrivning: ' + messages[i].description + '</p>' +
			 	 			'<p> Kategori: ' + messages[i].category + '</p>';

				 var info = new google.maps.InfoWindow({
				 	 content: content
				 	});

				var pos = new google.maps.LatLng(messages[i].latitude,messages[i].longitude);			 	 

			 	var marker = new google.maps.Marker({
			 	 	position: pos,
			 	 	map: map,
			 	 	title: messages[i].title,
			 	 	html: content
			 	});

  				//console.log(messages[i].latitude);
  				
				google.maps.event.addListener(marker, 'click', function() {
               		infowindow.setContent(this.html);
               		infowindow.open(map,this);
       			});
			}
		});
	
})();
