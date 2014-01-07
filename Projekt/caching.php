<?php
class Caching {
	public $filepath = "";
	public $apiURI = "";

	function __construct($filepath, $apiURI) {
		//kolla av parametrarna så de inte är tomma
		if (strlen($filepath) > 0 && strlen($apiURI) > 0) {
			$this->filepath = $filepath;
			$this->apiURI = $apiURI;

			//cachen behöver uppdateras
			if($this->needsRenewal()) {

				$json = $this->getCurl($apiURI);

				$this->saveArray($json);
			}

			//cachen behöver inte uppdateras
			else {
				return true;
			}
		}

		else {
			echo "Urls saknas för att kunna cacha!";
			return false;
		}
	}

	function needsRenewal() {
		//tidsintervall som cachningen ska ske på
		$cachetime = (60); //(60*60*24*30); //30 dagar 				Gör till medl var.

		$lastSave = filemtime($this->filepath) + $cachetime;

		//om uppdatering behövs returnera true
		if($lastSave < time()) {
			return true;
		}
		else {
			return false;
		}
	}

	function getCurl($url) {
		//curl för att hämta data från api
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_URL, $url);

		$results = curl_exec($ch); // Executing cURL session
		
		curl_close($ch); // Closing cURL session
		
		return $results; // Return the results
	}

	function saveArray($json) {
		//ta bort info som ej behövs

		//spara json t en fil 				ändra t databas??
		file_put_contents($this->filepath, $json);
	}
}