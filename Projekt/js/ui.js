var FT = FT || {};






FT.getState = function (state){

	var fixed = state.replace(/å/ig, "a");
	var fixed = fixed.replace(/ä/ig, "a");
	var fixed = fixed.replace(/ö/ig, "o");
	return(fixed);
}


FT.userMapChoice = function (){
	//väljer kommun

	//väljer län
	$("#states").change(function() {
		var state = $("#states option:selected" ).text();
		var fixedState = FT.getState(state);
		$.ajax({
			dataType: "json",
			url: "cache/"+fixedState+".json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});

	//alla luft

	//alla vatten

	//alla reningsverk

	//väljer anv.omr.

	//inget valt
	$.ajax({
		dataType: "json",
		url: "cache/Hallands.json"
	}).done(function(json){
		FT.CreateMarkers(json);
	});
}

FT.dropdowns = function () {
	var states = ["Blekinge", "Dalarnas", "Gotlands", "Gävleborgs", "Hallands", "Jämtlands", 
	"Jönköpings", "Kalmar", "Kronobergs", "Norrbottens", "Skåne", "Stockholms", "Södermanlands", 
	"Uppsala", "Värmlands", "Västerbottens", "Västernorrlands", "Västmanlands", "Västra Götalands", 
	"Örebro", "Östergötlands"];

	//ange i listan för valbara län
	for (var i = 0; i < states.length; i++) {				
		$("<option>"+states[i] + "</option>").appendTo("#states");
	} 




	//slå ihop alla län o ta bort dubletter av kommunnamn
	// for (var i = 0; i < states.length; i++) {
		
	// 	var fixedState = FT.getState(states[i]);

	// 	$.ajax({
	// 	dataType: "json",
	// 	url: "cache/"+fixedState+".json"
	// 	}).done(function(json){
	// 		//plocka ut alla kommunnamn
	// 		var districts = [];
	// 		$.each(json, function(i, el){
	// 			districts.push(json[i].Kommunnamn);
	// 		});
	// 		//ta bort dubletter
	// 		var uniqueDistricts = [];
	// 		$.each(districts, function(i, el){
	// 			districts.push(json[i].Kommunnamn);
	//     		if($.inArray(el, uniqueDistricts) === -1) uniqueDistricts.push(el);
	// 		});
	// 		//ange i listan för valbara kommuner
	// 		for (var i = 0; i < uniqueDistricts.length; i++) {				
	// 			$("<option>"+uniqueDistricts[i] + "</option>").appendTo("#districts");
	// 		} 

	// 		console.log(json);
	// 	});
	// }
	 

	
	var usage = ["Energiförsörjning","Metallindustri","Mineralindustri","Kemiindustri","Avfall och avlopp",
	"Trä och pappersindustri","Jordbruk","Livsmedelsindustri","Övriga"];
	//ange i listan för anv. omr
	for (var i = 0; i < usage.length; i++) {
		i+1;
		$("<option>"+usage[i] + "</option>").appendTo("#usage");
	} 

}

window.onload = FT.dropdowns;