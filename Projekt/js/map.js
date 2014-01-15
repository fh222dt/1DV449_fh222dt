var FT = FT || {};

FT.startMap = function () {
	//starta menyn
	FT.userMapChoice();

	//starta en tom karta
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
			          center: new google.maps.LatLng(62.32893, 17.06491),
			          zoom: 5,
			          styles: styles
			        };
 
   	var map = new google.maps.Map(document.getElementById('map-canvas'),
       mapOptions);

   	//dölj starthjälpen efter 5 sek
   	setTimeout(function() {
    	$("#start").addClass("flipOutY");
	}, 5000);
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

FT.getAmount = function(polluter){
	if(polluter.Varde_BehArv != null){
		return polluter.Varde_BehArv +" kg/år";
	}

	else if (polluter.Varde_Vatten != null){
		return polluter.Varde_Vatten +" kg/år";
	}

	else if (polluter.Varde_Luft != null){
		return polluter.Varde_Luft +" kg/år";
	}

	else {
		return " Inget värde uppmätt";
	}

}

FT.getReceiver = function(polluter){
	if(polluter.Metod_BehArv != null){
		return " Reningsverk";
	}

	else if (polluter.Metod_Vatten != null){
		return " Vatten";
	}

	else if (polluter.Metod_Luft != null){
		return " Luft";
	}

	else {
		return " Inget värde angett";
	}
}

FT.getComment = function(polluter){
	if(polluter.Kommentar_BehArv != null){
		return polluter.Kommentar_BehArv;
	}

	else if (polluter.Kommentar_Vatten != null){
		return polluter.Kommentar_Vatten;
	}

	else if (polluter.Kommentar_Luft != null){
		return polluter.Kommentar_Luft;
	}

	else {
		return " Ingen kommentar lämnad";
	}
}

FT.getAllSubstances = function(pollutions){
	for (var i = 0; i < pollutions.length; i++) {
		if(pollutions.MiljorapportId) {
			
		}
	}

	
}

