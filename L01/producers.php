<?php
require_once("scraper.php");

class Producers {
	
	private $scraper = "";


	public function createProducers(){

		$this->scraper = new Scraper();

		$name = file_get_contents("data/name.txt");
		$name = unserialize($name);

		$id = file_get_contents("data/id.txt");
		$id = unserialize($id);

		$url = file_get_contents("data/url.txt");
		$url = unserialize($url);

		$city = file_get_contents("data/city.txt");
		$city = unserialize($city);

		$producersArray = array();

		for ($i = 0; $i < count($name); $i++) {

			$producer = new Producers();
				
			$producer->name = $name[$i];
			$producer->id = $id[$i][0];
			$producer->url = $url[$i];
			$producer->city = $city[$i];
			$producer->time = "8 ggr, senast 14:58";
			$producer->logo = $this->getLogo($producer->id);			

			array_push($producersArray, $producer);			
		}	

		return $producersArray;

	} 

	private function getLogo($id) {				//id måste innehålla filändelsen oxå!!!!!!
		$file = glob ("data/img/$id.*");

		if(empty($file)) {
			$logo = "saknas";			
		}

		else {
			//$file = file_get_contents("data/img/$id");
			//$logo = unserialize($logo);
			$logo = "<img width='100' src='$file[0]'>";	//////////////filändelsen
		}

		return $logo;
	}
}