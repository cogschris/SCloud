<!-- This file is the index file, which acts as the landing page for the SCloud Application. This is where the user will first be able to input an artist into the search field and search for his/her songs. Once the user searches for an artist, this will lead to the following Word Cloud pages. -->


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>
		SCloud Home
	</title>
	<!-- <link rel="stylesheet" type="text/css" href="css/artistsearchstyle.css"> -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<h1> <center> Welcome to SCloud! </center></h1>
</head>

<body bgcolor="#bababa">
<div class="container">

	<div id=testDiv>
		


	</div>


	<form>
	  <div class="form-group">

	    <input class="form-control" id="artistListInput" list="artistlist" onkeypress="getSearchSuggestions(this.value);" aria-describedby="emailHelp" placeholder="Enter artist" autocomplete="off">
	    <datalist id="artistlist">
	    
	    </datalist>
	    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
	  </div>

	  <button onclick = "window.location.href='songListPage.php'" id=testButton type="search" class="btn pull-right" style ="position: absolute; right: 0;"> Search </button>
	<!--   <script type = "text/javascript">
	  	document.getElementbyID("testButton").onClick = function () {
	  		location.href = "songListPage.php";
	  	};
	  	</script> -->


	</form>
</div>


</body>

	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>	

	<script type="text/javascript">


		//this variable keeps track of the Timer for searches
		var delayTimer;

		//doSearch takes in the user's input and displays the drop-down suggestions
		function doSearch(suggestions){
			//here we will make the api call 

				//alter inner html to 

				//altering the inner HTML to update the drop-down suggestion menu
				//$('#artistlist').html('');

				//iterating through the array of suggested artists to display to user
				// var appendHTML = '';
				document.getElementById('artistlist').innerHTML = "";
				var list = document.getElementById('artistlist'); 
				for (var i = 0; i < suggestions.length; i++){
					// appendHTML += '<option value="' + suggestions[i] + '"/>';
					var option = document.createElement('option');
   					option.value = suggestions[i];
   					list.appendChild(option);
				}
				//$('#artistlist').html(appendHTML);
				console.log(list.innerHTML);

			// clearTimeout(delayTimer);
			// delayTimer = setTimeout(function(){
			// 	//here we will make the api call 

			// 	//alter inner html to 

			// 	//altering the inner HTML to update the drop-down suggestion menu
			// 	document.getElementById('artistlist').innerHTML = '';

			// 	//iterating through the array of suggested artists to display to user
			// 	var appendHTML = '';
			// 	for (var i = 0; i < suggestions.length; i++){
			// 		appendHTML += '<option value="' + suggestions[i] + '"/>';
			// 	}
			// 	document.getElementById('artistlist').innerHTML = appendHTML;
			// 	console.log(document.getElementById('artistlist').innerHTML);
			// }, 0);
		}

		function getSearchSuggestions(prefix) {
		  $.ajax({
		    url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(prefix) + "&limit=10",
		    dataType: "json",
		    success: function( response ) {
		      console.log( response ); // server response
		      var suggestions = new Array();
		      for (var i = 0; i < 10; i++) {
		        console.log("Suggestion: " + response.data[i].name);
		        suggestions.push(response.data[i].name);
		      }
		      doSearch(suggestions);
		      //return suggestions;
		    }
		  });
		}

		// $('#testButton').click(function(event){

		// 	event.preventDefault();

		// 	var myData = {	
		// 		name: $('#exampleInputEmail1').val(),
		// 	}

		// 	$.ajax({
				

		// 		url: "searchArtists.php",
		// 		data: myData

				
		// 	})
		// 	.done(function(data) {


		// 		// console.log($('#test'));

		// 		$('#testDiv').html(data);
				
		// 		// console.log(data);


		// 	}).fail(function(response){



		// 	});

		$('#searchButton').click(function(event){



		})


	</script>


</html>
