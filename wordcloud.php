<?php

session_start();

if(!isset($_SESSION['words'])) { 
  	$_SESSION['words'] = [];
}
if(!isset($_SESSION['artists'])) { 
  	$_SESSION['artists'] = [];
}
if(!isset($_SESSION['totalWords'])) { 
	$_SESSION['totalWords'] = 0;
}
if(!isset($_SESSION['currentSong'])) { 
	$_SESSION['currentSong'] = "Baby"; 
}

function getArtists() {
	if (!is_null($_SESSION['artists'][0])) {
		return $_SESSION['artists'][0];
	}
}

?>
<!DOCTYPE html>
<html>
<head>

	<title><?php echo (getArtists()) ?></title>
	<link href="css/styleWordCloud.css" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    </head>
    <body>
    	<div class="container-full">
    		<div class="row">
    			<h2> <center></center></h2>
    		</div>

    		<br>
    		<center>

	    		<h1>Word Cloud goes here</h1>

	    		<br>
	    		<br>
	    		<br>

	    		<div id="custom-search-input">

	    			<form class="search" method="post" action="index.html" >
	    				<input type="text" name="q" placeholder="Search..." list="artistlist" onkeyup="getSearchSuggestions(this.value);" />
	    				<datalist id="artistlist"></datalist>
	    			</form>
	                <!-- <div class="input-group col-md-12">
	                    <input type="text" class="form-control input-lg" placeholder="Artists" />
	                    <span class="input-group-btn">
	                        
	                    </span>
	                </div> -->
	            </div>

	            <br>

	            <button class="btn btn-lg" type="button"><i class="glyphicon glyphicon-search pull-left"></i><span>Search</span></button> 
	            <button class="btn btn-lg" href="http://dotstrap.com/"><i class="glyphicon glyphicon-list pull-left"></i><span>Add</span></button> 
	            <button class="btn btn-lg btn-primary" href="http://dotstrap.com/"><i class="glyphicon glyphicon-user pull-left"></i><span>Share to Facebook</span></button> 
				<br>
				<br>

           	</center>
        </div>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script>

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


	        var delayTimer;

	        function doSearch(suggestions){
	        	console.log('called after set time');
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
		              clearTimeout(delayTimer);
		              delayTimer = setTimeout(function(){
		              	doSearch(suggestions);
		              }, 3500);
		              //doSearch(suggestions);
		              //return suggestions;
		          	}
		      	});
	      	}
    	</script>
	</body>
</html>
