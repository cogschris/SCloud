$(document).ready(function () {
  var timeout = 1000;

  QUnit.test("Test getSearchSuggestions()", function( assert ) {
    function runTest(input, expected) {
      assert.expect( 3 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      getSearchSuggestions(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.deepEqual( output, expected);
        done();
      }, timeout);
    }
    runTest("jus", ["Justin Bieber","Justin Timberlake","Justin Moore","Justin Quiles","Justice","Justine Skye","Justin Nozuka","Justice Crew","Justin Hurwitz"]);
    runTest("dra", ["Drake", "Dragonette", "Drake White", "Draco Rosa", "Drapht", "Drag-On", "Drake Bell", "Dragonfly", "Dragonland"]);
    runTest("sha", ["Shawn Mendes", "Shakira", "Shaggy", "Shania Twain", "Shaka Loveless", "Shawn Hook", "Sharon Van Etten", "Sharon Jones & the Dap-Kings", "Shakka"]);

  });

  QUnit.test("Test getArtistID()", function( assert ){
    function testGetArtistID(input, expected){
      assert.expect(5);
      var done = assert.async();
      var output;
      function callback(returnVal){
        output = returnVal;
      }
      getArtistID(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.equal(output, expected);
        done();
      },timeout);
    }

    testGetArtistID("Justin Bieber", "680687b6-94f6-c447-fe5b-4533fb937de6");
    testGetArtistID("Shakira", "245baeb0-fbf3-d183-2d0c-c5c04af20568");
    testGetArtistID("Pitbull", "3aec318a-7241-43e4-17c1-38a0eceafbbb");
    testGetArtistID("Drake", "f060a78f-a6b5-11e0-b446-00251188dd67");
    testGetArtistID("Kanye West", "a7afde36-1ee9-4c0e-9b32-e546706d6a09");

  });

  QUnit.test("Test getSongListFromID()", function (assert){
    function testGetSongListFromID(input, expected){
      assert.expect(2);
      var done = assert.async();
      var output;
      function callback(returnVal){
        output = returnVal;
      }
      getSongListFromID(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.deepEqual(output, expected);
        done();
      }, timeout);
    }

    testGetSongListFromID("a7afde36-1ee9-4c0e-9b32-e546706d6a09", [
    {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      entity_type: "track",
      track_album_id: "62ec8cc6-8d3b-41e8-80c8-712f9a2c9495",
      title: "Famous",
      artist_name: "Kanye West",
      isrc: "USUM71603020",
      duration: 196,
      album_title: "Famous",
      original_release_year: 2016,
      id: "594b254d-8773-413a-8f76-d0e409b623d7"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      entity_type: "track",
      title: "Can't Tell Me",
      popularity: 0,
      artist_name: "Kanye West",
      isrc: "SEYOK1607799",
      duration: 247,
      album_title: "Back2Back Playlist",
      track_album_id: "7ea56fc5-219e-4bdf-a651-c92b72ef39c3",
      original_release_year: 2016,
      id: "e9d3d1d7-5fd1-443f-bcaa-482e29449d8a"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      producer: [
      {
      name: "Kanye West",
      id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09"
      },
      {
      id: "a335d121-2b24-4c3c-97ce-bc5c9c725ffe"
      },
      {
      name: "Mike Dean",
      id: "fc06bacb-4d0c-32d0-4106-a10dde41a075"
      },
      {
      name: "Anthony Kilhoffer",
      id: "1e19f310-7305-e068-8d42-871a28ecc5b0"
      }
      ],
      entity_type: "track",
      track_album_id: "bb9dc390-ccd5-460a-aa6b-29e82f040af2",
      title: "Fade",
      artist_name: "Kanye West",
      isrc: "USUM71605435",
      duration: 194,
      album_title: "Fade",
      original_release_year: 2016,
      id: "e28eaea0-3818-40e9-9276-62081ff0d9d6"
      },
      {
      writer: [
      {
      name: "Ray Charles",
      id: "dc78ddd1-f2f4-1b29-f7db-7627018688e7"
      },
      {
      name: "Kanye West",
      id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09"
      },
      {
      name: "Renald Richard",
      id: "abf64663-9acf-4f92-1529-087c2635d4c0"
      }
      ],
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      producer: [
      {
      name: "Kanye West",
      id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09"
      },
      {
      name: "Jon Brion",
      id: "852c86af-ddde-b9e8-6a60-54c0e804736f"
      }
      ],
      entity_type: "track",
      title: "Gold Digger",
      popularity: 0.257323,
      artist_name: "Kanye West",
      isrc: "SEYOK1605295",
      duration: 207,
      album_title: "The GangUP",
      track_album_id: "1ad3ca5f-09f2-4673-a8e6-6a3309a70906",
      original_release_year: 2016,
      id: "a68d9e1b-092f-4292-9915-b5db4d2710e9",
      track_youtube_id: "6vwNcNOTVzY"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      entity_type: "track",
      track_album_id: "94f4a4c8-793e-4871-8aab-633fa77fddc0",
      title: "Champions",
      artist_name: "Kanye West",
      isrc: "USUM71605463",
      duration: 334,
      album_title: "Champions",
      original_release_year: 2016,
      id: "f0d42227-0458-41ce-a740-1f22ec67e457"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2016,
      producer: [
      {
      name: "Kanye West",
      id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09"
      },
      {
      name: "DJ Toomp",
      id: "07f7332c-f79d-8f22-60d8-252e0d811348"
      }
      ],
      entity_type: "track",
      title: "Cant Tell Me Nothing",
      popularity: 0.458811,
      artist_name: "Kanye West",
      composer: [
      {
      name: "Kanye West",
      id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09"
      },
      {
      name: "Aldrin Davis",
      id: "8b07a05b-f117-55af-7aec-2747560ce2a4"
      }
      ],
      isrc: "SEYOK1605296",
      duration: 247,
      album_title: "The GangUP",
      track_album_id: "1ad3ca5f-09f2-4673-a8e6-6a3309a70906",
      original_release_year: 2016,
      id: "86589fc9-2563-43fa-9b3c-c4c500445562",
      track_youtube_id: "E58qLXBfLrs"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2015,
      entity_type: "track",
      track_musicbrainz_id: "85ff1a4d-e1e1-452c-b554-64e56a3f6e27",
      title: "Only One",
      artist_name: "Kanye West",
      track_index: "15",
      duration: 279,
      original_release_year: 2015,
      id: "cb504ed6-a4df-4e7a-b691-824577583a0b"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2015,
      entity_type: "track",
      track_musicbrainz_id: "a9566bf2-bba5-44f4-bc1b-5e464df60094",
      title: "Only One",
      artist_name: "Kanye West",
      track_index: "27",
      duration: 282,
      original_release_year: 2015,
      id: "a18206cb-4571-4c74-9f2c-b29b2741fceb"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2015,
      entity_type: "track",
      title: "Put On",
      popularity: 0,
      artist_name: "Kanye West",
      isrc: "USUM70815008",
      duration: 327,
      album_title: "20 #1's: Modern Hip-Hop",
      track_album_id: "fa9546da-35d7-4c28-90df-455a9f24f69b",
      original_release_year: 2015,
      id: "4e18a561-7abb-4264-a023-670546fb40b0"
      },
      {
      track_artist_id: "a7afde36-1ee9-4c0e-9b32-e546706d6a09",
      release_year: 2015,
      entity_type: "track",
      title: "All Day featuring Theophilus London, Allan Kingdom, Paul McCartney",
      artist_name: "Kanye West",
      isrc: "USUM71502482",
      album_title: "All Day",
      original_release_year: 2015,
      id: "323aafa8-1090-4732-991b-03d68f227967"
    }]);

    testGetSongListFromID("680687b6-94f6-c447-fe5b-4533fb937de6",  [
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      title: "Company",
      track_album_id: "dbf5459d-7387-4332-84e0-7302a816a55b",
      entity_type: "track",
      artist_name: "Justin Bieber",
      album_title: "R&B + Chill",
      duration: 209,
      isrc: "USUM71516762",
      original_release_year: 2016,
      id: "54dba3c3-01b0-4a35-a3e4-86a1ddf08a51"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Benny Blanco",
      id: "dd53ee40-a033-162f-b626-54a3ba7a68a8"
      }
      ],
      entity_type: "track",
      track_album_id: "a84b1198-6779-4cd3-94ab-052fb7d5c373",
      title: "Love Yourself",
      artist_name: "Justin Bieber",
      album_title: "Just Chillin' - Ministry of Sound",
      duration: 233,
      isrc: "USUM71516761",
      writer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Benny Blanco",
      id: "dd53ee40-a033-162f-b626-54a3ba7a68a8"
      },
      {
      name: "Ed Sheeran",
      id: "97dbc840-8900-1b06-0942-d5f170c02045"
      }
      ],
      original_release_year: 2016,
      id: "6314a2d2-12c4-431e-a604-d202637bdce8"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Skrillex",
      id: "ae8256b8-7b47-66bb-968d-cfeb17bfa170"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      id: "04f2c1b4-06c9-47f3-8eb8-3324739de917"
      }
      ],
      entity_type: "track",
      track_album_id: "ca9b285e-3c7e-4b01-8866-b2c7ad7ccb3b",
      title: "Sorry",
      artist_name: "Justin Bieber",
      album_title: "The Mix - Ministry of Sound",
      duration: 200,
      isrc: "USUM71516760",
      writer: [
      {
      name: "Julia Michaels",
      id: "25bfffce-4a8d-0466-04f9-7d71af65de08"
      },
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Sonny Moore",
      id: "9f969030-c2f0-8a98-8929-1eef85713a8b"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      name: "Justin Tranter",
      id: "37ffb248-5949-4f39-92f1-250b46a0edf3"
      },
      {
      name: "Michael Tucker",
      id: "eda8a36d-e973-f5a4-80ca-debc2a16390f"
      }
      ],
      original_release_year: 2016,
      id: "b9076aa5-a05f-4d54-b72e-ee395abfac5b"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      id: "590f6b27-432e-4fb0-a864-15b06ef7c150"
      }
      ],
      entity_type: "track",
      track_album_id: "15f948c1-27ca-47bf-b81f-25a2cf2e8143",
      title: "What Do You Mean?",
      artist_name: "Justin Bieber",
      album_title: "Classic No.1s",
      duration: 203,
      isrc: "USUM71511919",
      writer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Mason Levy",
      id: "158b85c4-6ee7-c288-9f96-b270695e7c50"
      },
      {
      name: "Jason Boyd",
      id: "476facc4-4b4c-4a72-bfcf-60fd7cb20d1c"
      }
      ],
      original_release_year: 2016,
      id: "78310f12-6802-45a5-8092-32a912fb7393"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Skrillex",
      id: "ae8256b8-7b47-66bb-968d-cfeb17bfa170"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      id: "04f2c1b4-06c9-47f3-8eb8-3324739de917"
      }
      ],
      entity_type: "track",
      track_album_id: "0b43f398-e56f-4f06-8bb6-93971e940012",
      title: "Sorry",
      artist_name: "Justin Bieber",
      album_title: "Now That's What I Call Dance Hits",
      duration: 201,
      isrc: "USUM71516760",
      writer: [
      {
      name: "Julia Michaels",
      id: "25bfffce-4a8d-0466-04f9-7d71af65de08"
      },
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Sonny Moore",
      id: "9f969030-c2f0-8a98-8929-1eef85713a8b"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      name: "Justin Tranter",
      id: "37ffb248-5949-4f39-92f1-250b46a0edf3"
      },
      {
      name: "Michael Tucker",
      id: "eda8a36d-e973-f5a4-80ca-debc2a16390f"
      }
      ],
      original_release_year: 2016,
      id: "ed981bfc-7c8f-47ee-9135-7a3e07113072"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Skrillex",
      id: "ae8256b8-7b47-66bb-968d-cfeb17bfa170"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      id: "04f2c1b4-06c9-47f3-8eb8-3324739de917"
      }
      ],
      entity_type: "track",
      track_album_id: "3174d898-fd58-4979-a3e5-d77e954e219b",
      title: "Sorry",
      artist_name: "Justin Bieber",
      album_title: "Now That's What I Call Music! 93",
      duration: 201,
      isrc: "USUM71516760",
      writer: [
      {
      name: "Julia Michaels",
      id: "25bfffce-4a8d-0466-04f9-7d71af65de08"
      },
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Sonny Moore",
      id: "9f969030-c2f0-8a98-8929-1eef85713a8b"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      name: "Justin Tranter",
      id: "37ffb248-5949-4f39-92f1-250b46a0edf3"
      },
      {
      name: "Michael Tucker",
      id: "eda8a36d-e973-f5a4-80ca-debc2a16390f"
      }
      ],
      original_release_year: 2016,
      id: "077dca87-7cd6-45ff-b4d7-3cf58459acd0"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Skrillex",
      id: "ae8256b8-7b47-66bb-968d-cfeb17bfa170"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      id: "04f2c1b4-06c9-47f3-8eb8-3324739de917"
      }
      ],
      entity_type: "track",
      track_album_id: "a028f439-11e2-4e9b-8540-faaa9609c5a6",
      title: "Sorry",
      artist_name: "Justin Bieber",
      album_title: "NOW That's What I Call Drivetime",
      duration: 201,
      isrc: "USUM71516760",
      writer: [
      {
      name: "Julia Michaels",
      id: "25bfffce-4a8d-0466-04f9-7d71af65de08"
      },
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Sonny Moore",
      id: "9f969030-c2f0-8a98-8929-1eef85713a8b"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      name: "Justin Tranter",
      id: "37ffb248-5949-4f39-92f1-250b46a0edf3"
      },
      {
      name: "Michael Tucker",
      id: "eda8a36d-e973-f5a4-80ca-debc2a16390f"
      }
      ],
      original_release_year: 2016,
      id: "7e328428-c919-4bb7-8fdb-b18651e1a69a"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Skrillex",
      id: "ae8256b8-7b47-66bb-968d-cfeb17bfa170"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      id: "04f2c1b4-06c9-47f3-8eb8-3324739de917"
      }
      ],
      title: "Sorry",
      entity_type: "track",
      artist_name: "Justin Bieber",
      album_title: "NOW That's What I Call Music, Vol. 57",
      duration: 201,
      isrc: "USUM71516760",
      writer: [
      {
      name: "Julia Michaels",
      id: "25bfffce-4a8d-0466-04f9-7d71af65de08"
      },
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Sonny Moore",
      id: "9f969030-c2f0-8a98-8929-1eef85713a8b"
      },
      {
      name: "Blood Diamonds",
      id: "0aac73a3-a706-4b1d-3a06-ad7a766e303d"
      },
      {
      name: "Justin Tranter",
      id: "37ffb248-5949-4f39-92f1-250b46a0edf3"
      },
      {
      name: "Michael Tucker",
      id: "eda8a36d-e973-f5a4-80ca-debc2a16390f"
      }
      ],
      original_release_year: 2016,
      id: "cb9f2a78-7be3-40f1-bb5b-6af693c56664",
      track_youtube_id: "2l1cK22EJBs"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      id: "590f6b27-432e-4fb0-a864-15b06ef7c150"
      }
      ],
      entity_type: "track",
      track_album_id: "0b43f398-e56f-4f06-8bb6-93971e940012",
      title: "What Do You Mean?",
      artist_name: "Justin Bieber",
      album_title: "Now That's What I Call Dance Hits",
      duration: 205,
      isrc: "USUM71511919",
      writer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Mason Levy",
      id: "158b85c4-6ee7-c288-9f96-b270695e7c50"
      },
      {
      name: "Jason Boyd",
      id: "476facc4-4b4c-4a72-bfcf-60fd7cb20d1c"
      }
      ],
      original_release_year: 2016,
      id: "0d2a1958-6a88-4b32-a9e4-039ae35976a5"
      },
      {
      track_artist_id: "680687b6-94f6-c447-fe5b-4533fb937de6",
      release_year: 2016,
      producer: [
      {
      name: "Benny Blanco",
      id: "dd53ee40-a033-162f-b626-54a3ba7a68a8"
      }
      ],
      entity_type: "track",
      track_album_id: "7d9b5902-8ca8-4d14-988b-54019d5eb236",
      title: "Love Yourself",
      artist_name: "Justin Bieber",
      album_title: "Heart Feel-Good Songs",
      duration: 237,
      isrc: "USUM71516761",
      writer: [
      {
      name: "Justin Bieber",
      id: "680687b6-94f6-c447-fe5b-4533fb937de6"
      },
      {
      name: "Benny Blanco",
      id: "dd53ee40-a033-162f-b626-54a3ba7a68a8"
      },
      {
      name: "Ed Sheeran",
      id: "97dbc840-8900-1b06-0942-d5f170c02045"
      }
      ],
      original_release_year: 2016,
      id: "44f88c29-9ffc-4762-abec-a7f814439587"
      }
    ]);

  });

  QUnit.test("Test getLyrics()", function (assert){
    function testGetLyrics(inputTrack, inputArtist, expected){
      assert.expect(2);
      var done = assert.async();
      var output;
      function callback(returnVal){
        output = returnVal;
      }
      getLyrics(inputTrack, inputArtist, callback);
      setTimeout(function(){
        console.log(output);
        assert.equal(output, expected);
        done();
      }, timeout);
    }

    testGetLyrics("Love Yourself", "Justin Bieber", "For all the times that you rain on my parade\nAnd all the clubs you get in using my name\nYou think you broke my heart, oh girl for goodness sake\nYou think I'm crying on my own, well I ain't\n\nAnd I didn't wanna write a song\nCause I didn't want anyone thinking I still care\nI don't but, you still hit my phone up\nAnd baby I be movin' on\nAnd I think you should be somethin'\nI don't wanna hold back, maybe you should know that\n\nMy mama don't like you and she likes everyone\nAnd I never like to admit that I was wrong\nAnd I've been so caught up in my job, didn't see what's going on\nBut now I know, I'm better sleeping on my own\n\nCause if you like the way you look that much\nOh, baby, you should go and love yourself\n...\n\n");
    testGetLyrics("Over", "Drake", "I know way too many people here right now\nThat I didn't know last year, who the fuck are y'all?\nI swear it feels like the last few nights we've been everywhere and back\nBut I just can't remember it all\n\nWhat am I doing?\nWhat am I doing?\nOh yeah, that's right, I'm doin' me, I'm doin' me\nI'm living life right now, man, and this what I'mma do 'til it's over\n\n'Til it's over\nBut it's far from over\n\nAlright, bottles on me, long as someone drink it\n\nNever drop the ball, fuck it y'all thinkin'?\nMakin' sure the Young Money ship is never sinkin'\n'Bout to set it off in this bitch, Jada Pinkett\nI shouldn't have drove, tell me how I'm getting home?\n\nYou too fine to be layin' down in bed alone\nI could teach you how to speak my language, Rosetta Stone\nI swear this life is like the sweetest thing I've ever known\nGot the gold thriller, Mike Jackson on these niggas\n\nAll I need's a fucking red jacket with some zippers\nSuper-good smidoke, a package of the Swisher's\nI did it overnight, it couldn't happen any quicker\n...\n\n");

  });

  QUnit.test("Test lyricsToWords()", function( assert ) {
    function runTest(input, expected) {
      assert.expect( 5 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      lyricsToWords(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.deepEqual( output, expected);
        done();
      }, timeout);
    }
    runTest("These are song lyrics", [["song",1], ["lyrics",1]]);
    runTest("Testing function one two three", [["testing",1], ["function",1], ["one",1], ["two",1], ["three",1]]);
    runTest("Testing function three three three", [["three",3], ["testing",1], ["function",1]]);
    runTest("Testing testing function three three three", [["three",3], ["testing",2], ["function",1]]);
    runTest("Testing testing function function three three three", [["three",3], ["testing",2], ["function",2]]);
  });

  QUnit.test("Test checkForWord()", function( assert ) {
    function runTest(input_lyrics, input_word, expected) {
      assert.expect( 5 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      checkForWord(input_lyrics, input_word, callback);
      setTimeout(function(){
        console.log(output);
        assert.equal( output, expected);
        done();
      }, timeout);
    }
    runTest("These are song lyrics", "song", 1);
    runTest("These are song song lyrics", "song", 2);
    runTest("These are are are are song lyrics are", "are", 5);
    runTest("These are are these are are song lyrics are", "are", 5);
    runTest("These are song lyrics", "these", 1);
  });

  QUnit.test("Test lyricsToArray()", function( assert ) {
    function runTest(input_lyrics, input_song, expected) {
      assert.expect( 5 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      lyricsToArray(input_lyrics, input_song, callback);
      setTimeout(function(){
        console.log(output);
        assert.deepEqual( output, expected);
        done();
      }, timeout);
    }
    runTest("These are song lyrics", "My Song", ["My Song", "song", "lyrics"]);
    runTest("eat my shorts", "My Song", ["My Song", "eat", "shorts"]);
    runTest("song song song", "My Song", ["My Song", "song", "song", "song"]);
    runTest("song my song", "My Song", ["My Song", "song", "song"]);
    runTest("song song my", "My Song", ["My Song", "song", "song"]);
  });

  QUnit.test("Test setLyrics()", function( assert ) {
    function runTest(input_track, input_artist, input_word, expected) {
      assert.expect( 2 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      setLyrics(input_track, input_artist, input_word, callback);
      setTimeout(function(){
        console.log(output);
        assert.equal( output, expected);
        done();
      }, timeout);
    }
    runTest("Baby", "Justin Bieber", "baby", "Ohh wooaah Ohh wooaah Ohh wooaah\nYou know you love me, I know you care\nJust shout whenever, And I'll be there\nYou are my love, You are my heart\nAnd we will never ever-ever be apart\n\nAre we an item. Girl quit playing\n\"We're just friends\"\nWhat are you sayin?\nsaid theres another and look right in my eyes\nMy first love broke my heart for the first time,\n\nAnd I was like\nBaby, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> ooh\nLike <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> noo\nLike <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> ooh\nThought you'd always be mine, mine\n\nBaby, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> oohh\nLike <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> noo\nLike <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span>, <span class=\"highlight\">baby</span> ohh\nThought you'd always be mine, mine\n\nFor you, i would have done what ever\nAnd I just cant believe we ain't together\nAnd I wanna play it cool, But I'm losing you\nI'll buy you anything, ill buy you any ring\nAnd I'm in pieces, Baby fix me\n...\n\n");
    runTest("Hotline Bling", "Drake", "oh", "You used to call me on my\nYou used to, you used to\nYeah\n\nYou used to call me on my cell phone\nLate night when you need my love\nCall me on my cell phone\nLate night when you need my love\nAnd I know when that hotline bling\nThat can only mean one thing\nI know when that hotline bling\nThat can only mean one thing\n\nEver since I left the city, you\nGot a reputation for yourself now\nEverybody knows and I feel left out\nGirl you got me down, you got me stressed out\nCause ever since I left the city, you\nStarted wearing less and goin' out more\nGlasses of champagne out on the dance floor\nHangin' with some girls I've never seen before\n\nYou used to call me on my cell phone\nLate night when you need my love\n...\n\n");
  });

  QUnit.test("Test songSelected()", function( assert ) {
    function runTest(input, expected) {
      assert.expect( 5 );
      var done = assert.async();
      var output;
      function callback(returnVal) {
        output = returnVal;
      }
      songSelected(input, callback);
      setTimeout(function(){
        console.log(output);
        assert.equal( output, expected);
        done();
      }, timeout);
    }
    runTest("Baby (42) - Justin Bieber", "Justin Bieber Baby");
    runTest("Sorry (12) - Justin Bieber", "Justin Bieber Sorry");
    runTest("Hotline Bling (7) - Drake", "Drake Hotline Bling");
    runTest("Single Ladies (35) - Beyonce", "Beyonce Single Ladies");
    runTest("Song (35) - Beyonce", "Beyonce Song");
  });
});
