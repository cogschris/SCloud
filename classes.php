<?php

class Word {

	var $word;
	var $count;
	var $songs = array();

	function __construct($word) {
		$this->word = $word;
		//echo "Word created: " . $this->word;
	}

	function addSong($song) {
		array_push($this->songs, $song);
		//echo "Song added: " . $song;
	}

	function getSongs() {
		return $songs;
	}
}

// class WordCloud {

// 	var $artists = array();
// 	var $words = array();

// 	function __construct() {
// 		//echo "WordCloud created.";
// 	}

// 	function addArtist($artist) {
// 		array_push($this->artists, $artist);
// 		//echo "Artist added: " . $artist;
// 	}

// 	function addWord($word) {
// 		array_push($this->words, $word);
// 		//echo "Word added: " . $word;
// 	}
// }
?>