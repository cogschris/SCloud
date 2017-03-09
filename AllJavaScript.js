//INDEX.PHP *************************

//same as WORDCLOUD.PHP

//APIHANDLER.JS **************************

var stop_words = [
"",
"a",
"about",
"above",
"after",
"again",
"against",
"all",
"am",
"an",
"and",
"any",
"are",
"aren't",
"as",
"at",
"be",
"because",
"been",
"before",
"being",
"below",
"between",
"both",
"but",
"by",
"can't",
"cannot",
"could",
"couldn't",
"did",
"didn't",
"do",
"does",
"doesn't",
"doing",
"don't",
"down",
"during",
"each",
"few",
"for",
"from",
"further",
"had",
"hadn't",
"has",
"hasn't",
"have",
"haven't",
"having",
"he",
"he'd",
"he'll",
"he's",
"her",
"here",
"here's",
"hers",
"herself",
"him",
"himself",
"his",
"how",
"how's",
"i",
"i'd",
"i'll",
"i'm",
"i've",
"if",
"in",
"into",
"is",
"isn't",
"it",
"it's",
"its",
"itself",
"let's",
"me",
"more",
"most",
"mustn't",
"my",
"myself",
"no",
"nor",
"not",
"of",
"off",
"on",
"once",
"only",
"or",
"other",
"ought",
"our",
"ours",
"ourselves",
"out",
"over",
"own",
"same",
"shan't",
"she",
"she'd",
"she'll",
"she's",
"should",
"shouldn't",
"so",
"some",
"such",
"than",
"that",
"that's",
"the",
"their",
"theirs",
"them",
"themselves",
"then",
"there",
"there's",
"these",
"they",
"they'd",
"they'll",
"they're",
"they've",
"this",
"those",
"through",
"to",
"too",
"under",
"until",
"up",
"very",
"was",
"wasn't",
"we",
"we'd",
"we'll",
"we're",
"we've",
"were",
"weren't",
"what",
"what's",
"when",
"when's",
"where",
"where's",
"which",
"while",
"who",
"who's",
"whom",
"why",
"why's",
"with",
"won't",
"would",
"wouldn't",
"you",
"you'd",
"you'll",
"you're",
"you've",
"your",
"yours",
"yourself",
"yourselves"];

/**
 *  Function for getting search suggestions
 */

function getSearchSuggestions(prefix, callback) {
  $.ajax({
    url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(prefix) + "&limit=10",
    dataType: "json",
    success: function( response ) {
      console.log( response ); // server response
      var suggestions = new Array();
      for (var i = 0; i < 9; i++) {
        console.log("Suggestion: " + response.data[i].name);
        suggestions[i] = response.data[i].name;
      }
      callback(suggestions);
    }
  });
}

/**
 *  Functions for getting the top 250 words from given artists
 */

 function getArtistID(artist, callback) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artists) + "&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response ); // server response
       console.log(artists);
       callback(response.data[0].id);
     }
   });
 }

 function getSongListFromID(artist_id, callback) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/" + artist_id + "/tracks?api_key=88712a31d1b453ddc573d33c455a9888&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response );
       callback(response.data);
     }
   });
 }

 function getLyrics(track, artist, callback) {
   $.ajax({
     url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(track.title) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=3174b763187f551ccf94d9d927c8de8b",
     dataType: "jsonp",
     success: function( response ) {
       console.log( response ); // server response
       if (response.message.body.length != 0) {
         var str = response.message.body.lyrics.lyrics_body;
         str = str.substring(0, str.indexOf("*"));
         callback(str);
       }
     }
   });
 }

 function lyricsToWords(lyrics, callback) {
   lyrics = lyrics.toLowerCase();
   var arr = lyrics.split(/[().,;!?\[\]\n\s]/g);
   var dict = {};
   for (i = 0; i < arr.length; i++) {
     var stop = false;
     for (j = 0; j < stop_words.length; j++) {
       if (arr[i] === stop_words[j]) {
         stop = true;
         break;
       }
     }
     if (!stop) {
       if (!(arr[i] in dict)) {
         dict[arr[i]] = 1;
       } else {
         dict[arr[i]]++;
       }
     }
   }
   var items = Object.keys(dict).map(function(key) {
     return [key, dict[key]];
   });
   items.sort(function(first, second) {
     return second[1] - first[1];
   });
   callback(items.slice(0, 250));
 }

 /**
  *  Functions for getting songs from word
  */

  function checkForWord(lyrics, word, callback) {
    lyrics = lyrics.toLowerCase();
    var arr = lyrics.split(/[().,;!?\[\]\n\s]/g);
    var count = 0;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === word) {
        count++;
      }
    }
    callback(count);
  }
 /**
  *  Functions for getting lyrics of an artist in array:
  */

 function lyricsToArray(lyrics, song, callback) {
   lyrics = lyrics.toLowerCase();
   var arr = lyrics.split(/[().,;!?\[\]\n\s]/g);
   var dict = [];
   dict.push(song);
   for (i = 0; i < arr.length; i++) {
     var stop = false;
     for (j = 0; j < stop_words.length; j++) {
       if (arr[i] === stop_words[j]) {
         stop = true;
         break;
       }
     }
     if (!stop) {
       dict.push(arr[i]);
     }
   }
   callback(dict);
 }

