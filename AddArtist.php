<?php

// Start the session
session_start();

if(!isset($_SESSION['words'])) { 
  	$_SESSION['words'] = [];
}
if(!isset($_SESSION['artists'])) { 
  	$_SESSION['artists'] = [];
}
if(!isset($_SESSION['totalWords'])) { 
	$_SESSION['totalWords'] = 0;
}
if(!isset($_SESSION['currentSong'])) {
	$_SESSION['currentSong'] = 'Baby';
}

// Extract raw word
$raw_artist = isset($_POST['artist']) ? $_POST['artist'] : '';

if (!in_array($raw_artist, $_SESSION['artists'])) {
	$_SESSION['artists'][] = $raw_artist;
}

$artists;

foreach ($_SESSION['artists'] as &$artist) {
	$artists .= $artist . " ";
}

echo $artists;

?>