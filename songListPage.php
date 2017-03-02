<!doctype html>
<html> 
 
 <head>
    <title> Song List Title Page </title>
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
      <h1 id="songListHeader"></h1>
        </div>
      </div>

     <div class ="row">
      <div class = "col-xs-8 col-xs-offset-2">
        <table class="table table-striped" id="songListTable">
       
          <thead>
            <tr>
              <th> Song (frequency of word) </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> song 1 (14) </td>
            </tr>
            <tr>
              <td>song 2 (12) </td>
            </tr>
            <tr>
              <td>song 3 (9) </td>
            </tr>
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
    </script>
  </body>
</html>
