<?php
  require_once('Word.php');
  session_start();

  if(!isset($_SESSION['favorites'])) { 
  	$_SESSION['favorites'] = []; 
  }

  if(!isset($_SESSION['words'])) { 
  	$_SESSION['words'] = []; 
  }

  function is_favorite($id) {
  	if (in_array($id, $_SESSION['favorites'])) {
  		return true;
  	} else {
  		return false;
  	}
  }

?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Asynchronous Button</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <style>
      #blog-posts {
        width: 700px;
      }
      .blog-post {
        border: 1px solid black;
        margin: 10px 10px 20px 10px;
        padding: 6px 10px;
      }

      button.favorite-button {
        background: #0000FF;
        color: white;
        text-align: center;
        width: 70px;
      }
      button.favorite-button:hover {
        background: #000099;
      }
      button.favorite-button {
      	display: inline;
      }
      .favorite button.favorite-button {
      	display: none;
      }

      button.unfavorite-button {
        background: #0000FF;
        color: white;
        text-align: center;
        width: 90px;
      }
      button.unfavorite-button:hover {
        background: #000099;
      }
      button.unfavorite-button {
      	display: none;
      }
      .favorite button.unfavorite-button {
      	display: inline;
      }

      .favorite-heart {
      	color: red;
      	font-size: 2em;
      	float: right;
      	display: none;
      }

      .favorite .favorite-heart {
      	display: block;
      }

    </style>
  </head>
  <body>
  	<!-- <?php echo join(', ', $_SESSION['favorites']); ?> -->
    <div id="blog-posts">
      <div id="blog-post-101" class="blog-post <?php if (is_favorite(101)) { echo 'favorite'; } ?>">
      <span class="favorite-heart">&hearts;</span>
        <h3>Blog Post 101</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque nunc malesuada mauris fermentum commodo. Integer non pellentesque augue, vitae pellentesque tortor. Ut gravida ullamcorper dolor, ac fringilla mauris interdum id. Nulla porta egestas nisi, et eleifend nisl tincidunt suscipit. Suspendisse massa ex, fringilla quis orci a, rhoncus porta nulla. Aliquam diam velit, bibendum sit amet suscipit eget, mollis in purus. Sed mattis ultricies scelerisque. Integer ligula magna, feugiat non purus eget, pharetra volutpat orci. Duis gravida neque erat, nec venenatis dui dictum vel. Maecenas molestie tortor nec justo porttitor, in sagittis libero consequat. Maecenas finibus porttitor nisl vitae tincidunt.</p>
        <button class="favorite-button">Favorite</button>
        <button class="unfavorite-button">Unfavorite</button>
      </div>
      <div id="blog-post-102" class="blog-post <?php if (is_favorite(102)) { echo 'favorite'; } ?>">
      <span class="favorite-heart">&hearts;</span>
        <h3>Blog Post 102</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque nunc malesuada mauris fermentum commodo. Integer non pellentesque augue, vitae pellentesque tortor. Ut gravida ullamcorper dolor, ac fringilla mauris interdum id. Nulla porta egestas nisi, et eleifend nisl tincidunt suscipit. Suspendisse massa ex, fringilla quis orci a, rhoncus porta nulla. Aliquam diam velit, bibendum sit amet suscipit eget, mollis in purus. Sed mattis ultricies scelerisque. Integer ligula magna, feugiat non purus eget, pharetra volutpat orci. Duis gravida neque erat, nec venenatis dui dictum vel. Maecenas molestie tortor nec justo porttitor, in sagittis libero consequat. Maecenas finibus porttitor nisl vitae tincidunt.</p>
        <button class="favorite-button">Favorite</button>
        <button class="unfavorite-button">Unfavorite</button>
      </div>
      <div id="blog-post-103" class="blog-post <?php if (is_favorite(103)) { echo 'favorite'; } ?>">
      <span class="favorite-heart">&hearts;</span>
        <h3>Blog Post 103</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque nunc malesuada mauris fermentum commodo. Integer non pellentesque augue, vitae pellentesque tortor. Ut gravida ullamcorper dolor, ac fringilla mauris interdum id. Nulla porta egestas nisi, et eleifend nisl tincidunt suscipit. Suspendisse massa ex, fringilla quis orci a, rhoncus porta nulla. Aliquam diam velit, bibendum sit amet suscipit eget, mollis in purus. Sed mattis ultricies scelerisque. Integer ligula magna, feugiat non purus eget, pharetra volutpat orci. Duis gravida neque erat, nec venenatis dui dictum vel. Maecenas molestie tortor nec justo porttitor, in sagittis libero consequat. Maecenas finibus porttitor nisl vitae tincidunt.</p>
        <button class="favorite-button">Favorite</button>
        <button class="unfavorite-button">Unfavorite</button>
      </div>
    </div>

    <script type="text/javascript">

    	$(".favorite-button").click(function () {

    		var parent = this.parentElement;

    		var request = $.ajax({
    			url: "favorite.php",
    			type: "POST",
    			data: {id : parent.id},
    			dataType: "text"
    		});

    		request.done(function(msg) {
    			console.log("Result: " + msg);

    			if (msg == 'true') {
    				parent.classList.add("favorite");
    			}

    		});

    	})

    	$(".unfavorite-button").click(function () {

    		var parent = this.parentElement;

    		var request = $.ajax({
    			url: "unfavorite.php",
    			type: "POST",
    			data: {id : parent.id},
    			dataType: "text"
    		});

    		request.done(function(msg) {
    			console.log("Result: " + msg);

    			if (msg == 'true') {
    				parent.classList.remove("favorite");
    			}

    		});

    	})
    		
    	// function favorite() {

    	// 	var parent = this.parentElement;
    	// 	console.log(parent.id);

    	// 	var request = $.ajax({
    	// 		url: "favorite.php",
    	// 		type: "POST",
    	// 		data: {id : parent.id},
    	// 		dataType: "text"
    	// 	});

    	// 	request.done(function(msg) {
    	// 		console.log("Result: " + msg);
    	// 	});

    	// }

    	// var buttons = document.getElementsByClassName("favorite-button");
    	// for (i = 0; i < buttons.length; i++) {
    	// 	buttons.item(i).addEventListener("click", favorite);
    	// }

    </script>

  </body>
</html>