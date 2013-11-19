<?php
require_once("scraper.php");

class Producers {
	
	private $scraper = "";


	public function createProducers(){

		$this->scraper = new Scraper();

		//$logo = $this->scraper->getLogo();
		//$name = $this->scraper->getProducer();
		$name = file_get_contents("data/name.txt");
		$name = unserialize($name);

		//$id = $this->scraper->getProducerId();
		$id = file_get_contents("data/id.txt");
		$id = unserialize($id);

		//$url = $this->scraper->getUrl();
		$url = file_get_contents("data/url.txt");
		$url = unserialize($url);

		//$city = $this->scraper->getCity();
		$city = file_get_contents("data/city.txt");
		$city = unserialize($city);

		//print_r($logo);

		//$i = 1;
		$producersArray = array();

		for ($i = 0; $i < count($name); $i++) {		//ändra sen!!!!!!!!!!!!!!!!!

			$producer = new Producers();

			$producer->logo = "<img width='100px' src='data/img/vinager.jpg'> ";	//ändra sen!!!!!!!!!!!!!!!!!
			$producer->name = $name[$i];
			$producer->id = $id[$i][0];
			$producer->url = $url[$i];
			$producer->city = $city[$i];
			$producer->time = "Hämtad 8 ggr, senast 14:58";

			

			array_push($producersArray, $producer);

			
		}

		

	return $producersArray;
	} 
}