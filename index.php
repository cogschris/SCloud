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

<body>


<div id=testDiv>
	


</div>


<form>
  <div class="form-group">
    <label for="exampleInputEmail1"> Search </label>
    <input class="form-control" id="artistListInput" list="artistlist" onkeyup="getSearchSuggestions(this.value);" aria-describedby="emailHelp" placeholder="Enter artist">
    <datalist id="artistlist">
    
    </datalist>
    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
  </div>

  
  <button id=testButton type="submit" class="btn btn-primary">Submit</button>
</form>


</body>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>	

	<script type="text/javascript">


		//this variable keeps track of the Timer for searches
		var delayTimer;

		//doSearch takes in the user's input and displays the drop-down suggestions
		function doSearch(suggestions){
			clearTimeout(delayTimer);
			delayTimer = setTimeout(function(){
				//here we will make the api call 

				//alter inner html to 

				//altering the inner HTML to update the drop-down suggestion menu
				document.getElementById('artistlist').innerHTML = '';

				//iterating through the array of suggested artists to display to user
				var appendHTML = '';
				for (var i = 0; i < suggestions.length; i++){
					appendHTML += '<option value="' + suggestions[i] + '"></option>';
				}
				document.getElementById('artistlist').innerHTML = appendHTML;
				console.log(document.getElementById('artistlist').innerHTML);
			}, 1000);
		}

		function getSearchSuggestions(prefix) {
		  $.ajax({
		    url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(prefix) + "&limit=10",
		    dataType: "json",
		    success: function( response ) {
		      console.log( response ); // server response
		      var suggestions = new Array();
		      for (var i = 0; i < 9; i++) {
		        console.log("Suggestion: " + response.data[i].name);
		        suggestions.push(response.data[i].name);
		      }
		      doSearch(suggestions);
		      //return suggestions;
		    }
		  });
		}
		
		$('#testButton').click(function(event){

			event.preventDefault();

			var myData = {	
				name: $('#exampleInputEmail1').val(),
			}

			$.ajax({
				

				url: "searchArtists.php",
				data: myData

				
			})
			.done(function(data) {


				// console.log($('#test'));

				$('#testDiv').html(data);
				
				// console.log(data);


			}).fail(function(response){



			});


		})


	</script>
</html>
