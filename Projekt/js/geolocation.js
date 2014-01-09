var FT = FT || {};
/*(FT.initMap = function () {
	var location = FT.findUser();
	//om anv finns i Sverige

	//annars

	//starta kartan
	FT.CreateMarkers(null, location);

})();*/

FT.findUser = function() {	

	function success(position){
		var latlng = [position.coords.latitude, position.coords.longitude];
		console.log(latlng);
		return latlng;
	};

	function error(){
		//hämta via ip

		//om inget funkar
		var latlng = [59.32893, 28.06491];
		console.log(latlng);
		return latlng;

	};

	navigator.geolocation.getCurrentPosition(success, error);
}