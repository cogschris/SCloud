<?php

require_once('Word.php');
session_start();

if (!isset($_SESSION['favorites'])) {
	$_SESSION['favorites'] = [];
}
if (!isset($_SESSION['words'])) {
	$_SESSION['words'] = [];
}

// extract id
$raw_id = isset($_POST['id']) ? $_POST['id'] : '';

if (preg_match("/blog-post-(\d+)/", $raw_id, $matches)) {
	$id = $matches[1];

	if (!in_array($id, $_SESSION['favorites'])) {
		$_SESSION['favorites'][] = $id;
	}

	$word = $raw_id;
	if(!isset($_SESSION['words'][$word])) {
		$wordObject = new Word($word);
		$wordObject->addSong("Calle Ocho");
		$_SESSION['words'][$word] = $wordObject;

	} 
	else {
		$wordObject = $_SESSION['words'][$word];
		$wordObject->addSong('Baby');
	}

	// $json = json_encode($_SESSION['words']);
	// echo $json;
	echo 'true';

} else {
	echo 'false';
}

?>