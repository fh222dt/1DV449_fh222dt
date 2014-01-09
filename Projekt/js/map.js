var FT = FT || {};


FT.CreateMarkers = function (polutions, pos) {
	console.log(pos);
	var infowindow = new google.maps.InfoWindow();
	var styles = [
		{
			"featureType":"poi",
			"stylers":[
				{
					"visibility":"simplified"
				}
			]
		},
		{
			"featureType":"road",
			"elementType":"labels",
			"stylers":[
				{
					"visibility":"simplified"
				}
			]
		},
		{
			"featureType":"water",
			"stylers":[
				{
					"visibility":"simplified"
				}
			]
		},
		{
			"featureType":"transit",
			"stylers":[
				{
					"visibility":"simplified"
				}
			]
		},
		{
			"featureType":"landscape",
			"stylers":[
				{
					"visibility":"simplified"
				}
			]
		},
		{
			"featureType":"road.highway",
			"stylers":[
				{
					"visibility":"off"
				}
			]
		},
		{
			"featureType":"road.local",
			"stylers":[
				{
					"visibility":"on"
				}
			]
		},
		{
			"featureType":"road.highway",
			"elementType":"geometry",
			"stylers":[
				{
					"visibility":"on"
				}
			]
		},
		{
			"featureType":"water",
			"stylers":[
				{
					"color":"#84afa3"
				},
				{
					"lightness":52
				}
			]
		},
		{
			"stylers":[
				{
					"saturation":-17
				},
				{
					"gamma":0.36
				}
			]
		},
		{
			"featureType":"transit.line",
			"elementType":"geometry",
			"stylers":[
				{
					"color":"#3f518c"
				}
			]
		}];	

	var mapOptions = {
			          center: new google.maps.LatLng(pos[0], pos[1]),
			          zoom: 5,
			          styles: styles
			        };
			 	 
 	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	for (var i = 0; i < polutions.length; i++) {	 	

	 	var content = '<div id=' + 'infowindow' + '>' +
	 				'<h2>'+polutions[i].Anlaggningsnamn+'</h2>' +
	 	 			'<p> Adress: '+polutions[i].Besoksadress+', '+polutions[i].Anlaggningsort+'</p>' +
	 	 			'<p> Släpper ut: ' + polutions[i].ParameterNamn + '</p>' +
	 	 			'<p> Mängd: ' +  + '</p>' +
	 	 			'<p> Släpps ut till: ' +  + '</p>' +
	 	 			'</div>';

		var info = new google.maps.InfoWindow({
	 		content: content
		});

		var pos = new google.maps.LatLng(FT.fixCoordinates(polutions[i].WGS84Nord),FT.fixCoordinates(polutions[i].WGS84Ost));			 	 

	 	var marker = new google.maps.Marker({
	 	 	position: pos,
	 	 	map: map,
	 	 	title: polutions[i].Anlaggningsnamn,
	 	 	html: content
	 	 	//icon: FT.priority(messages[i])
	 	});

	 	//allMarkers.push(marker);	//array som anv för att kunna öppna medd. från listan
			
		google.maps.event.addListener(marker, 'click', function() {
       		infowindow.setContent(this.html);
       		infowindow.open(map,this);
			});
	}
}

(FT.startMap = function () {

	var location = FT.findUser();
	console.log(location);
	FT.CreateMarkers(null, location);
	
	$("#states").change(function() {
		var state = $("#states option:selected" ).text();

		$.ajax({
			dataType: "json",
			url: "cache/"+state+".json"
		}).done(function(json){
			var location = FT.findUser();
			console.log(location);
			//var location = new google.maps.LatLng(59.32893, 18.06491);
			FT.CreateMarkers(json, location);
		});
	});

})();

FT.fixCoordinates = function(coordinate){
	var fixed = coordinate.replace(/,/g, ".");
	return(fixed);
}

FT.openWindow = function(id) {			//öppna infowindow från listan
	google.maps.event.trigger(allMarkers[id], 'click');
}

FT.getCategory = function(no) {
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

FT.formatDate = function(jsonDate) {
	var date = new Date(parseInt(jsonDate.substr(6)));
	
	var year = date.getFullYear();

	var month = date.getMonth();
	month++;
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

FT.priority = function(marker) {
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