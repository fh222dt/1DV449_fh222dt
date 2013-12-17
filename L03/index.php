<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="custom.css">
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtJs5Lz6qV0SnxxE_tEumFq4CaB54g-S0&sensor=false">
    </script>

    <script type="text/javascript">
      
    </script>


  </head>
  <body>
    <header><h1>Trafikrapport</h1></header>
    
    <div id='list' class='pull-right'>
      <ul>
        <li><a id='all-mess' href='#'>Alla meddelanden</a></li>
        <li><a id='road' href='#'>Vägtrafik</a></li>
        <li><a id='public' href='#'>Kollektivtrafik</a></li>
        <li><a id='planed' href='#'>Planerad störning</a></li>
        <li><a id='other' href='#'>Övrigt</a></li>
      </ul>
    </div>
    <div id="map-canvas" class='pull-left'/>

    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="traffic.js"></script>

  </body>
</html>
