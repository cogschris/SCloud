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
    <input class="form-control" id="artistListInput" list="artistlist" onkeyup="doSearch(this.value);" aria-describedby="emailHelp" placeholder="Enter artist">
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
		function doSearch(text){
			clearTimeout(delayTimer);
			delayTimer = setTimeout(function(){
				//here we will make the api call 
				//alter inner html to 

				//altering the inner HTML to update the drop-down suggestion menu
				document.getElementById('artistlist').innerHTML = '';
				var arr = ['srivas', 'shakira', 'pitbull', 'pitburn', 'shalia'];

				//iterating through the array of suggested artists to display to user
				for (var i = 0; i < arr.length; i++){
					document.getElementById('artistlist').innerHTML += '<option value="' + arr[i] + '"></option>';
				}
				console.log(document.getElementById('artistlist').innerHTML);
			}, 1000);
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
