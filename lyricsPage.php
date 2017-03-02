<!DOCTYPE html>

	<head>
		<title>Lyrics Page</title>

		<script src="http://www.google.com/jsapi" type="text/javascript"></script>
		<script type="text/javascript">google.load("jquery", "1.3.2");</script>
		<script src="APIHandler.js"></script>

		<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="./css/lyrics.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	</head>

	<body>

		<div class = "container-full">

			<div class = "row">
				<div class = "col-xs-4 col-xs-offset-4">
					<h1 id="title_lyrics_page"></h1>
					<script>
						$(document).ready(function() {
							// getSearchSuggestions("Drake");
							// getArtistImage("Drake");
							// getSongList("Drake");

							$.ajax({
								url: "CurrentArtistAndSong.php",
								dataType: "text",
								success: function( response ) {	
									var songAndArtist = response.split("1996!&#@($@&)#^&*:-");
									console.log(songAndArtist);
									var title = document.getElementById('title_lyrics_page');
									console.log(title.text);
									title.innerHTML = songAndArtist[0] + " by " + songAndArtist[1];
									console.log(title.text);
									setLyrics("Hotline Bling", "Drake");
								// setLyrics(songAndArtist[0], songAndArtist[1]);
						      	}
						      });

						});
					</script>
				</div>
			</div>

			<div class = "row">
				<div class = "col-xs-10 col-xs-offset-1">
					<h2 id="lyrics">
					 	Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello 
					</h2>
				</div>
			</div>

			<div class = "row" id="buttonRow">
			
					<button class="btn btn-lg" id="back_to_WC_btn">Back To Word Cloud</button>
					
					<button class="btn btn-lg" id="back_to_songlist_btn">Back To Song List</button>

			</div>
		</div>



	</body>

</html>
