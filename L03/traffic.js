var FT = FT || {};
var allMarkers = [];
(FT.start = function () {	

	var url = 'http://api.sr.se/api/v2/traffic/messages?format=json&callback=?&indent=true&pagination=false';

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
			
			var messages = json.messages;
			messages.reverse();			//vänder på arrayen så nyast kommer först
			
			var maxMessages = messages.length;

			if (messages.length > 100) {
				maxMessages = 100;
			}			

			//console.log(messages);

			//presentera lista
			for (var i = 0; i < maxMessages; i++) {
				var no = i+1;
				//$("<p>" +no+". "+ messages[i].title + "</p>" + "<small>"+messages[i].description+"</small>").appendTo("#list");
				$("<a href='#' onclick='openWindow("+i+");'>"+no+". "+messages[i].title + "</a></br>").appendTo("#list");
			} 

			//placera ut markers
			CreateMarkers(messages);

			//kategorier
			$("#all-mess").click(function() {
				console.log("alla");
  				CreateMarkers(messages);
			});

			$("#road").click(function() {
				console.log("väg");
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
	var maxMessages = messages.length;

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
	 	 	html: content,
	 	 	icon: priority(messages[i])
	 	});

	 	allMarkers.push(marker);	//array som anv för att kunna öppna medd. från listan
			
		google.maps.event.addListener(marker, 'click', function() {
       		infowindow.setContent(this.html);
       		infowindow.open(map,this);
			});
	}
}

function openWindow(id) {			//öppna infowindow från listan
	google.maps.event.trigger(allMarkers[id], 'click');
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

function priority(marker) {
	var color;
	switch (marker.priority) {
		case 1:
			color = "1.png";
			break;
		case 2:
			color = "2.png";
			break;
		case 3:
			color = "3.png";
			break;
		case 4:
			color = "4.png";
			break;
		case 5:
			color = "5.png";
			break;
		default:
			color = "3.png";
			break;
	} 
	return color;
}