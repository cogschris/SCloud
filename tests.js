$(document).ready(function () {
  QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
  });

  QUnit.test("test getSearchSuggestions()", function( assert ) {
    function testSearch(input, expected) {
      assert.expect( 1 );
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
      }, 2000);
    }
    testSearch("jus", ["Justin Bieber","Justin Timberlake","Justin Moore","Justin Quiles","Justice","Justine Skye","Justin Nozuka","Justice Crew","Justin Hurwitz"]);

  });
});
