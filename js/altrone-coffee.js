(function() {
  var Sidebar, altQuery;

  window.$ = function(selector1) {
    this.selector = selector1;
    this.el = document.querySelectorAll(this.selector);
    this.classes = this.getClassNames;
    this.clear = function() {
      this.el.innerHTML = null;
      return this;
    };
    this.getClassNames = function() {
      var classString;
      classString = this.el[0].className;
      this.classes = classString.split(' ');
      return this.classes;
    };
    this.addClass = function(newClass) {
      var cl, classString, i, len, ref;
      this.classes.append(newClass);
      classString = '';
      ref = this.classes;
      for (i = 0, len = ref.length; i < len; i++) {
        cl = ref[i];
        classString += cl + ' ';
      }
      console.log(classString);
      return this;
    };
    return this;
  };

  altQuery = (function() {
    function altQuery(selector1) {
      this.selector = selector1 != null ? selector1 : "";
      this.el = this.all(this.selector);
      this.classNames = this.el.className;
      return this;
    }

    altQuery.prototype.all = function(selector) {
      var current;
      if (selector == null) {
        selector = "";
      }
      current = document.querySelectorAll(selector);
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
