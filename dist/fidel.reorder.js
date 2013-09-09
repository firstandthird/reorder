/*!
 * reorder - A drag and drop to reorder library
 * v0.0.3
 * http://github.com/jgallen23/reorder
 * copyright Greg Allen 2013
 * MIT License
*/
(function($){
  $.declare('reorder', {
    defaults: {
      draggingClass: 'reorder-dragging',
      placeholderClass: 'reorder-placeholder'
    },

    init: function () {
      this.dragIndex = null;
      this.clonedEl = null;
      this.dragEl = null;
      this.newIndex = null;

      this.getItems();
      this.attachEvents();
    },

    getItems: function() {
      this.items = this.el.find('[draggable]');
      return this.items;
    },

    attachEvents: function() {
      this.el.on('dragstart', '[draggable]', this.proxy(this.onDrag));
      this.el.on('dragenter dragover', '[draggable]', this.proxy(this.onDragOver));
      this.el.on('dragend', '[draggable]', this.proxy(this.onDragDrop));
      this.el.on('dragend', '[draggable]', this.proxy(this.onDragEnd));
    },

    onDrag: function(e) {
      var event = e.originalEvent;
      var target = $(e.target);
      
      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = 'move';
      
      this.dragEl = target;
      this.dragIndex = target.index();
      this.clonedEl = target.clone(true);

      this.emit('dragstart', [e]);
    },

    onDragOver: function(e) {
      var event = e.originalEvent;
      var target = $(e.target);
      var tempPosition = 'Before';

      if(this.dragEl.is(target)) {
        this.clonedEl.remove();
        this.dragEl.show();
        return;
      } else {
        this.dragEl.hide();
      }

      if(((event.pageY - target.offset().top)) > target.outerHeight() / 2) {
         tempPosition = 'After';
      }

      this.clonedEl['insert' + tempPosition](target).addClass(this.placeholderClass);
      this.dragEl.addClass(this.draggingClass);

      this.newIndex = this.clonedEl;
      
      this.emit('dragover', [e]);
    },

    onDragDrop: function(e) {
      if(this.newIndex !== null) {
        var event = e.originalEvent;
        var tempPosition = 'Before';
        var target = $(e.target);
        
        if(((event.pageY - target.offset().top)) > target.outerHeight() / 2) {
          tempPosition = 'After';
        }

        this.dragEl['insert' + tempPosition](this.newIndex).show();
      }

      this.emit('dragdrop', [e]);
    },

    onDragEnd: function(e) {
      this.dragIndex = null;
      this.clonedEl = null;
      this.dragEl = null;
      this.newIndex = null;

      this.getItems().removeClass(this.draggingClass);
      this.el.find('.' + this.placeholderClass).remove();

      this.emit('dragend', [e]);
    },
  });
})(jQuery);