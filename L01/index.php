<?php
require_once("scraper.php");
require_once("output.php");
require_once("producers.php");

$scrape = new Scraper();
$scrape->getProducer();
$scrape->getProducerId();
$scrape->getUrl();
$scrape->getCity();

//echo $scrape->doSracpe();

/*$producer = new Producers();

$producer->logo = "BILD";
$producer->name = "Fridas Blommor";
$producer->id = "234";
$producer->url = "www.fridasblommor.se";
$producer->city = "Kungsängen";
$producer->time = "Hämtad 8 ggr, senast 14:58";

$producers = array();

array_push($producers, $producer);*/




$output = new Output();

$producers = new Producers();
$results = $producers->createProducers();

//var_dump($producers);

echo $output->DisplayTable($results);
