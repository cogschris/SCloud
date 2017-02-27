<?php

session_start();

if (!isset($_SESSION['favorites'])) {
	$_SESSION['favorites'] = [];
}

function array_remove($element, $array) {
	$index = array_search($element, $array);
	array_splice($array, $index, 1);
	return $array;
}

// extract id
$raw_id = isset($_POST['id']) ? $_POST['id'] : '';

if (preg_match("/blog-post-(\d+)/", $raw_id, $matches)) {
	$id = $matches[1];

	if (in_array($id, $_SESSION['favorites'])) {
		$_SESSION['favorites'] = array_remove($id, $_SESSION['favorites']);
	}

	echo 'true';
	
} else {
	echo 'false';
}

?>