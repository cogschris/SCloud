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
	$_SESSION['currentSong'] = "Baby"; 
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Word Cloud</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
<input id="input-text"></input>
<button class="add-button">Add Word</button>
<script type="text/javascript">
	$(".add-button").click(function () {

		var inputField = document.getElementById("input-text");

		var request = $.ajax({
			url: "AddWord.php",
			type: "POST",
			data: {word : inputField.value},
			dataType: "text"
		});

		request.done(function(msg) {
			console.log("Result: " + msg);
		});
	})
</script>
</body>
</html>