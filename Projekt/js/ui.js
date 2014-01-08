var FT = FT || {};
(FT.disrtictDropdown = function () {
	//slå ihop alla län o ta bort dubletter av kommunnamn
	$.ajax({
	dataType: "json",
	url: "cache/blekinge.json"
	}).done(function(json){

		for (var i = 0; i < json.length; i++) {				
			$("<option>"+json[i].Kommunnamn + "</option>").appendTo("#districts");
		} 
	});

})();