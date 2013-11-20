<?php
class output {
	public function displayTable ($producer) {
		$table = "<html>
					<head>
					<meta charset='utf-8'>
					<title>fh222dt webbskrapa</title>
					<link rel='stylesheet' href='bootstrap/css/bootstrap.css'>
					<link rel='stylesheet' href='bootstrap/css/bootstrap-responsive.css'>
					</head>
					<body>";

		$table.= "<h2>Mat från nära producenter</h2>";

		$table.="<table>
						<thead>
							<tr>
							<th>Logo</th>
							<th>Namn</th>
							<th>Id</th>
							<th>Hemsida</th>
							<th>Ort</th>
							<th>Avläst</th>
							</tr>
						</thead>
						<tbody>";

		foreach ($producer as $row) {
				$table.="<tr>
						<td>$row->logo</td>
						<td>$row->name</td>
						<td>$row->id</td>
						<td>$row->url</td>
						<td>$row->city</td>
						<td>$row->time</td>
						</tr>";				
		}

		$table.="
				</body>
				</tbody>
				</table>
				</html>";

		return $table;
	}
}