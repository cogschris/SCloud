<!DOCTYPE html>

	<head>
		<title id="title">Lyrics Page</title>

		<script src="http://www.google.com/jsapi" type="text/javascript"></script>
		<script type="text/javascript">google.load("jquery", "1.3.2");</script>
		<script src="APIHandler.js"></script>
		<script src="html2canvas.js"></script>
		<script src="FileSaver.js"></script>


		<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="./css/lyrics.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

	</head>

	<body>

		<div class = "container-full">

			<div class = "row">
				<div class = "col-xs-10 col-xs-offset-1">
					<h1 id="title_lyrics_page"></h1>
					<script>
						
					</script>
				</div>
			</div>

			<div id="lyricsDiv" class = "row">
				<div class = "col-xs-10 col-xs-offset-1">
					<h2 id="lyrics"></h2>
				</div>
			</div>

			<div class = "row" id="buttonRow">
				<div class = "col-xs-4 col-xs-offset-3">
					<button class="btn btn-lg" id="back_to_WC_btn">
						Back To Word Cloud
					</button>
				</div>
					<button class="btn btn-lg" id="back_to_songlist_btn">
						Back To Song List
					</button>

			</div>
		</div>

		<script type="text/javascript">
			$(document).ready(function() {
				$.ajax({
					url: "CurrentArtistAndSong.php",
					dataType: "text",
					success: function( response ) {	
						var songAndArtist = response.split("1996!&#@($@&)#^&*:-");
						var title = document.getElementById('title_lyrics_page');
						title.innerHTML = songAndArtist[0] + " by " + songAndArtist[1];
						setLyrics(songAndArtist[0], songAndArtist[1], songAndArtist[2]);
						var title = document.getElementById("title");
						var pageTitle = document.getElementById("title_lyrics_page");
						title.innerHTML = songAndArtist[0];
						title.innerHTML = songAndArtist[0];
			      	}
			     });

				$("#back_to_WC_btn").click(function(){
					console.log("wc button");
					window.location.href = "wordcloud.php";
				});

				$("#back_to_songlist_btn").click(function(){
					console.log("songlist btn");
					window.location.href = "songListPage.php";	
				});
			});
			

		</script>

	</body>

</html>




