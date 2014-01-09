<?php
require_once('Caching.php');
class getEmissions {
	function doCache(){
		$states = [1=>"Blekinge", 2=>"Dalarnas", 3=>"Gotlands", 4=>"Gävleborgs", 5=>"Hallands", 6=>"Jämtlands", 7=>"Jönköpings", 
					8=>"Kalmar", 9=>"Kronobergs", 10=>"Norrbottens", 11=>"Skåne", 12=>"Stockholms", 13=>"Södermanlands", 14=>"Uppsala", 
					15=>"Värmlands", 16=>"Västerbottens", 17=>"Västernorrlands", 18=>"Västmanlands", 19=>"Västra Götalands", 20=>"Örebro", 
					21=>"Östergötlands"];

		foreach ($states as $state){
			$caching = new Caching("cache/".$state.".json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Lannamn%20eq%20'".$state."%20l%C3%A4n'%20and%20Rapporteringsar%20eq%202011");
		}
	}
}