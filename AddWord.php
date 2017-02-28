<?php

require_once('Word.php');
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
$raw_word = isset($_POST['word']) ? $_POST['word'] : '';

// Get the current song
$currentSong = $_SESSION['currentSong'];

/* If the Word does not exist, create a Word object, set the current
song, and increment count.*/
if(!isset($_SESSION['words'][$raw_word])) {
	$wordObject = new Word($raw_word);
	$wordObject->addSong($currentSong);
	$wordObject->incrementCount();
	$_SESSION['words'][$raw_word] = $wordObject;
}
/* If the Word already exists, add the current song if not already in 
Word's songs array, and incrememnt count.  */ 
else {
	$wordObject = $_SESSION['words'][$raw_word];
	if (!in_array($currentSong, $wordObject->songs)) {
		$wordObject->addSong($currentSong);
	}
	$wordObject->incrementCount();
}

$_SESSION['totalWords'] += 1;

$json = json_encode($_SESSION['words']);
echo ($json);

?>