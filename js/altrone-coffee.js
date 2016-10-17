(function() {
  var Sidebar, altQuery, example;

  altQuery = (function() {
    function altQuery(selector1) {
      this.selector = selector1 != null ? selector1 : "";
      this.el = this.all(this.selector);
      this.classNames = this.el.className;
      console.log(this.el);
      return this;
    }

    altQuery.prototype.all = function(selector) {
      var current;
      if (selector == null) {
        selector = "";
      }
      current = document.querySelectorAll(selector);
      console.log(current);
      return current;
    };

    altQuery.prototype.get = function(selector) {
      if (selector == null) {
        selector = "";
      }
      return document.querySelector(selector);
    };

    altQuery.prototype.append = function(content) {
      if (content == null) {
        content = "";
      }
      this.el.innerHTML += content;
      return this;
    };

    altQuery.prototype.clear = function() {
      this.el.innerHTML = null;
      return this;
    };

    altQuery.prototype.remove = function() {
      this.el.parentNode.removeChild(this.el);
      return this;
    };

    return altQuery;

  })();

  example = new altQuery("#example");

  console.log(example);

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
