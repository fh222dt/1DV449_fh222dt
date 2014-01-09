<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Utsläppskarta</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
    <link href='http://fonts.googleapis.com/css?family=Montserrat|Special+Elite|Kranky|Playball' rel='stylesheet' type='text/css'>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtJs5Lz6qV0SnxxE_tEumFq4CaB54g-S0&sensor=true">
    </script>
  </head>
  <body>
    <div >
      <header>
        <h1>Miljöutsläpp</h1>
        <h2>-vilka utsläpp sker i din närhet?</h2>
      </header>
      <aside>
        <h2>Vad vill du se på kartan?</h2>
        <p>Alla utsläpp i en kommun</p>
        <select id="districts" class="form-control input-sm"></select>
        
        <select id="states" class="form-control input-sm"><option>Alla utsläpp i ett län</option></select>
        <p>Alla utsläpp till luft</p>
        <p>Alla utsläpp till vatten</p>
        <p>Alla utsläpp till reningsverk</p>
        <p>Utsläpp per användningsområde:</p>
        <select id="usage" class="form-control input-sm"></select>
      </aside>
      <div id="map-canvas"></div>
      <footer>
        Data för utsläpp är hämtat från Naturvårdsverket. Alla utsläpp som visas kommer från
        företag som har tillstånd för sina utsläpp. Det förekommer även utsläpp i mindre skala som inte 
        naturvårdsverket har siffror på.
      </footer>
    </div>
    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="js/map.js"></script>
    <script src="js/ui.js"></script>
    

  </body>
  </html>

<?php

require_once('Caching.php');
$caching = new Caching("cache/blekinge.json", "http://oppnaapi.cloudapp.net/api/emissions?\$format=json&\$filter=Lannamn%20eq%20'Blekinge%20l%C3%A4n'");
?>