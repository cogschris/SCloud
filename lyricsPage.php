<!DOCTYPE html>

	<head>
		<title>Lyrics Page</title>

		<script src="http://www.google.com/jsapi" type="text/javascript"></script>
		<script type="text/javascript">google.load("jquery", "1.3.2");</script>
		<script src="APIHandler.js"></script>

		<link rel="stylesheet" href="./css/lyrics.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

		<script>
			$(document).ready(function() {
				// getSearchSuggestions("Drake");
				// getArtistImage("Drake");
				// getSongList("Drake");
				setLyrics("Hotline Bling", "Drake");
			});
		</script>

	</head>

	<body>

		<div class = "container-full">

			<div class = "row">
				<div class = "col-xs-4 col-xs-offset-4">
					<h1 id="title_lyrics_page">Hotline Bling</h1>
				</div>
			</div>

			<div class = "row">
				<div class = "col-xs-10 col-xs-offset-1">
					<h2 id="lyrics">

					</h2>
				</div>
			</div>

			<div class = "row">
				<div class = "col-xs-3 col-xs-offset-3">
					<div class = "btn pull-right">
						<div id="back_to_home_btn">Back To Home</div>
					</div>
				</div>

				<div class = "col-xs-3">
					<div class = "btn">
						<div id="back_to_word_btn">Back To Word</div>
					</div>
				</div>

			</div>
		</div>



	</body>

</html>
