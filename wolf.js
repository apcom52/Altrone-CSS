var svg = function(selector) {
	var target = this;
	target.context = document.getElementById(selector).getSVGDocument();
}

svg.prototype.get = function(selector) {
	
};