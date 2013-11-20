<?php
require_once("scraper.php");
require_once("output.php");
require_once("producers.php");

setlocale (LC_TIME, "Swedish");		//vet ej om det behövs????????????

$scrape = new Scraper();
$scrape->getProducer();
$scrape->getProducerId();
$scrape->getUrl();
$scrape->getCity();

echo $scrape->doSracpe();

$output = new Output();

$producers = new Producers();
$results = $producers->createProducers();

//var_dump($producers);

echo $output->DisplayTable($results);





/*$urlSrc = $scrape->curlGet("http://vhost3.lnu.se:20080/~1dv449/scrape/secure/producent_19.php");
			$xpath = $scrape->returnXPath($urlSrc);

			$items = $items = $xpath->query('//span[@class = "ort"]');		

			$urladresses = array();
			//plocka ut hemside-adress
		if ($items->length != 0) {
			foreach ($items as $item) {


			}
		}

		else {
			$missing = "saknas";
			$urladresses[] = $missing;
		}

			//echo "nodevalue: $item->nodeValue ";


var_dump($items);

var_dump($urladresses);
*/