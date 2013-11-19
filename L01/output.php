<?php
class output {
	public function displayTable ($producer) {
		$table = "<h2>Mat från nära producenter</h2>";

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

		$table.="</tbody>
					</table>";

		return $table;
	}
}