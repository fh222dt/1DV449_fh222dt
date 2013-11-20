<?php
class Scraper {

	private $login = "http://vhost3.lnu.se:20080/~1dv449/scrape/check.php";

	private function curlGet($url) {
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

		/*$httpResponse = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		//curl_setopt($ch, CURLOPT_POST, 0);
		if ($httpResponse == 404) {
				$data = "saknas";
			}

		else {
			$data = curl_exec($ch);
		}*/
		
		curl_close($ch);
		
		return $data;

	}	

	private function returnXPath($data) {
		$dom = new DomDocument();
		$data = mb_convert_encoding($data, 'HTML-ENTITIES', "UTF-8");

		if($dom->loadHTML($data)) {	
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

		$producerId = array();
		
		foreach($items as $item) {
			preg_match("/\d+/", $item->getAttribute("href"), $producerId[]);
		}

		$content = serialize($producerId);
		file_put_contents("data/id.txt", $content);
	}

	private function getHomepages () {
		$scraped = $this->curlGet($this->login);
		$xpath =$this->returnXPath($scraped);
		$items = $xpath->query('//td/a');

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

					foreach ($items as $item) {
							$urladresses[] = $item->nodeValue;											
					}
				}
				else {
					$missing = "saknas";
					$urladresses[] = $missing;
				}
			}		

		$content = serialize($urladresses);
		file_put_contents("data/url.txt", $content);
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
		}

		$content = serialize($cities);
		file_put_contents("data/city.txt", $content);		
	}

	public function getLogo() {
		$urls = $this->getHomepages();

		$logos = array();
		$fileNo = array();

		foreach ($urls as $pageToVisit) {
			$urlSrc = $this->curlGet($pageToVisit);
			$xpath = $this->returnXPath($urlSrc);

			$items = $xpath->query('//img/@src');
			
			
			foreach ($items as $item) {
				$imgPath[] = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . $item->nodeValue;
				$allNo = preg_replace("/[^0-9]/","",$pageToVisit);
				$fileNo[] = substr($allNo, 10);
			}	
		}
		
		for ($i = 0; $i < count($imgPath); $i++) {		
				
			$ext = pathinfo($imgPath[$i], PATHINFO_EXTENSION);

			
			$imgName = $fileNo[$i] . "." . $ext;				

			if (getimagesize($imgPath[$i])) {
				$imgFile = $this->curlGet($imgPath[$i]);
				file_put_contents("data/img/$imgName", "$imgFile");
			}
		}
	}


	public function getTimeStamp () {
		if(file_exists("data/stamp.txt"))  {
			$old = file_get_contents("data/stamp.txt");
			$old = unserialize($old);
			$loads = $old[0];
			$loads++;
		}
		else {
			$loads = 1;
		}
		
		$time = strftime("%X");

		$stamp = array("$loads","$loads ggr, <br> senast kl $time");

		$stamp = serialize($stamp);
		file_put_contents("data/stamp.txt", $stamp);
	}	
}


	