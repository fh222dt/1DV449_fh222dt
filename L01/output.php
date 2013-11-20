<?php
class output {
	public function displayTable ($producer) {
		$table = "<html>
					<head>
					<meta charset='utf-8'>
					<title>fh222dt webbskrapa</title>
					<link rel='stylesheet' href='bootstrap/css/bootstrap.css'>
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
						<td class='text-center'>$row->logo</td>
						<td class='text-center'>$row->name</td>
						<td class='text-center id'>$row->id</td>
						<td class='text-center'>$row->url</td>
						<td class='text-center'>$row->city</td>
						<td class='text-center'>$row->time</td>
						</tr>";				
		}

		$table.="
				</body>
				</tbody>
				</table>
				<footer>Webbskrapa av Frida Holmström fh222dt</footer>
				</html>";

		return $table;
	}
}