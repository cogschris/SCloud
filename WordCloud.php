<?php

include "Word.php";

class WordCloud {

	public $artists = array();
	public $words = array();

	function __construct() {
		//echo ("WordCloud created!");
	}

	function addArtist($artist) {
		array_push($this->artists, $artist);
	}

	function addWord($word) {
		/* If the key, $word, is not in the array of Words, 
		create a Word and add the current song to the Word's 
		array of songs. Finally, add Word to the WordCloud's 
		array of Words, with key $word. */
		if (!array_key_exists($word, $words)) {
			$currentSong = $_SESSION['currentSong'];

			$wordObject = new Word($word);
			$wordObject->addSong($currentSong);
			$words[$word] = json_encode($wordObject);
			echo ($words[$word]);
		}	

		/* If the Word is already in the array of Words, 
		increment the count of the Word. Check if the
		current song is in the song array of Word, if not
		add it. */
		// else {

		// }

	}
}

?>