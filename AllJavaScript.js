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
     url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artist) + "&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response ); // server response
       console.log(artist);
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
     url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(track) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=3174b763187f551ccf94d9d927c8de8b",
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
