<?php
require_once("scraper.php");
require_once("output.php");

$scrape = new Scraper();

//echo $scrape->doSracpe();

$producer = new Producer();

$producer->logo = "BILD";
$producer->name = "Fridas Blommor";
$producer->id = "234";
$producer->url = "www.fridasblommor.se";
$producer->city = "Kungsängen";
$producer->time = "Hämtad 8 ggr, senast 14:58";

$producers = array();

array_push($producers, $producer);

$output = new Output();

echo $output->DisplayTable($producers);

class Producer {

}