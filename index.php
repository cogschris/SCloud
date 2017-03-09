<?php

session_start();

if(!isset($_SESSION['words'])) { 
  	$_SESSION['words'] = [];
}
if(!isset($_SESSION['topWords'])) { 
  	$_SESSION['topWords'] = [];
}
if(!isset($_SESSION['currentWord'])) { 
  	$_SESSION['currentWord'];
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

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>SCloud Home</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="APIHandler.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<link rel="stylesheet" href="css/artistsearchstyle.css">
	<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>
<body>
	<h1 id="mainHeader">Welcome to SCloud! <!-- <center> Welcome to SCloud! </center> --></h1>
	<div class="container">
		<div class="form-group">
			<input class="form-control" id="input-text" list="artistlist" onkeypress="getSearchSuggestions(this.value);" aria-describedby="emailHelp" placeholder="Enter Artist" autocomplete="off"></input>
			<datalist id="artistlist"></datalist>
		</div>
		<button class="search-button btn pull-right" type="search"> Search </button>
	</div>
	<script type="text/javascript">


		// This variable keeps track of the Timer for searches
		var delayTimer;

		// doSearch takes in the user's input and displays the drop-down suggestions
		function doSearch(suggestions){

			document.getElementById('artistlist').innerHTML = "";
			var list = document.getElementById('artistlist'); 
			for (var i = 0; i < suggestions.length; i++){
				// appendHTML += '<option value="' + suggestions[i] + '"/>';
				var option = document.createElement('option');
				option.value = suggestions[i];
				list.appendChild(option);
			}
		}

		function getSearchSuggestions(prefix) {
			$.ajax({
				url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(prefix) + "&limit=10",
				dataType: "json",
				success: function( response ) {
		   			// console.log( response ); // server response
		   			var suggestions = new Array();
		   			for (var i = 0; i < 10; i++) {
		        		//console.log("Suggestion: " + response.data[i].name);
		        		suggestions.push(response.data[i].name);
		        	}
		        	// clearTimeout(delayTimer);
		        	// setTimeout(function () {
		        	// 	doSearch(suggestions);
		        	// }, 2500);
		      		//return suggestions;
		      		//console.log(response);
		      		doSearch(suggestions);

		      	}
		    });
		}

		$(".search-button").click(function () {

			var inputField = document.getElementById("input-text");

			// Check if the artist is in the array on server
			var request0 = $.ajax({
				url: "CheckArtists.php",
				type: "GET",
				data: {artist : inputField.value},
				dataType: "text"
			});

			request0.done(function(msg) {
				// console.log("Result: " + msg);
				if (msg == 'true') {
					return;
				}
			});

			// Add artist to array of artists on server
			var request = $.ajax({
				url: "AddArtist.php",
				type: "POST",
				data: {artist : inputField.value},
				dataType: "text"
			});

			request.done(function(msg) {
				// console.log("Result: " + msg);
				window.location.href = "wordcloud.php";
			});

			// Get an array of all words in the lyrics to song(s)
			// var words = getWords(inputField.value);

			// // Add songs to array of words on server
			// var request2 = $.ajax({
			// 	url: "AddWords.php",
			// 	type: "POST",
			// 	data: {words : words},
			// 	dataType: "text"
			// });

			// request2.done(function(msg) {
			// 	console.log("Result: " + msg);
			// 	//window.location.href = "wordcloud.php";
			// });
		})

	</script>
</body>
</html>