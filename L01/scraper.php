<?php
class Scraper {

	private $login = "http://vhost3.lnu.se:20080/~1dv449/scrape/check.php";

	public function doSracpe() {
		//$firstpage = $this->curlGet($this->scraped);
		
		$urls = $this->getHomepages();
		
		$producerUrl = $this->getUrl();

		$producerCity = $this->getCity($urls);

		$names = $this->getProducer();

		var_dump($producerUrl);
		//var_dump($producerCity);

		//var_dump($urls);

		//$test = $this->curlGet("http://vhost3.lnu.se:20080/~1dv449/scrape/secure/producent_19.php");

		//var_dump($test);
	}


	public function curlGet($url) {
		$useragent = "MyScraper v0.1";		//så att webmastern kan blocka skrapor enkelt

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);	// Setting URL to POST to
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);	// Returning transfer as a string
		curl_setopt($ch, CURLOPT_COOKIESESSION, TRUE);	// Use cookies
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);	// Follow Location: headers
		curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__) . "/data/cookie.txt");	// Setting cookiefile
		curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__) . "/data/cookie.txt");	// Setting cookiejar
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

		$httpResponse = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		//curl_setopt($ch, CURLOPT_POST, 0);
		if ($httpResponse == 404) {
				$data = "saknas";
			}

		else {
			$data = curl_exec($ch);
		}
		
		curl_close($ch);
		
		return $data;

	}	

	public function returnXPath($data) {
		$dom = new DomDocument();
		$data = mb_convert_encoding($data, 'HTML-ENTITIES', "UTF-8");

		if($dom->loadHTML($data)) {			//$data
			$xpath = new DOMXPath($dom);
			return $xpath;
		}

		else {
			die("Fel vid inläsning av HTML");
		}

	}

	public function getProducer () {
		$scraped = $this->curlGet($this->login);
		$xpath =$this->returnXPath($scraped);
		$items = $xpath->query('//td/a');

		//plocka ut namn
		$producer = array();
		
		foreach($items as $item) {

			$producer[] = $item->nodeValue; 
		}

		$content = serialize($producer);
		file_put_contents("data/name.txt", $content);
	}

	public function getProducerId () {
		$scraped = $this->curlGet($this->login);
		$xpath =$this->returnXPath($scraped);
		$items = $xpath->query('//td/a');

		//plocka ut id
		$producerId = array();
		
		foreach($items as $item) {
			preg_match("/\d+/", $item->getAttribute("href"), $producerId[]);
		}

		/*foreach ($items as $item) {
			$id = $item->getAttribute("href");
			$producerId[] = $cleanedid = substr($id, 10);
		}*/

		$content = serialize($producerId);
		file_put_contents("data/id.txt", $content);
		//return $producerId;
	}

	private function getHomepages () {
		$scraped = $this->curlGet($this->login);
		$xpath =$this->returnXPath($scraped);
		$items = $xpath->query('//td/a');

		//plocka ut alla undersidor
		$urls = array();
		foreach($items as $item) {
			$urls[] = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . 
			$item->getAttribute("href");
		}
		
		return $urls;
	}

	public function getUrl () {		
		$urls = $this->getHomepages();

		$urladresses = array();
		
			foreach ($urls as $pageToVisit) {
				$urlSrc = $this->curlGet($pageToVisit);
				$xpath = $this->returnXPath($urlSrc);

				$items = $xpath->query('//p/a');

				if ($items->length != 0) {		

					//plocka ut hemside-adress
					foreach ($items as $item) {

							$urladresses[] = $item->nodeValue;											
					}
				}
				else {
					$missing = "saknas";
					$urladresses[] = $missing;
				}

				
				//sleep(rand(1, 3));	//för att inte verka som en dos-attack & låta servern vila lite		
			}
		
		

		$content = serialize($urladresses);
		file_put_contents("data/url.txt", $content);

		//return $urladresses;
	}

	public function getCity () {
		$urls = $this->getHomepages();

		$cities = array();
		foreach ($urls as $pageToVisit) {
			$urlSrc = $this->curlGet($pageToVisit);
			$xpath = $this->returnXPath($urlSrc);

			$items = $xpath->query('//span[@class = "ort"]');

			if ($items->length != 0) {
				foreach ($items as $item) {

					$city = $item->nodeValue; 
					$cities[] = $cleanedCity = substr($city, 5);
				}
			}
			else {
				$missing = "saknas";
				$cities[] = $missing;
			}

			
			//sleep(rand(1, 3));	//för att inte verka som en dos-attack & låta servern vila lite		
		}

		$content = serialize($cities);
		file_put_contents("data/city.txt", $content);
		
	}

	public function getLogo() {			//spara bild med id ist för filnamn
		$urls = $this->getHomepages();

		$logos = array();
		foreach ($urls as $pageToVisit) {
			$urlSrc = $this->curlGet($pageToVisit);
			$xpath = $this->returnXPath($urlSrc);

			$items = $xpath->query('//img/@src');
			
			
			foreach ($items as $item) {
				$logos[] = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . $item->nodeValue;
			}

			foreach ($logos as $item) {
				$imgName = end(explode('/', $item));

				if (getimagesize($item)) {
					$imgFile = $this->curlGet($item);
					file_put_contents("data/img/$imgName", "$imgFile");
				}
			}



		}

		return $logos;
	}
	
}


	