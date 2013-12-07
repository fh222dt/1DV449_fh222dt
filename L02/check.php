<?php
require_once("sec.php");

// check tha POST parameters
$u = $_POST['username'];
$p = $_POST['password'];

//validate
function validate($string) {
		$string = ltrim($string);
		$string = rtrim($string);
		$string = strip_tags($string);
		return $string;
	}

$validatedUser = validate($u);
$validatedPass = validate($p);


// Check if user is OK
if(isUser($validatedUser, $validatedPass)) {
	// set the session
	sec_session_start();
	$_SESSION['login_string'] = hash('sha512', "Come_On_You_Spurs" +$u); 
	$_SESSION['user'] = $u;
	header("Location: img/middle.php");
}
else {
	// To bad
	header('HTTP/1.1 401 Unauthorized');
}
