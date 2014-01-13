var FT = FT || {};

FT.getName = function (name){

	var fixed = name.replace(/å/ig, "a");
	var fixed = fixed.replace(/ä/ig, "a");
	var fixed = fixed.replace(/ö/ig, "o");
	return(fixed);
}


FT.userMapChoice = function (){				//obs flera ämen från samma utsläppare?????
	//väljer kommun
	$("#districts").change(function() {
		var state = $("#states option:selected" ).text();
		var fixedState = FT.getName(state);
		$.ajax({
			dataType: "json",
			url: "cache/"+fixedState+".json"
		}).done(function(json){
			var districts = [];
			//töm arrayen till nästa gång
			districts.length = 0;
			
			var district = $("#districts option:selected" ).text();
			var districts = [];
			for (var i = 0; i < json.length; i++) {
				if(json[i].Kommunnamn === district) {
					districts.push(json[i]);
				}
			}
			FT.CreateMarkers(districts);			
		});
	});

	//väljer län
	$("#states").change(function() {
		var state = $("#states option:selected" ).text();
		var fixedState = FT.getName(state);
		$("#removeme").remove();
		$.ajax({
			dataType: "json",
			url: "cache/"+fixedState+".json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});

	//alla luft
	$("#air").click(function() {
		$.ajax({
			dataType: "json",
			url: "cache/luft.json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});
	//alla vatten
	$("#water").click(function() {
		$.ajax({
			dataType: "json",
			url: "cache/vatten.json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});
	//alla reningsverk
	$("#sewage").click(function() {
		$.ajax({
			dataType: "json",
			url: "cache/reningsverk.json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});
	//väljer anv.omr.
	$("#usage").change(function() {
		var usage = $("#usage option:selected").val();
		//console.log(usage);
		$.ajax({
			dataType: "json",
			url: "cache/"+usage+".json"
		}).done(function(json){
			FT.CreateMarkers(json);
		});
	});

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

	//ange i listan för kommunnamn efter länsval		
	$("#states").change(function() {
		var selected = $("#states option:selected" ).text();
		var fixedSelected = FT.getName(selected);
		$.ajax({
		dataType: "json",
		url: "cache/"+fixedSelected+".json"
		}).done(function(json){
			var districts = [];
			var uniqueDistricts = [];

			//töm arrayen för kommunnamn
			uniqueDistricts.length = 0;
			//ta bort tidagre element i dropdownen
			$( ".uniqueDistricts" ).remove();
			//plocka ut alla kommunnamn			
			$.each(json, function(i, el){
				districts.push(json[i].Kommunnamn);
			});
			//ta bort dubletter
			$.each(districts, function(i, el){
				districts.push(json[i].Kommunnamn);
	    		if($.inArray(el, uniqueDistricts) === -1) uniqueDistricts.push(el);
			});
			//ange i listan för valbara kommuner
			for (var i = 0; i < uniqueDistricts.length; i++) {				
				$("<option class='uniqueDistricts'>"+uniqueDistricts[i] + "</option>").appendTo("#districts");
			} 

			console.log(json);
		});
	});
	
	var usage = ["Energiförsörjning","Metallindustri","Mineralindustri","Kemiindustri","Avfall och avlopp",
	"Trä och pappersindustri","Jordbruk","Livsmedelsindustri","Övriga"];
	//ange i listan för anv. omr
	for (var i = 0; i < usage.length; i++) {
		var j = i+1;
		$("<option value="+j+">"+usage[i] + "</option>").appendTo("#usage");
	} 
}

window.onload = FT.dropdowns();