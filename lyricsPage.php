<!DOCTYPE html>

	<head>
		<title>Lyrics Page</title>
		
		<link rel="stylesheet" href="./css/lyrics.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	</head>

	<body>

		<div class = "container-full"> 
			
			<div class = "row">
				<div class = "col-xs-4 col-xs-offset-4">
					<h1 id="title_lyrics_page">Song Name</h1>
				</div>
			</div>

			<div class = "row">
				<div class = "col-xs-10 col-xs-offset-1">
					<h2 id="lyrics">
						Some lyrics go here. This will be long text. More text blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla blah bla bla.
					</h2>
				</div>
			</div>

			<div class = "row">
				<div class = "col-xs-3 col-xs-offset-3">
					<div class = "btn pull-right" onClick="return false" onmousedown="backToHome('srivas');"> 
						<div id="back_to_home_btn">Back To Home</div>
					</div>
				</div>

				<div class = "col-xs-3">
					<div class = "btn" onClick="backToWord();"> 
						<div id="back_to_word_btn">Back To Word</div>
					</div>
				</div>

			</div>
		</div>

		<!-- These are links to the home page and the word page -->
		<script type="text/javascript">
			function backToHome(cv){
				//window.location.href="index.html";
				var url = "/var/www/html/index.php";
				console.log(url);
				$.post(url, {contentVar: cv}, function(data){
					console.log(data);
				});
			}
			function backToWord(){
				window.location.href="songListPage.html"
			}
		</script>
		
	</body>

</html>