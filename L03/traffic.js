var FT = FT || {};

(FT.start = function () {

var url = 'http://api.sr.se/api/v2/traffic/messages?format=json&callback=?&indent=true&pagination=false';
var maxMessages = 100;

$.ajax({
	type: "GET",
	url: url,
	jsonpCallback: 'jsonCallback',
	contentType: "application/json",
	dataType: 'jsonp',
	success: function(json) {
		var messages = json.messages;
		var 

	},
	error: function(e) {
		console.log(e.message);
	}
});



	

})();
