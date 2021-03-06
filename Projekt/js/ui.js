var FT = FT || {};

FT.getName = function (name){

	var fixed = name.replace(/å/ig, "a");
	var fixed = fixed.replace(/ä/ig, "a");
	var fixed = fixed.replace(/ö/ig, "o");
	var fixed = fixed.replace(/ /ig, "");
	return(fixed);
}

FT.sortProducers = function(json){
	var sorted = [];

	for (var i=0; i<json.length; i++) {
	    var key = json[i].MiljorapportId;
	    if (key in sorted)
	        sorted[key].push(json[i]);
	    else
	        sorted[key] = [json[i]];
	}

	return (sorted);
}

FT.resetSelection = function(clicked){
	if (clicked ==='states') {
		$('#districts option[selected]').prop('selected', true);
		$('#usage option[selected]').prop('selected', true);
	}

	else if (clicked ==='districts') {
		$('#usage option[selected]').prop('selected', true);
	}

	else if (clicked ==='usage'){
		$( ".uniqueDistricts" ).remove();
		$("#removeme").show();
		$('#states option[selected]').prop('selected', true);
		$('#districts option[selected]').prop('selected', true);
	}
	else {
		$( ".uniqueDistricts" ).remove();
		$("#removeme").show();	
		$('#states option[selected]').prop('selected', true);
		$('#districts option[selected]').prop('selected', true);
		$('#usage option[selected]').prop('selected', true);
	}
}


FT.userMapChoice = function (){
	//väljer kommun
	$("#districts").change(function() {
		FT.resetSelection('districts');
		var state = $("#states option:selected" ).text();
		var fixedState = FT.getName(state);
		$.ajax({
			dataType: "json",
			url: "cache/"+fixedState+".json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			
			else {
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
				
				var sorted = FT.sortProducers(districts);
				FT.CreateMarkers(sorted);
			}			
		});
	});

	//väljer län
	$('#states').change(function() {
		FT.resetSelection('states');		
		var state = $("#states option:selected" ).text();
		var fixedState = FT.getName(state);
		$("#removeme").hide();
		$.ajax({
			dataType: "json",
			url: "cache/"+fixedState+".json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else {
				var sorted = FT.sortProducers(json);
				FT.CreateMarkers(sorted);
			}
		});
	});

	//alla luft
	$("#air").click(function() {
		FT.resetSelection('def');
		$.ajax({
			dataType: "json",
			url: "cache/luft.json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else {
				var sorted = FT.sortProducers(json);
				FT.CreateMarkers(sorted);
			}
		});
	});
	//alla vatten
	$("#water").click(function() {
		FT.resetSelection('def');
		$.ajax({
			dataType: "json",
			url: "cache/vatten.json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else {
				var sorted = FT.sortProducers(json);
				FT.CreateMarkers(sorted);
			}
			
		});
	});
	//alla reningsverk
	$("#sewage").click(function() {
		FT.resetSelection('def');
		$.ajax({
			dataType: "json",
			url: "cache/reningsverk.json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else{
				var sorted = FT.sortProducers(json);
				FT.CreateMarkers(sorted);
			}			
		});
	});
	//väljer anv.omr.
	$("#usage").change(function() {
		FT.resetSelection('usage');
		var usage = $("#usage option:selected").val();
		//console.log(usage);
		$.ajax({
			dataType: "json",
			url: "cache/"+usage+".json"
		}).done(function(json){
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else{
				var sorted = FT.sortProducers(json);
				FT.CreateMarkers(sorted);
			}
		});
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
			if(json.length === 0){
				$("#map-canvas").before("<strong class='error'>Just nu har vi inte kontakt med våra "+ 
					"källor för data. Prova gärna något annat alternativ eller återkom senare</strong>");
			}
			else{
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
			} 

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