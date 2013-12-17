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
		error: function(e) {
			console.log(e.message);
			$("<p>Just nu har vi inte kontakt med trafiksystemet. Vänligen" + 
				"återkom vid ett senare tillfälle.</p>").appendTo("#body");
		}
	}).done(function(json){
			//console.log(json);

			var messages = json.messages;
			messages.reverse();			//vänder på arrayen så nyast kommer först			

			console.log(messages);

			//presentera lista
			for (var i = 0; i < maxMessages; i++) {
				$("<p>" +i +". "+ messages[i].title + "</p>").appendTo("#list");
			}

			//placera ut markers
			CreateMarkers(messages);

			//kategorier
			$("#all-mess").click(function() {
  				CreateMarkers(messages);
			});

			$("#road").click(function() {
				var road = [];
				for (var i = 0; i < maxMessages; i++) {
					if(messages[i].category === 0) {
						road.push(messages[i]);
					}
				}
  				CreateMarkers(road);
  				console.log(road);
			});

			$("#public").click(function() {
				var pTrans = [];
				for (var i = 0; i < maxMessages; i++) {
					if(messages[i].category === 1) {
						pTrans.push(messages[i]);
					}
				}
  				CreateMarkers(pTrans);
			});

			$("#planed").click(function() {
				var planed = [];
				for (var i = 0; i < maxMessages; i++) {
					if(messages[i].category === 2) {
						planed.push(messages[i]);
					}
				}
  				CreateMarkers(planed);
			});

			$("#other").click(function() {
				var other = [];
				for (var i = 0; i < maxMessages; i++) {
					if(messages[i].category === 3) {
						other.push(messages[i]);
					}
				}
  				CreateMarkers(other);
			});			
		});
	
})();

function CreateMarkers(messages){
	var infowindow = new google.maps.InfoWindow();
	var maxMessages = 100;

	var mapOptions = {
			          center: new google.maps.LatLng(59.32893, 18.06491),
			          zoom: 5
			        };
			 	 
 	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	for (var i = 0; i < maxMessages; i++) {
	 	

	 	var content = '<div id=' + 'infowindow' + '>' +
	 				'<h1>' + messages[i].title + '</h1>' +
	 	 			'<p> Datum: ' + getDate(messages[i].createddate) + '</p>' +
	 	 			'<p> Beskrivning: ' + messages[i].description + '</p>' +
	 	 			'<p> Kategori: ' + getCategory(messages[i].category) + '</p>' +
	 	 			'</div>';

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
			
		google.maps.event.addListener(marker, 'click', function() {
       		infowindow.setContent(this.html);
       		infowindow.open(map,this);
			});
	}
}

function getCategory(no) {
	var category;
	switch (no) {
		case 0:
			category = "Vägtarfik";
			break;
		case 1:
			category = "Kollektivtrafik";
			break;
		case 2:
			category = "Planerad störning";
			break;
		case 3:
			category = "Övrigt";
			break;
	} 
	return category;
}

function getDate(jsonDate) {
	var date = new Date(parseInt(jsonDate.substr(6)));
	
	var year = date.getFullYear();
	var month = date.getMonth();
	if (month < 10) {
		month = "0"+month;
	}
	var day = date.getDate();
	if (day < 10) {
		day = "0"+day;
	}
	var hour = date.getHours();
	if (hour < 10) {
		hour = "0"+hour;
	}
	var mins = date.getMinutes();
	if (mins < 10) {
		mins = "0"+mins;
	}

	date = year+'-'+month+'-'+day+', '+hour+':'+mins;

	return date;
}