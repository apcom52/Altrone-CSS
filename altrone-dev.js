IDSelector = function(selector) {
	return document.getElementById(selector);
}

ClassSelector = function(selector) {
	return document.getElementsByClassName(selector);
}

ClassList = function(element) {
	return this;
}

ClassList.prototype.get = function(element) {
	var classes = element.className.split(' ');
	return classes;
}

ClassList.prototype.class = function(list) {
	var className = '';
	list.forEach(function (current, index, list) {
		className += current + ' ';
	});
	className = className.slice(0, -1);
	return className;
}

ClassList.prototype.add = function(element, _class) {
	var list = this.get(element);
	list.push(_class);
	element.className = this.class(list);
}

ClassList.prototype.remove = function(element, _class) {
	var list = this.get(element);
	list.forEach(function (current, index, list) {		
		if (current == _class) {
			list.splice(index, 1);
			return;
		}		
	});
	element.className = this.class(list);
}

function removeClass(element, _class) {
	var classes = element.className.split(' ');
	classes.forEach(function (current, index, classes) {		
		if (current == _class) {
			classes.splice(index, 1);
			return;
		}		
	});

	var new_className = '';
	classes.forEach(function (current, index, classes) {	
		new_className += current + ' ';
	});
	element.className = new_className;
}
/* Sidebar Plugin */
(function( $ ) {
	var methods = {
		el: $(this),
		show: function(element = $(this)) {
			element.addClass('sidebar--show');
			$('body').append('<div class="overflow"></div>');
			$('body').on('click', '.overflow', function() {
				methods.hide(element);
			});
		},
		hide: function(element = $(this)) {
			element.removeClass('sidebar--show');
			$('.overflow').remove();
		},
		toggle: function() {
			if ($(this).hasClass('sidebar--show')) {
				methods.hide($(this));
			} else {
				methods.show($(this));
			}
		}
	}
  	$.fn.sidebar = function(method) {  		
  		if (methods[method] ) {
	        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	        return null;
	    } else {
	        $.error( 'Метод "' +  method + '" не найден');
	    }
  	};
})(jQuery);