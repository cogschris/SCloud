$(document).ready(function () {
  QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
  });

  QUnit.test("testSearch", function( assert ) {
    function testSearch(input, expected) {
      assert.expect( 1 );
      var done = assert.async();
      var output = getSearchSuggestions(input);
      setTimeout(function(){
        console.log(output);
        assert.equal( output[0], expected);
        done();
      }, 2000);
    }
    testSearch("jus", "Justin Bieber");
  });
});
