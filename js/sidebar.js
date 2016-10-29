(function() {
  var Sidebar;

  Sidebar = (function() {
    function Sidebar(element, options) {
      this.element = element;
      this.options = options != null ? options : void 0;
      this.collection = void 0;
      if (this.collection == null) {
        this.collection = [];
      }
    }

    return Sidebar;

  })();

}).call(this);
