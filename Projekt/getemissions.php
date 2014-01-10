<?php
require_once('Caching.php');
class getEmissions {	

	function getStates(){
		$states = [1=>"Blekinge", 2=>"Dalarnas", 3=>"Gotlands", 4=>"Gävleborgs", 5=>"Hallands", 6=>"Jämtlands", 7=>"Jönköpings", 
					8=>"Kalmar", 9=>"Kronobergs", 10=>"Norrbottens", 11=>"Skåne", 12=>"Stockholms", 13=>"Södermanlands", 14=>"Uppsala", 
					15=>"Värmlands", 16=>"Västerbottens", 17=>"Västernorrlands", 18=>"Västmanlands", 19=>"Västra Götalands", 20=>"Örebro", 
					21=>"Östergötlands"];
		//hämta länsvis			
		foreach ($states as $state){
			$filename = $this->fileName($state);
			$caching = new Caching("cache/".$filename.".json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Lannamn%20eq%20'".$state."%20l%C3%A4n'%20and%20Rapporteringsar%20eq%202011");
		
		}

	}

	function getCategories(){
		//hämta kategorivis
		$caching = new Caching("cache/luft.json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Metod_Luft%20ne%20'NULL'%20and%20Rapporteringsar%20eq%202011");
		$caching = new Caching("cache/vatten.json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Metod_Vatten%20ne%20'NULL'%20and%20Rapporteringsar%20eq%202011");
		$caching = new Caching("cache/reningsverk.json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Metod_BehArv%20ne%20'NULL'%20and%20Rapporteringsar%20eq%202011");

		for ($i=1; $i<10 ; $i++) { 
			$caching = new Caching("cache/".$i.".json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=PrtrHuvudKod%20eq%20'".$i.".'%20and%20Rapporteringsar%20eq%202011");
		}
	}

	function fileName($state){
		$search = array('å','ä','ö','Å','Ä', 'Ö');
		$replace = array('a','a','o', 'a', 'a', 'o');
		$state = str_replace($search, $replace, $state);
		return $state;
	}
}