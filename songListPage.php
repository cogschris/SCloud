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

function getWord() {
  if (!is_null($_SESSION['currentWord'])) {
    return $_SESSION['currentWord'];
  } else {
    return 'false';
  }

}

?>
<!doctype html>
<html> 
 
 <head>
    <title><?php echo (getWord()) ?></title>
    <link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/songListPageCSS.css"/>
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="APIHandler.js"></script>
  </head>

  <body>
    <div class="container-full">
      <div class ="row">
        <div class = "col-xs-12">
      <h1 id="songListHeader"><?php echo (getWord()) ?></h1>
        </div>
      </div>

     <div class ="row">
      <div class = "col-xs-8 col-xs-offset-2">
        <table class="table table-striped" id="songListTable">
       
          <thead>
            <tr>
              <th> Song (Word Frequency) </th>
            </tr>
          </thead>

          <tbody id="songListTableBody">
            <!-- <tr>
              <td> song 1 (14) </td>
            </tr>
            <tr>
              <td>song 2 (12) </td>
            </tr>
            <tr>
              <td>song 3 (9) </td>
            </tr> -->
          </tbody>
        </table>
      </div>
      </div>
      <div class = "row" id="buttonrow">
        <button class = "btn btn-lg" id="backToWCButton">Back to Word Cloud</button>
      </div>
    </div>
    <script type="text/javascript">
      $(document).ready(function () {

        generateList();

        function generateList() {

          var request = $.ajax({
            url: "GetArtists.php",
            type: "GET",
            dataType: "text"
          });

          request.done(function(msg) {
            artists_arr = JSON.parse(msg);
            // console.log("Are you an array? " + artists_arr[0]);
            //console.log(artists_arr);
            
            var request2 = $.ajax({
              url: "GetWord.php",
              type: "GET",
              dataType: "text"
            });
            request2.done(function(msg2) {
              // console.log(msg2.trim());
              getSongsFromWord(artists_arr, msg2.trim());
            });
          });
        }

      })


      $('#backToWCButton').click(function() {
        window.location.href = "wordcloud.php";
      })

      function songSelected(word) {
        var index = word.indexOf('(');
        var song = word.substring(0, index);
        song = song.trim();
        index = word.indexOf('-');
        var artist = word.substring(index + 1);
        artist = artist.trim()
        console.log(artist + " " + song);

        var request = $.ajax({
          url: "SetCurrentSongAndArtist.php",
          type: "POST",
          data: {artist : artist, song : song},
          dataType: "text"
        });

        request.done(function(msg) {
          window.location.href = "lyricsPage.php";
        });

      }
    </script>
  </body>
</html>
