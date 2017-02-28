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


<div id=testDiv>
	


</div>


<form>
  <div class="form-group">

    <button id=searchButton type="Search" class="btn btn-primary"> Search </button>

   <input class="form-control" id="searchInput" aria-describedby="emailHelp" placeholder="Enter artist">
    <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
  </div>

  <button onclick = "window.location.href='songListPage.php'" id=testButton type="search" class="btn pull-right" style ="position: absolute; right: 0;"> Search </button>
<!--   <script type = "text/javascript">
  	document.getElementbyID("testButton").onClick = function () {
  		location.href = "songListPage.php";
  	};
  	</script> -->


</form>



</body>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>	

	<script type="text/javascript">
		
		$('#searchButton').click(function(event){


		})


	</script>






</html>
