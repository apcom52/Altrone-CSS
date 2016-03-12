IDSelector = function(selector) {
	return document.getElementById(selector);
}

ClassSelector = function(selector) {
	return document.getElementsByClassName(selector);
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

Sidebar = function(id) {
	this.id = id;
	this.element = IDSelector(this.id);	
	this.hidden = true;
	
	this.overflow = ClassSelector('overflow');

	return this;
}

Sidebar.prototype.show = function() {
	this.hidden = false;
	this.element.className += ' sidebar--show';
	this.overflow.className += ' overflow--show';	
}

Sidebar.prototype.hide = function() {
	this.hidden = true;
	removeClass(this.element, 'sidebar--show');
	removeClass(this.overflow, 'overflow--show');
}

Sidebar.prototype.toggle = function() {
	if (this.hidden) {
		this.show();
	} else {
		this.hide();
	}
}