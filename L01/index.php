<?php
	function curl($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	
	}

	$scraped = curl("http://vhost3.lnu.se:20080/~1dv449/scrape/");

	var_dump($scraped);