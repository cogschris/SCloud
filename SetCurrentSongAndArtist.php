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
if(!isset($_SESSION['currentWord'])) { 
  	$_SESSION['currentWord'] = "notSet";
}
if(!isset($_SESSION['artists'])) { 
  	$_SESSION['artists'] = [];
}
if(!isset($_SESSION['totalWordsInCloud'])) { 
	$_SESSION['totalWordsInCloud'] = 0;
}
if(!isset($_SESSION['currentSong'])) {
	$_SESSION['currentSong'];
}
if(!isset($_SESSION['currentArtist'])) {
	$_SESSION['currentArtist'];
}


$raw_artist = isset($_POST['artist']) ? $_POST['artist'] : '';
$raw_song = isset($_POST['song']) ? $_POST['song'] : '';

$_SESSION['currentArtist'] = $raw_artist;
$_SESSION['currentSong'] = $raw_song;

echo ($_SESSION['currentSong'] . " " . $_SESSION['currentArtist']);
?>