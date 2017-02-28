<?php

class Word {

	var $word;
	var $count;
	var $songs = array();

	function __construct($raw_word) {
		$this->word = $raw_word;
		$this->count = 0;
	}

	function getWord() {
		return $this->word;
	}

	function incrementCount() {
		$this->count += 1;
	}

	function addSong($song) {
		array_push($this->songs, $song);
	}

	function getSongs() {
		return $this->songs;
	}
}

?>