FT.translateSubstances = function(polluter) {
	var swedish = { 17: ['Halogenerade organiska föreningar (AOX)', ''],
		19: ['Arsenik och arsenikföreningar (As)', 'http://sv.wikipedia.org/wiki/Arsenik'], 
		43: ['Bensen', 'http://sv.wikipedia.org/wiki/Bensen'],
		63: ['Biokemisk syreförbrukning', ''],
		91: ['Kadmium (Cd)', 'http://sv.wikipedia.org/wiki/Kadmium'],
		101: ['Klorfluorkarboner (CFC)', 'http://sv.wikipedia.org/wiki/Klorfluorkarboner'],
		109: ['Metan (CH4)', 'http://sv.wikipedia.org/wiki/Metan'],
		114: ['Klor', 'http://sv.wikipedia.org/wiki/Klor'],
		119: ['Klorider (Cl-tot)', 'http://sv.wikipedia.org/wiki/Klorid'],
		125: ['Cyanider (CN-tot)', 'http://sv.wikipedia.org/wiki/Cyanider'],
		128: ['Koldioxid (CO2)', 'http://sv.wikipedia.org/wiki/Koldioxid'],
		129: ['Kemisk syreförbrukning, COD-Cr', ''],
		133: ['Krom (Cr)', 'http://sv.wikipedia.org/wiki/Krom'],
		142: ['Koppar (Cu)', 'http://sv.wikipedia.org/wiki/Koppar'],
		145: ['Dikloretan (DCE)', 'http://sv.wikipedia.org/wiki/1,2-Dikloretan'],
		146: ['Diklormetan (DCM)', 'http://sv.wikipedia.org/wiki/Diklormetan'],
		152: ['Di-(2etylhexyl)-ftalat (DEHP)', 'http://sv.wikipedia.org/wiki/Ftalater'],
		169: ['Dioxin', 'http://sv.wikipedia.org/wiki/Dioxin'],
		197: ['Etylbensen', 'http://sv.wikipedia.org/wiki/Etylbensen'],
		199: ['Fluor', 'http://sv.wikipedia.org/wiki/Fluor'],
		204: ['Fenoler', 'http://sv.wikipedia.org/wiki/Fenoler'],
		233: ['Fluorider (F-tot)', 'http://sv.wikipedia.org/wiki/Fluorider'],
		317: ['Hexaklorbutadien (HCBD)', ''], 
		318: ['Väteklorfluorkolföreningar (HCFC)', 'http://sv.wikipedia.org/wiki/Klorfluorkarboner'],
		322: ['Cyanväte (HCN)', 'http://sv.wikipedia.org/wiki/Cyanv%C3%A4te'],
		328: ['Fluorerade kolväten (HFC)', 'http://sv.wikipedia.org/wiki/HFC'],
		330: ['Kvicksilver (Hg)', 'http://sv.wikipedia.org/wiki/Kvicksilver'],
		364: ['Kloroform (CHCl3)', 'http://sv.wikipedia.org/wiki/Kloroform'],
		371: ['Kolmonoxid (CO)', 'http://sv.wikipedia.org/wiki/Kolmonoxid'],
		478: ['Dikväveoxid (N2O)', 'http://sv.wikipedia.org/wiki/Dikv%C3%A4veoxid'],
		492: ['Ammoniak (NH3)', 'http://sv.wikipedia.org/wiki/Ammoniak'],
		495: ['Ammonium (NH4-N)', 'http://sv.wikipedia.org/wiki/Ammonium'],
		498: ['Nickel (Ni)', 'http://sv.wikipedia.org/wiki/Nickel'],
		502: ['Flyktiga organiska ämnen (NMVOC)', ''], 
		507: ['Alkylfenol och APE', ''], 
		510: ['Kväveoxider (NOx)', 'http://sv.wikipedia.org/wiki/Kv%C3%A4veoxid'],
		514: ['Kväve (N-tot)', 'http://sv.wikipedia.org/wiki/Kv%C3%A4ve'],
		518: ['Oktylfenol-4', ''],
		557: ['Polyaromatiska kolväten (PAH)', 'http://sv.wikipedia.org/wiki/Polyaromatiska_kolv%C3%A4ten'],
		561: ['PAH-Benso(GHI)perylen (PAH-BGP)', 'http://sv.wikipedia.org/wiki/Bensopyren'],
		563: ['PAH-Fluoranten (PAH-FA)', 'http://sv.wikipedia.org/wiki/Polycykliska_aromatiska_kolv%C3%A4ten'],
		569: ['Bly (Pb)', 'http://sv.wikipedia.org/wiki/Bly'],
		573: ['Polyklorerade bifenyler (Pcb)', 'http://sv.wikipedia.org/wiki/Polyklorerade_bifenyler'],
		586: ['Tetrakloretylen (PER)', 'http://sv.wikipedia.org/wiki/Perkloretylen'],
		589: ['Perfluorkolväten (PFC)', ''], 
		615: ['Partiklar (PM10)', 'http://sv.wikipedia.org/wiki/Luftburna_partiklar'],
		617: ['Fosfat som fosfor', 'http://sv.wikipedia.org/wiki/Fosfat'],
		626: ['Fosfor (P-tot)', 'http://sv.wikipedia.org/wiki/Fosfor'],
		707: ['Svavelhexafluorid (SF6)', 'http://sv.wikipedia.org/wiki/Svavelhexafluorid'],
		737: ['Slam', 'http://sv.wikipedia.org/wiki/Slam'],
		746: ['Organiska tennföreningar (Sn-org)', ''],
		747: ['Svaveldioxid (SO2)', 'http://sv.wikipedia.org/wiki/Svaveldioxid'],
		754: ['Svaveloxider (SOx)', ''], 
		773: ['Stoft', ''],
		800: ['Triklorbensener (TCB)', ''],
		806: ['Tetraklormetan (TCM)', 'http://sv.wikipedia.org/wiki/Koltetraklorid'], 
		814: ['Trifenyltenn (TFTO)', ''], 
		826: ['Totalt organiskt kol (TOC)', 'http://sv.wikipedia.org/wiki/TOC'],
		827: ['Toluen', 'http://sv.wikipedia.org/wiki/Toluen'],
		832: ['Trikloreten (TRI)', 'http://sv.wikipedia.org/wiki/Trikloretylen'],
		872: ['Vinylklorid (VCM)', 'http://sv.wikipedia.org/wiki/Vinylklorid'],
		885: ['Xylener', 'http://sv.wikipedia.org/wiki/Xylen'],
		886: ['Zink (Zn)', 'http://sv.wikipedia.org/wiki/Zink'],
		899: ['Alkylfenol och APE', ''],
		900: ['Haloner', 'http://sv.wikipedia.org/wiki/Halon'],
		902: ['Antracen', 'http://sv.wikipedia.org/wiki/Antracen'],
		904: ['Naftalen', 'http://sv.wikipedia.org/wiki/Naftalen'],
		998: ['Koldioxid från biobränslen', 'http://sv.wikipedia.org/wiki/Koldioxid'],
		999: [' Koldioxid från fossila bränslen', 'http://sv.wikipedia.org/wiki/Koldioxid'] };

	var english = polluter.ParameterId;

	if (swedish[english][1] === ""){
		return swedish[english][0];
	}
	else {
		return "<a href='"+swedish[english][1]+"' target='_blank'>"+swedish[english][0]+"</a>";
	}
	
}

FT.CreateMarkers = function (pollutions) {
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
			          center: new google.maps.LatLng(62.32893, 17.06491),
			          zoom: 5,
			          styles: styles
			        };
			 	 
 	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	for (var i = 0; i < pollutions.length; i++) {	 	

	 	var content = '<div id=' + 'infowindow' + '>' +
	 				'<h2>'+pollutions[i].Anlaggningsnamn+'</h2>' +
	 	 			'<p> Adress: '+pollutions[i].Besoksadress+', '+pollutions[i].Anlaggningsort+'</p>' +
	 	 			'<p> Släpper ut: ' + FT.translateSubstances(pollutions[i]) + '</p>' +
	 	 			'<p> Mängd: ' +FT.getAmount(pollutions[i]) + '</p>' +
	 	 			'<p> Släpps ut till: ' +FT.getReceiver(pollutions[i])  + '</p>' +
	 	 			'<p> Kommentar: ' +FT.getComment(pollutions[i])  + '</p>' +
	 	 			'</div>';

		var info = new google.maps.InfoWindow({
	 		content: content
		});

		var pos = new google.maps.LatLng(FT.fixCoordinates(pollutions[i].WGS84Nord),FT.fixCoordinates(pollutions[i].WGS84Ost));			 	 

	 	var marker = new google.maps.Marker({
	 	 	position: pos,
	 	 	map: map,
	 	 	title: pollutions[i].Anlaggningsnamn,
	 	 	html: content,
	 	 	icon: "marker.png"
	 	});
			
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