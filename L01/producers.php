<?php
require_once("scraper.php");

class Producers {
	
	private $scraper = "";


	public function createProducers(){

		$this->scraper = new Scraper();

		$name = $this->scraper->getProducer();
		$id = $this->scraper->getProducerId();
		$url = $this->scraper->getUrl();
		$city = $this->scraper->getCity();

		//print_r($id);

		//$i = 1;
		$producersArray = array();

		for ($i = 0; $i < count($name); $i++) {		//ändra sen!!!!!!!!!!!!!!!!!

			$producer = new Producers();

			$producer->logo = "BILD";
			$producer->name = $name[$i];
			$producer->id = $id[$i][0];
			$producer->url = "www.fridasblommor.se";
			$producer->city = "Kungsängen";
			$producer->time = "Hämtad 8 ggr, senast 14:58";

			

			array_push($producersArray, $producer);

			
		}

		

	return $producersArray;
	} 
}