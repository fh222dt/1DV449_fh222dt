<?php
	function curl($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);

		$post_array = array(
			"username" => "admin",
			"password" => "admin"
		);

		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);

		//felsökningshjälp
		//curl_setopt($ch, CURLOPT_HEADER, 1);
		//curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
		//

		curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__) . "/cookie.txt");

		$data = curl_exec($ch);
		curl_close($ch);

		//leta reda på location
		$location ="";
		if(preg_match('#Location: (.*)#', $data, $r)){
			$location = trim($r[1]);
		}
		
		return $data;	
	}

	$scraped = curl("http://vhost3.lnu.se:20080/~1dv449/scrape/check.php/");

	var_dump($scraped);