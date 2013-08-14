
suite('reorder', function() {
  var list;
  suiteSetup(function(){
    list = $('#reorderable');
  });

  suite('general', function() {
    test('jQuery element should have reorder function',function(){
      list.reorder();
      assert.equal(typeof list.reorder, "function");
    });

    test('should return list of items', function() {
      list.reorder();
      assert.equal(list.find('[draggable]').length, list.reorder('getItems').length);
    });
  });

});
