<?php 
require_once("scraper.php");

	$scrape = new Scraper();
	$scrape->getProducer();
	$scrape->getProducerId();
	$scrape->getUrl();
	$scrape->getCity();
	$scrape->getTimeStamp();

