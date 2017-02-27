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
 *  Functions for getting the image of an artist
 */

function getArtistImage(artist) {
  $.ajax({
    url: "https://api.spotify.com/v1/search?q=" + encodeURIComponent(artist) + "&type=artist",
    dataType: "json",
    crossDomain: false,
    success: function( response ) {
      console.log( response ); // server response
      getArtistImageFromID(response.artists.items[0].id);
    }
  });
}

function getArtistImageFromID(artist_id) {
  $.ajax({
    url: "https://api.spotify.com/v1/artists/" + artist_id,
    dataType: "json",
    crossDomain: false,
    success: function( response ) {
      console.log( response ); // server response
      console.log("Artist Image: " + response.images[0].url);
    }
  });
}

/**
 *  Functions for getting words from artist
 */

function getWords(artist) {
  $.ajax({
    url: "http://api.musicgraph.com/api/v2/artist/suggest?api_key=88712a31d1b453ddc573d33c455a9888&prefix=" + encodeURIComponent(artist) + "&limit=10",
    dataType: "json",
    success: function( response ) {
      console.log( response ); // server response
      getSongListFromID(response.data[0].id, artist);
    }
  });
}

function getSongListFromID(artist_id, artist) {
  $.ajax({
    url: "http://api.musicgraph.com/api/v2/artist/" + artist_id + "/tracks?api_key=88712a31d1b453ddc573d33c455a9888&limit=10",
    dataType: "json",
    success: function( response ) {
      console.log( response );
      var ret = {words: ""};
      getLyrics(response.data, artist, 0, ret);
    }
  });
}

function getLyrics(tracks, artist, index, ret) {
  $.ajax({
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + encodeURIComponent(tracks[index].title) + "&q_artist=" + encodeURIComponent(artist) + "&apikey=6438fd8c1646f56abfc9297c05b1e582",
    dataType: "jsonp",
    success: function( response ) {
      console.log( response ); // server response
      var str = response.message.body.lyrics.lyrics_body
      str = str.substring(0, str.indexOf("*"));
      ret.words = ret.words + str + " ";
      index++;
      if (index == tracks.length) {
        items = lyricsToWords(ret.words);
        console.log(items);
      } else {
        getLyrics(tracks, artist, index, ret);
      }
    }
  });
}

function lyricsToWords(lyrics) {
  var arr = lyrics.split(/[().,\n\s]/g);
  var dict = {};
  for (i = 0; i < arr.length; i++) {
    var stop = false;
    for (j = 0; j < stop_words.length; j++) {
      if (arr[i].toLowerCase() === stop_words[j]) {
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
