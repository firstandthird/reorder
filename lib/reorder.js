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
      this.el.on('dragenter', '[draggable]', this.proxy(this.onDragOver));
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
      var target = $(e.target);
      var tempPosition = 'Before';

      if(this.dragEl.is(target)) {
        this.clonedEl.remove();
        return;
      }

      if(target.index() > this.dragIndex) {
        tempPosition = 'After';
      }

      this.newIndex = target;

      this.clonedEl['insert' + tempPosition](target).addClass(this.placeholderClass);
      this.dragEl.addClass(this.draggingClass);
      
      this.emit('dragover', [e]);
    },

    onDragDrop: function(e) {
      if(this.newIndex !== null) {
        var tempPosition = 'Before';
        
        if(this.newIndex > this.dragIndex) {
          tempPosition = 'After';
        }

        this.dragEl['insert' + tempPosition](this.newIndex);
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