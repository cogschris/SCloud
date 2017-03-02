<!DOCTYPE html>

	<head>
		<title>Lyrics Page</title>

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
									title.innerHTML = songAndArtist[0] + " by " + songAndArtist[1];
									setLyrics("All of Me", "John Legend");
									//setLyrics(songAndArtist[0], songAndArtist[1]);
									// var div = document.getElementById('lyricsDiv');
									// html2canvas((div), {
									// 	onrendered: function(canvas){
									// 		var img = canvas.toDataURL();
									// 		window.open(img);
									// 	}
									// });
						      	}
						      });


						});
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
					<script type="text/javascript">

						function downloadURI(uri, name) {
					        var link = document.createElement("a");
					        link.download = name;
					        link.href = uri;
					        document.body.appendChild(link);
					        link.click(); 
    					}
						$("#back_to_WC_btn").click(function(){
							console.log("button is clicked");
							var div = document.getElementById('lyricsDiv');
							html2canvas((div), {
								onrendered: function(canvas){
									var img = canvas.toDataURL("image/png");
									downloadURI("data:" + img, "yourImage.png");
											
								}
							});
						});

					</script>
					<button class="btn btn-lg" id="back_to_songlist_btn">
						Back To Song List
					<script type="text/javascript">
						$("#back_to_songlist_btn").click(function(){
							console.log("songlist btn");
							$.ajax({
								type: "POST",
								url:"https://imagebin.ca/upload.php",
								data: {img:"@../../Downloads/yourImage.png"},
								success:function(response){
									console.log("response: " + response);
								}
							});
						});
					</script>
					</button>

			</div>
		</div>



	</body>

</html>
