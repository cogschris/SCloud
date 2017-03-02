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

function getSearchSuggestions(prefix) {
  $.ajax({
    url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(prefix) + "&limit=10",
    dataType: "json",
    success: function( response ) {
      console.log( response ); // server response
      var suggestions = new Array();
      for (var i = 0; i < 9; i++) {
        console.log("Suggestion: " + response.data[i].name);
        arr[i] = response.data[i].name;
      }
      return suggestions;
    }
  });
}

/**
 *  Function for getting the image of an artist
 */

function getArtistImage(artist) {
  $.ajax({
    url: "https://api.spotify.com/v1/search?q=" + encodeURIComponent(artist) + "&type=artist",
    dataType: "json",
    crossDomain: false,
    success: function( response ) {
      console.log( response ); // server response
      console.log(response.artists.items[0].images[0].url);
    }
  });
}

/**
 *  Functions for getting the top 250 words from given artists
 */

 function getWords(artists) {
   var ret = {words: ""};
   console.log(artists);
   getArtistID(artists, 0, ret);
 }

 function getArtistID(artists, index, ret) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artists[index]) + "&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response ); // server response
       console.log(artists);
       getSongListFromID(response.data[0].id, artists, index, ret);
     }
   });
 }

 function getSongListFromID(artist_id, artists, index, ret) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/" + artist_id + "/tracks?api_key=88712a31d1b453ddc573d33c455a9888&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response );
       getLyrics(response.data, artists, index, 0, ret);
     }
   });
 }

 function getLyrics(tracks, artists, artist_index, song_index, ret) {
   $.ajax({
     url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(tracks[song_index].title) + "&q_artist=" + encodeURIComponent(artists[artist_index]) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
     dataType: "jsonp",
     success: function( response ) {
       console.log( response ); // server response
       if (response.message.body.length != 0) {
         var str = response.message.body.lyrics.lyrics_body;
         str = str.substring(0, str.indexOf("*"));
         ret.words = ret.words + str + " ";
       }
       song_index++;
       if (song_index == tracks.length) {
         artist_index++;
         if (artist_index < artists.length) {
           getArtistID(artists, artist_index, ret);
         } else {
           var items = lyricsToWords(ret.words);
           console.log(items);
           myFunction(items);
         }
       } else {
         getLyrics(tracks, artists, artist_index, song_index, ret);
       }
     }
   });
 }

 function lyricsToWords(lyrics) {
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
   return items.slice(0, 250);
 }

 /**
  *  Functions for getting songs from word
  */

  function getSongsFromWord(artists, word) {
    var ret = {songs: []};
    return getArtistID3(artists, 0, ret, word);
  }

  function getArtistID3(artists, index, ret, word) {
    $.ajax({
      url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artists[index]) + "&limit=10",
      dataType: "json",
      success: function( response ) {
        console.log( response ); // server response
        return getSongListFromID3(response.data[0].id, artists, index, ret, word);
      }
    });
  }

  function getSongListFromID3(artist_id, artists, index, ret, word) {
    $.ajax({
      url: "http://api.musicgraph.com/api/v2/artist/" + artist_id + "/tracks?api_key=88712a31d1b453ddc573d33c455a9888&limit=10",
      dataType: "json",
      success: function( response ) {
        console.log( response );
        return getLyrics3(response.data, artists, index, 0, ret, word);
      }
    });
  }

  function getLyrics3(tracks, artists, artist_index, song_index, ret, word) {
    $.ajax({
      url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(tracks[song_index].title) + "&q_artist=" + encodeURIComponent(artists[artist_index]) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
      dataType: "jsonp",
      success: function( response ) {
        console.log( response ); // server response
        var count;
        if (response.message.body.length != 0) {
          var str = response.message.body.lyrics.lyrics_body;
          str = str.substring(0, str.indexOf("*"));
          count = checkForWord(str, word);
          if (count > 0) {
            var song_title = tracks[song_index].title;
            var arr = [song_title, count, artists[artist_index]];
            ret.songs.push(arr);
          }
        }
        song_index++;
        if (song_index == tracks.length) {
          artist_index++;
          if (artist_index < artists.length) {
            return getArtistID3(artists, artist_index, ret, word);
          } else {
            console.log(ret.songs);
            return ret.songs;
          }
        } else {
          return getLyrics3(tracks, artists, artist_index, song_index, ret, word);
        }
      }
    });
  }

  function checkForWord(lyrics, word) {
    lyrics = lyrics.toLowerCase();
    var arr = lyrics.split(/[().,;!?\[\]\n\s]/g);
    var count = 0;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === word) {
        count++;
      }
    }
    return count;
  }
 /**
  *  Functions for getting lyrics of an artist in array:
  */

 function getLyricsInArray(artist, song_number) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artist) + "&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response ); // server response
       getSongListFromID2(response.data[0].id, artist, song_number);
     }
   });
 }

 function getSongListFromID2(artist_id, artist, song_number) {
   $.ajax({
     url: "http://api.musicgraph.com/api/v2/artist/" + artist_id + "/tracks?api_key=88712a31d1b453ddc573d33c455a9888&limit=10",
     dataType: "json",
     success: function( response ) {
       console.log( response );
       getLyrics2(response.data, artist, song_number);
     }
   });
 }

 function getLyrics2(tracks, artist, song_number) {
   $.ajax({
     url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(tracks[song_number].title) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
     dataType: "jsonp",
     success: function( response ) {
       console.log( response ); // server response
       if (response.message.body.length != 0) {
         var str = response.message.body.lyrics.lyrics_body;
         str = str.substring(0, str.indexOf("*"));
         console.log(lyricsToArray(str, tracks[song_number].title));
       }
     }
   });
 }

 function lyricsToArray(lyrics, song) {
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
   return dict;
 }

/**
 *  Functions for setting the lyrics of the lyrics page:
 */

function setLyrics(track, artist) {
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(track) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
    dataType: "jsonp",
    success: function( response ) {
      console.log( response ); // server response
      var str = response.message.body.lyrics.lyrics_body;
      $("#lyrics").append(str.substring(0, str.indexOf("*")));
      //setLyricsFromID(response.message.body.track_list[0].track.track_id);
    }
  });
}

/**
 *  Functions for getting the frequency of a word in a song:
 */

function getFrequency(track, artist, word) {
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(track) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
    dataType: "jsonp",
    success: function( response ) {
      console.log( response ); // server response
      var lyrics = response.message.body.lyrics.lyrics_body;
      lyrics = lyrics.substring(0, lyrics.indexOf("*"));
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
      return dict[word];
    }
  });
}

/**
 *  Functions for making the word cloud:
 */

function myFunction(arr) {

    //Different font sizes
    var fontSizes = [ "10px", "20px", "30px", "40px", "50px", "60px", "70px", "80px", "90px", "100px"];

    var big_freq = arr[0][1]; //the number of the biggest frequency goes here

    arr = shuffle(arr);


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
        //add(span.id);
          var ta = document.createTextNode(this.innerHTML);///////////////////////////THis is where you get the word!!!!
        }

        console.log(document.getElementById("something"));
        document.getElementById("something").appendChild(span);//adding span to element
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 *  Function for shuffling word cloud array:
 */

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
