<?php

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
if(!isset($_SESSION['currentArtist'])) {
	$_SESSION['currentArtist'] = 'Justin Bieber';
}

// Extract raw word
$raw_artist = isset($_GET['artist']) ? $_GET['artist'] : '';

if (!in_array($raw_artist, $_SESSION['artists'])) {
	echo 'false';
} else {
	echo 'true';
}
?>