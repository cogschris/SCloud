<?php

require_once('Word.php');
// Start the session
session_start();

if(!isset($_SESSION['words'])) { 
  	$_SESSION['words'] = [];
}
if(!isset($_SESSION['topWords'])) { 
  	$_SESSION['topWords'] = [];
}
if(!isset($_SESSION['artists'])) { 
  	$_SESSION['artists'] = [];
}
if(!isset($_SESSION['totalWordsInCloud'])) { 
	$_SESSION['totalWordsInCloud'] = 0;
}
if(!isset($_SESSION['currentSong'])) {
	$_SESSION['currentSong'] = 'Baby';
}

$json = json_encode($_SESSION['words']);
echo ($json);

?>