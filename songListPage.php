<!doctype html>
<html> 
 
 <head>
    <title> Song List Title Page </title>
    <link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/songListPageCSS.css"/>
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <!--  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
   -->
  </head>

  <body>
    <div class="container-full">
      <div class ="row" id="songListHeader">
        <div class = "col-xs-12">
      <h1> <center> Song List Title </center></h1>
        </div>
      </div>

     <div class ="row">
      <div class = "col-xs-12">
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
  </body>
</html>
