<?php
require_once("scraper.php");
require_once("output.php");
require_once("producers.php");

/*function doScrape () {
	$scrape = new Scraper();
	$scrape->getProducer();
	$scrape->getProducerId();
	$scrape->getUrl();
	$scrape->getCity();
	$scrape->getTimeStamp();
}*/

	//echo $scrape->doSracpe();

$output = new Output();

$producers = new Producers();
$results = $producers->createProducers();

echo $output->DisplayTable($results);

?>
<script>	//ej skrivit själv, från http://stackoverflow.com/questions/15219018/run-php-script-every-x-mins-using-ajax-request
	var milliSeconds = 60000;

	setInterval( function() {

	var xmlhttp;

	if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari
	{
	    xmlhttp=new XMLHttpRequest();
	}
	else
	{
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
	}

	xmlhttp.onreadystatechange=function()
	{
	      if (xmlhttp.readyState==4 && xmlhttp.status==200)
	      {
	         console.log ( xmlhttp.responseText );
	      } 
	}

	xmlhttp.open("POST","doscrape.php",true);
	xmlhttp.send();


	}, milliSeconds);
</script>