/**
 *  Functions for setting the lyrics of the lyrics page:
 */

function setLyrics(track, artist, word, callback) {
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(track) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=3174b763187f551ccf94d9d927c8de8b",
    dataType: "jsonp",
    success: function( response ) {
      console.log( response ); // server response
      if (response.message.body.length != 0) {
        var str = response.message.body.lyrics.lyrics_body;
        var lyrics = str.substring(0, str.indexOf("*"));

        var newString = lyrics.split(word.trim()).join('<span class="highlight">' + word.trim() + '</span>');
        // var replace = word;
        // var re = new RegExp(replace, "gi");
        // lyrics.replace(re, '<span class="highlight">' + word + '</span>');
        console.log("word:" + word);
        console.log(newString);
        //$("#lyrics").append(newString);
        callback(newString);
        //setLyricsFromID(response.message.body.track_list[0].track.track_id);
      }
    }
  });
}

/**
 *  Functions for making the word cloud:
 */

function createWordCloud(arr, callback) {

    //Different font sizes
    var fontSizes = [ "10px", "20px", "30px", "40px", "50px", "60px", "70px", "80px", "90px", "100px"];
    var big_freq = arr[0][1]; //the number of the biggest frequency goes here
    arr = shuffle(arr);
    var returnVal = new Array();

    for(count = 0; count < arr.length; count++) {//Change this to iterate through the loop

        var freq = arr[count][1]; //frequency of word you working on

        var t = document.createTextNode(arr[count][0] + " "); //creating the text node

        var span = document.createElement('span');//creating a span

        var calc = freq/big_freq;
        if (calc == 1) {
          span.style.fontSize = fontSizes[9];
        }
        else if (calc < 1 && calc >= .875) {
            span.style.fontSize = fontSizes[8];
        }
        else if (calc < .875 && calc >= .75) {
            span.style.fontSize = fontSizes[7];
        }
        else if (calc < .75 && calc >= .625) {
            span.style.fontSize = fontSizes[6];
        }
        else if (calc < .625 && calc >= .50) {
            span.style.fontSize = fontSizes[5];
        }
        else if (calc < .50 && calc >= .375) {
            span.style.fontSize = fontSizes[4];
        }
        else if (calc < .375 && calc >= .25) {
            span.style.fontSize = fontSizes[3];
        }
        else if (calc < .25 && calc >= .125) {
            span.style.fontSize = fontSizes[2];
        }
        else if (calc < .125 && calc >= .0) {
            span.style.fontSize = fontSizes[1];
        }

        span.style.color = getRandomColor(); //changing color
        span.appendChild(t); //adding text to span
        span.onclick = function() {
          var word = this.innerHTML;

          var request = $.ajax({
            url: "SetWord.php",
            type: "POST",
            data: {word : word},
            dataType: "text"
          });

          request.done(function(msg) {
            console.log(msg);
            window.location.href = "songListPage.php";
          });
        }

        //console.log(document.getElementById("something"));
        //document.getElementById("something").appendChild(span);//adding span to element
        returnVal.push(span);
    }
    return returnVal;
}


//LYRICSPAGE.PHP **********************************

//SONGLISTPAGE.PHP *********************

function songSelected(word, callback) {
  var index = word.indexOf('(');
  var song = word.substring(0, index);
  song = song.trim();
  index = word.indexOf('-');
  var artist = word.substring(index + 1);
  artist = artist.trim()
  callback(artist + " " + song);
}

//WORDCLOUD.PHP *******************
