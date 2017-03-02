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

function getArtists() {
	if (!is_null($_SESSION['artists'][0])) {
		$artists;

		foreach ($_SESSION['artists'] as &$artist) {
    		$artists .= $artist . " ";
		}

		return $artists;
	}
}

?>
<!DOCTYPE html>
<html>
	<head>
		<title id="title"><?php echo (getArtists()) ?></title>
		<link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link href="css/styleWordCloud.css" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
		<script src="APIHandler.js"></script>

		

		<!-- <script type="text/javascript" src="//platform-api.sharethis.com/js/sharethis.js#property=58b7aed21360990012d4811b&product=inline-share-buttons"></script> -->

		<meta property="og:site_name" content="Scotch">
		<meta property="og:url" content="wordcloud.php">  
		<meta property="og:type" content="website"> 

		<meta property="og:title" content="Scotch Web Development">
		<meta property="og:description" content="Scotch is a web development blog discussing all things programming, development, web, and life.">
		<meta property="og:image" content="https://ibin.co/3E8xnkDQhCZR.jpg">
		<meta property="fb:app_id" content="1389892087910588">
		<meta property="fb:admins" content="579622216,709634581">


	</head>
	<body>

		<div id="fb-root"></div>
		<script>(
			function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
				fjs.parentNode.insertBefore(js, fjs);
			}
			(document, 'script', 'facebook-jssdk'));
		</script>

		<div class="container-full">
			<div class="row">
				<h2 id="wordCloudHeader"> <?php echo (getArtists()) ?></h2>
			</div>
			<center>
	    		
	    		<p id= "something"> </p>
	    		<br>
	    		<div class = "form-group">
	    			<!-- <form class="search" method="post" action="index.html" > -->
						<input class="form-control" id="input-text" list="artistlist" onkeypress="getSearchSuggestions(this.value);" aria-describedby="emailHelp" placeholder="Enter Artist" autocomplete="off"></input>
						<datalist id="artistlist"></datalist>
	    			<!-- </form> -->
	                <!-- <div class="input-group col-md-12">
	                    <input type="text" class="form-control input-lg" placeholder="Artists" />
	                    <span class="input-group-btn">
	                        
	                    </span>
	                </div> -->
	            </div>
	            <br>
	            <button class="search-button btn btn-lg" type="button"><i class="glyphicon glyphicon-search pull-left"></i><span>Search</span></button> 
	            <button class="add-button btn btn-lg" href="http://dotstrap.com/"><i class="glyphicon glyphicon-list pull-left"></i><span>Add</span></button> 

	           <!--  <button class="btn btn-lg btn-primary" href="http://dotstrap.com/"><i class="glyphicon glyphicon-user pull-left"></i><span>Share to Facebook</span></button>  -->



				<div class="fb-share-button" id="fb_button" 
					data-href="https://ibin.co/3E8xnkDQhCZR.jpg " 
					data-layout="button" data-size="large" 
					data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" 
					target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</a></div>

 
				<script type="text/javascript">
					
					$(".fb-share-button").click(function(){
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

	           <!--  Load Facebook SDK for JavaScript -->
					  <!-- <div id="fb-root"></div>
						  <script>(function(d, s, id) {
						    var js, fjs = d.getElementsByTagName(s)[0];
						    if (d.getElementById(id)) return;
						    js = d.createElement(s); js.id = id;
						    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1";
						    fjs.parentNode.insertBefore(js, fjs);
						  }(document, 'script', 'facebook-jssdk'));</script>  -->

						  <!-- Your share button code -->
				<!--		  <div class="fb-share-button" 
						    data-href="wordcloud.php" 
						    data-layout="button_count">
						  </div>
										<br>
										<br>  -->

	       	</center>
	    </div>
	    <script type="text/javascript">

	    $(document).ready(function() {
			
			generateWordCloud();

	        /* When the user clicks on the button,
	        toggle between hiding and showing the dropdown content */
	        function myFunction() {
	        	document.getElementById("myDropdown").classList.toggle("show");
	        }

	        function filterFunction() {
	        	var input, filter, ul, li, a, i;
	        	input = document.getElementById("myInput");
	        	filter = input.value.toUpperCase();
	        	div = document.getElementById("myDropdown");
	        	a = div.getElementsByTagName("a");
	        	for (i = 0; i < a.length; i++) {
	        		if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
	        			a[i].style.display = "";
	        		} else {
	        			a[i].style.display = "none";
	        		}
	        	}
	        }

			function generateWordCloud() {

				document.getElementById("something").innerHTML = "";

	    		var arr;

	    		var request = $.ajax({
					url: "GetArtists.php",
					type: "GET",
					dataType: "text"
				});

				request.done(function(msg) {
					arr = JSON.parse(msg);
					getWords(arr);
				});

				
			}

	      	// Generate a new webpage with single artist in input field?
	      	$(".search-button").click(function () {

	      		var inputField = document.getElementById("input-text");

				var request = $.ajax({
					url: "NewCloud.php",
					type: "POST",
					data: {artist : inputField.value},
					dataType: "text"
				});

				request.done(function(msg) {
					document.title = msg;
					document.getElementById('wordCloudHeader').innerHTML = msg;
					console.log("Result: " + msg);
				});

				generateWordCloud();

				inputField.value = "";
	      	})

	      	$(".add-button").click(function () {

	      		var inputField = document.getElementById("input-text");

				var request = $.ajax({
					url: "AddArtist.php",
					type: "POST",
					data: {artist : inputField.value},
					dataType: "text"
				});

				request.done(function(msg) {
					document.title = msg;
					document.getElementById('wordCloudHeader').innerHTML = msg;
					console.log("Result: " + msg);
				});

				generateWordCloud();

				inputField.value = "";
			})
	    });

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
		        		// console.log("Suggestion: " + response.data[i].name);
		        		suggestions.push(response.data[i].name);
		        	}
		        	// clearTimeout(delayTimer);
		        	// setTimeout(function () {
		        	// 	doSearch(suggestions);
		        	// }, 2500);
		      		//return suggestions;
		      		doSearch(suggestions);

		      	}
		    });
		}

		    	

		</script>
	</body>
</html>
