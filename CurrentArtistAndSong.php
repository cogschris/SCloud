<?php 
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
		$_SESSION['currentSong'] = "Baby"; 
	}
	if(!isset($_SESSION['currentArtist'])){
		$_SESSION['currentArtist'] = "Justin Bieber";
	}

	$results = Array($_SESSION['currentSong'], $_SESSION['currentArtist']);
	echo $results[0]."1996!&#@($@&)#^&*:-".$results[1];
?>