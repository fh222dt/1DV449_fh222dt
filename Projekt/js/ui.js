var FT = FT || {};
(FT.disrtictDropdown = function () {
	//slå ihop alla län o ta bort dubletter av kommunnamn
	$.ajax({
	dataType: "json",
	url: "cache/blekinge.json"
	}).done(function(json){
		//plocka ut alla kommunnamn
		var districts = [];
		$.each(json, function(i, el){
			districts.push(json[i].Kommunnamn);
		});
		//ta bort dubletter
		var uniqueDistricts = [];
		$.each(districts, function(i, el){
			districts.push(json[i].Kommunnamn);
    		if($.inArray(el, uniqueDistricts) === -1) uniqueDistricts.push(el);
		});
		//ange i listan för valbara kommuner
		for (var i = 0; i < uniqueDistricts.length; i++) {				
			$("<option>"+uniqueDistricts[i] + "</option>").appendTo("#districts");
		} 
	});

})();

(FT.stateDropdown = function () {
	var states = ["Blekinge", "Dalarna", "Gotland", "Gävleborg", "Halland", "Jämtland", "Jönköping", "Kalmar", "Kronoberg", "Norrbotten", "Skåne", "Stockholm", "Södermanland", "Uppsala", "Värmland", "Västerbotten", "Västernorrland", "Västmanland", "Västra Götaland", "Örebro", "Östergötland"];
	//ange i listan för valbara län
	for (var i = 0; i < states.length; i++) {				
		$("<option>"+states[i] + "</option>").appendTo("#states");
	} 
})();

(FT.usageDropdown = function () {
	var usage = ["Energiförsörjning","Metallindustri","Mineralindustri","Kemiindustri","Avfall och avlopp","Trä och pappersindustri","Jordbruk","Livsmedelsindustri","Övriga"];
	//ange i listan för anv. omr
	for (var i = 0; i < usage.length; i++) {
		i+1;
		$("<option>"+usage[i] + "</option>").appendTo("#usage");
	} 
})();	