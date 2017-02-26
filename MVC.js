// Event Class
function Event(sender) {
  this._sender = sender;
  this._listeners = [];
}

Event.prototype = {
  attach: function(listener) {
    this._listeners.push(listener);
  },

  notify: function(args) {
    var i;

    for (i = 0; i < this._listeners.length; i+=1) {
      this._listeners[i](this._sender, args);
    }
  }
};

//Word Class - Model
function Word(word, wordCloud) {
  this._word = word;
  this._wordCloud = wordCloud;
  var freqInCloud;
  var freqInSongMap = new Map();
}

Word.prototype = {

  addSong: function() {

  },

  getFreqInCloud: function() {

  },

  getFreqInSong: function() {

  },

  updateFreqInCloud: function() {

  },

  updateFreqInSong: function() {

  }
};

//WordCloud Class - Model
function WordCloud() {
  this._artists = [];
  this._words = [];

  this.wordAdded = new Event(this);
  this.artistAdded = new Event(this);
}

WordCloud.prototype = {

  addWord: function(word) {
    this._words.push(word);
    this.wordAdded.notify({
      word: word;
    });
  },

  addArtist: function() {
    artistAdded: function(artist) {
      this._artists.push(artist);
      this.artistAdded.notify({
        artist: artist;
      });
    }
  },

  getWords: function() {
    return [].concat(this._words);
  },

  getArtists: function() {
    return [].concat(this._artists);
  }

};

// WordCloudView Class - View
function WordCloudView(wordCloud) {
  this._wordCloud = 
}
