<?php

/**
* Called from AJAX to add stuff to DB
*/
function addToDB($name, $message, $pid) {
	$db = null;
	
	try {
		$db = new PDO("sqlite:db.db");
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e) {
		error_log($e->getMessage(),0);
		die("Something went wrong, please try again later.");
	}
	$q = "INSERT INTO messages (message, name, pid) VALUES('$message', '$name', '$pid')";
	
	try {
		if(!$db->query($q)) {
			die("Fel vid insert");
		}
	}
	catch(PDOException $e) {
		error_log($e->getMessage(),0);
		die("Something went wrong, please try again later.");
	}
}
