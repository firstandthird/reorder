
function simulateDrag(el, dropIndex) {
  el.reorder('onDrag', {
    target: el.find('li').first(),
    originalEvent: {
      dataTransfer: {
        setData: function() {},
        effectAllowed: ''
      }
    }
  });

  el.reorder('onDragOver', {
    target: el.find('li').eq(dropIndex - 1)
  });

  el.reorder('onDragDrop', {});

  el.reorder('onDragEnd', {});
}

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

  suite('dragging', function() {
    test('element shouldn\'t move if position the same', function(){
      list.reorder();

      var listHTML = list.html();
      
      simulateDrag(list, 1);

      assert.equal(listHTML, list.html());
    });

    test('list should update when item dragged', function(){
      list.reorder();

      var listHTML = list.html();
      
      simulateDrag(list, 4);

      assert.notEqual(listHTML, list.html());
    });
  });

  suite('events', function(){
    test('dragstart', function(done){
      list.reorder();

      list.one('dragstart', function(){
        assert.ok(1);
        done();
      });

      simulateDrag(list, 1);
    });

    test('dragover', function(done){
      list.reorder();

      list.one('dragover', function(){
        assert.ok(1);
        done();
      });

      simulateDrag(list, 4);
    });

    test('dragdrop', function(done){
      list.reorder();

      list.one('dragdrop', function(){
        assert.ok(1);
        done();
      });

      simulateDrag(list, 4);
    });

    test('dragend', function(done){
      list.reorder();

      list.one('dragend', function(){
        assert.ok(1);
        done();
      });

      simulateDrag(list, 4);
    });
  });
});
