var FT = FT || {};

FT.startMap = function () {

	//var location = FT.findUser();
	//console.log(location);
	//FT.CreateMarkers(null, location);

	FT.userMapChoice();

}

FT.findUser = function() {

	function success(position){
		/*var latlng = [position.coords.latitude, position.coords.longitude];
		console.log(latlng+"success");
		return latlng;*/
		new google.maps.LatLng(position.coords.latitude, position.coords.longitud);
	};

	function error(){
		//hämta via ip

		//om inget funkar
		var latlng = [59.32893, 28.06491];
		console.log(latlng+"error");
		return latlng;

	};

	navigator.geolocation.getCurrentPosition(success, error);
}


FT.CreateMarkers = function (polutions) {
	//var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
			          //center: new google.maps.LatLng(pos[0], pos[1]),
			          center: new google.maps.LatLng(59.32893, 28.06491),
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

FT.fixCoordinates = function(coordinate){
	var fixed = coordinate.replace(/,/g, ".");
	return(fixed);
}

window.onload = FT.startMap();