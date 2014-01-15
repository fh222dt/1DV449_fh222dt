<!DOCTYPE html>

<?php
require_once('getemissions.php');
$emissions = new getemissions();
$emissions->getStates();
$emissions->getCategories();

?>

<html>
  <head>
    <meta charset="utf-8">
    <title>Miljöutsläpp på karta -vad släpps ut i din närhet?</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link type="image/x-icon" href="favicon.ico" rel="shortcut icon">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/animate.css">
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
        <h2>Välj vad du vill se på kartan</h2>
        <select id="states" class="form-control input-sm"><option>Alla utsläpp i ett län</option></select>
        <select id="districts" class="form-control input-sm"><option>Alla utsläpp i en kommun</option>
          <option id="removeme">-Välj först län</option></select>
        
        <button id="air" type="button" class="btn btn-default btn-sm btn-block">Alla utsläpp till luft</button>
        <button id="water" type="button" class="btn btn-default btn-sm btn-block">Alla utsläpp till vatten</button>
        <button id="sewage" type="button" class="btn btn-default btn-sm btn-block">Alla utsläpp till reningsverk</button>
        
        <select id="usage" class="form-control input-sm"><option>Utsläpp per användningsområde</option></select>
      </aside>
      <div id="start" class="animated flipInY"><p>Välj i menyn vad du vill se för utsläpp</p></div>
      <div id="map-canvas"></div>
      <footer>
        Data för utsläpp är hämtat från Naturvårdsverket. Alla utsläpp som visas kommer från
        företag som har tillstånd för sina utsläpp. Det förekommer även utsläpp i mindre skala som inte 
        naturvårdsverket har siffror på.
      </footer>
    </div>
    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
        
    <script src="js/ui.js"></script>
    <script src="js/map.js"></script>
    

  </body>
  </html>

