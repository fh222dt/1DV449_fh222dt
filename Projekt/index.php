<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Utsläppskarta</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="custom.css">
    <link href='http://fonts.googleapis.com/css?family=Alfa+Slab+One' rel='stylesheet' type='text/css'>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtJs5Lz6qV0SnxxE_tEumFq4CaB54g-S0&sensor=false">
    </script>
  </head>
  <body>
    <p>HEJ</p>
    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    
    <script type="text/javascript">
        /*$.getJSON( "proxy.php", function( json ) {
          console.log( "JSON Data: " + json.Anlaggningsnamn.name );
        });*/          
    </script>

    <script type="text/javascript">
      /*var requestData = {
        op: "fetchRecords",
        id: 124,
        key: "Q1GxWcxWOrKY"
      };*/
      /*var request = $.ajax({
          url: "proxy.php",
          data: {requrl: "http://oppnaapi.cloudapp.net/api/emissions?$filter=Kommunnamn%20eq%20'Vilhelmina'&$format=json" }
          //dataType: 'json'
      });
      request.done(function(msg) {
          $('body').append(msg);
      });*/
    </script>

  </body>
  </html>

<?php

require_once('Caching.php');
$caching = new Caching("cache/blekinge.json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Lannamn%20eq%20'Blekinge%20l%C3%A4n'");
?>