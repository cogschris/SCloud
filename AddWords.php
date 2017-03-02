<?php

require_once('Word.php');
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

// Extract raw array of words
$raw_array = isset($_POST['words']) ? $_POST['words'] : '';

// Get the current song
$currentSong = $_SESSION['currentSong'];

foreach ($raw_array as &$raw_word) {

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

}

// Testing comparator function - works!
// $wordObject1 = new Word('dog');
// $wordObject1->incrementCount();
// $wordObject1->incrementCount();
// $_SESSION['words']['dog'] = $wordObject1;
// $wordObject2 = new Word('cat');
// $wordObject2->incrementCount();
// $wordObject2->incrementCount();
// $wordObject2->incrementCount();
// $wordObject2->incrementCount();
// $_SESSION['words']['cat'] = $wordObject2;
// $wordObject3 = new Word('bird');
// $wordObject3->incrementCount();
// $wordObject3->incrementCount();
// $wordObject3->incrementCount();
// $wordObject3->incrementCount();
// $wordObject3->incrementCount();
// $wordObject3->incrementCount();
// $_SESSION['words']['bird'] = $wordObject3;

// Sort the words 
usort($_SESSION['words'], function ($word_a, $word_b) {
	if ($word_a->getCount() == $word_b->getCount()) {
		return 0;
	}
	return ($word_a->getCount() > $word_b->getCount())?-1:1;
});

// Set the top 250 most frequent words
$_SESSION['topWords'] = array_slice($_SESSION['words'], 0, 3, true);

// Get the total number of words in the cloud
$_SESSION['totalWordsInCloud'] = 0;
foreach ($_SESSION['topWords'] as &$top_word) {
	$_SESSION['totalWordsInCloud'] = $_SESSION['totalWordsInCloud'] + $top_word->getCount();
}

// Calculate the freq of each word in the word cloud
foreach ($_SESSION['topWords'] as &$top_word) {
	$top_word->calcFreq($_SESSION['totalWordsInCloud']);
}

$json = json_encode($_SESSION['topWords']);
echo ($json);

?>