<?php
class Scraper {

	private $scraped;	

	public function doSracpe() {
		$this->scraped = $this->curlGet("http://vhost3.lnu.se:20080/~1dv449/scrape/check.php");

		var_dump($this->getProducer());

		var_dump($this->scraped);

	}


	private function curlGet($url) {
		$useragent = "MyScraper v0.1";		//så att webmastern kan blocka skrapor enkelt

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);	// Setting URL to POST to
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);	// Returning transfer as a string
		curl_setopt($ch, CURLOPT_COOKIESESSION, TRUE);	// Use cookies
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);	// Follow Location: headers
		curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__) . "cookie.txt");	// Setting cookiefile
		curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__) . "cookie.txt");	// Setting cookiejar
		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);	// Setting useragent
		curl_setopt($ch, CURLOPT_URL, $url);	// Setting URL to POST to
		curl_setopt($ch, CURLOPT_POST, 1);		// Setting method as POST

		$post_array = array(
			"username" => "admin",
			"password" => "admin"
		);

		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);		

		//felsökningshjälp
		//curl_setopt($ch, CURLOPT_HEADER, 1);
		//curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
		//

		$data = curl_exec($ch);
		curl_close($ch);
		
		return $data;

	}	

	private function returnXPath($data) {
		$dom = new DomDocument();

		if($dom->loadHTML($data)) {			//$data
			$xpath = new DOMXPath($dom);
			return $xpath;
		}

		else {
			die("Fel vid inläsning av HTML");
		}

	}

	private function getProducer () {
		$xpath =$this->returnXPath($this->scraped);
		$items = $xpath->query('//td/a');

		//plocka ut namn
		$producer = array();
		//$producerId = array();
		
		foreach($items as $item) {
			$producer[] = $item->nodeValue; 
			//$producerId[] = $name->getAttribute("href"). "<br>";
			//preg_match_all("/\d+/", $item->getAttribute("href"), $producerId[]);
		}

		return $producer;
	}

	private function getProducerId () {
		$xpath =$this->returnXPath($this->scraped);
		$items = $xpath->query('//td/a');

		//plocka ut id
		$producerId = array();
		
		foreach($items as $item) {
			preg_match_all("/\d+/", $item->getAttribute("href"), $producerId[]);
		}

		return $producerId;
	}

	private function getHomepage () {
		$xpath =$this->returnXPath($this->scraped);
		$items = $xpath->query('//td/a');

		//plocka ut alla undersidor
		$urls = array();
		foreach($items as $item) {
			$urls[] = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . 
			$item->getAttribute("href");
		}
		foreach ($urls as $pageToVisit) {
			$urlSrc = curlGet($pageToVisit);
		}
	}



	///////////////////////////////////////////////////////////////

		/*$dom = new DomDocument();

		if($dom->loadHTML($scraped)) {			//$data
			$xpath = new DOMXPath($dom);
			$items = $xpath->query('//td/a');

			//plocka ut namn & id
			$producer = array();
			$producerId = array();
			foreach($items as $item) {
				$producer[] = $item->nodeValue; 
				//$producerId[] = $name->getAttribute("href"). "<br>";
				preg_match_all("/\d+/", $item->getAttribute("href"), $producerId[]);
			}

			//plocka ut alla undersidor
			$urls = array();
			foreach($items as $item) {
				$urls[] = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . $item->getAttribute("href");
			}
			foreach ($urls as $pageToVisit) {
				$urlSrc = curlGet($pageToVisit);
			}
		}
		else {
			die("Fel vid inläsning av HTML");
		}


		var_dump($urls);*/

	
}


	