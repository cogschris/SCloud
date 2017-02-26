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

  var _this = this;
  // Gen freqInCloud and freqInSongMap
  // Need to add songs via API calls

}

Word.prototype = {

  addSong: function() {
    // Add song and freq to map

  },

  getFreqInCloud: function() {
    // Return freqInCloud

  },

  getFreqInSong: function() {
    // Return freqInSong

  },

  updateFreqInCloud: function() {
    // Calculate and set freqInCloud
  },

  updateFreqInSong: function() {
    // Calculate and set freqInSong

  }
};

//WordCloud Class - Model
function WordCloud() {
  this._artists = [];
  this._words = [];

  this.artistAdded = new Event(this);
}

WordCloud.prototype = {

  addWord: function(word) {
    this._words.push(word);
  },

  addArtist: function() {
    this._artists.push(artist);
    this.artistAdded.notify({
      artist: artist
    });
  },

  getWords: function() {
    return [].concat(this._words);
  },

  getArtists: function() {
    return [].concat(this._artists);
  }

};

// WordCloudView Class - View
function WordCloudView(wordCloud, elements) {
  this._wordCloud = wordCloud;
  this._elements = elements;

  this.wordClicked = new Event(this);
  this.searchButtonClicked = new Event(this);
  this.addButtonClicked = new Event(this);
  this.shareButtonClicked = new Event(this);

  var _this = this;

  // Attach WordCloud model listeners
  this._wordCloud.artistAdded.attach(function() {
    _this.rebuildCloud();
  });

  // Attach listeners to HTML controls
  this._elements.searchButton.click(function() {
    var item = window.prompt('Add item:', '');
    _this.searchButtonClicked.notify();
  });
  this._elements.addButton.click(function() {
    _this.addButtonClicked.notify();
  });
  this._elements.shareButton.click(function() {
    _this.shareButtonClicked.notify();
  });
}

WordCloudView.prototype = {
  show: function() {
    this.rebuildCloud();
  },

  rebuildCloud: function() {
    // build the cloud...
  }
};

// WordCloudController - Controller
function WordCloudController(wordCloud, wordCloudView) {
  this._wordCloud = wordCloud;
  this._wordCloudView = wordCloudView;

  var _this = this;

  this._wordCloudView.wordClicked.attach(function() {
    // Does this go in here or in Page Manager
  });

  this._wordCloudView.searchButtonClicked.attach(function() {
    // Generate new cloud (clear cloud) and add artist
    _this.clearCloud();
    _this.addArtist();
  });

  this._wordCloudView.addButtonClicked.attach(function() {
    // Add artist to cloud
    _this.addArtist();
  });

  this._wordCloudView.shareButtonClicked.attach(function () {
    // Does this go in here or Page Manager? API call to FB?
  });
}

WordCloudController.prototype = {
  addArtist: function() {
    // Add artist and words to model
    var artistName = this._elements.textField.value;
    if (artistName) {
      this._wordCloud.addArtist(artistName);
    }
  },

  clearCloud: function() {
      this._wordCloud.clearCloud();
  }

};
