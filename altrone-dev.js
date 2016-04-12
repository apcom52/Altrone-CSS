/* Sidebar Plugin */
/*(function( $ ) {

	$.extend($.fn, {
		sidebar: function() {
			var methods = {
				el: $(this),
				show: function(element = $(this)) {
					console.log('show');
					$('.sidebar').sidebar('hide');
					element.addClass('sidebar--show');
					if (('.overflow').length == 0) {
						$('body').append('<div class="overflow"></div>');
					}
					if (element.hasClass('sidebar--under-taskbar')) {
						$('.overflow').addClass('overflow--under-taskbar');
						console.log('under taskbar');
					}
					$('body').on('click', '.overflow', function() {
						methods.hide($('.sidebar'));
					});
					element.trigger("sidebar-show");
				},
				hide: function(element = $(this)) {
					element.removeClass('sidebar--show');
					$('.overflow').remove();
					element.trigger("sidebar-hide");
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
		},
		rating: function() {
			var methods = {
				el: $(this),
				init: function(element = $(this)) {
					console.log('rate activate');
					element.find('rating__item').click(function() {
						var index = element.find(".rating__item").index($(this));
						element.trigger('rate', [index]);
					});
				}
			}

			$.fn.rating = function(method) {  		
				console.log('fn.rating');
		  		if (methods[method] ) {
			        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			    } else if ( typeof method === 'object' || ! method ) {
			        return null;
			    } else {
			        $.error( 'Метод "' +  method + '" не найден');
			    }
		  	};
		}
	});

	

  	$.fn.addChild = function(html) {                               
	    var target  = $(this[0])                            
	    var child = $(html);                                                      
	    child.appendTo(target);                                                   
	    return child;                                                             
	};  
})(jQuery);*/



/* Sidebar Module */

function Sidebar(element) {
	Sidebar.prototype.el = element;	
}

Sidebar.prototype.show = function() {
	var element = this.el;
	var target = this;
	this.hide();
	element.addClass('sidebar--show');
	
	if (!$('.overflow').length) {
		$('body').append('<div class="overflow"></div>');
	}

	$('body').on('click', '.overflow', function() {
		target.hide();
	});

	if (element.hasClass('sidebar--under-taskbar')) {
		$('.overflow').addClass('overflow--under-taskbar');
	}

	
	element.trigger("sidebar-show");

	Sidebar.prototype.visible = true;
}

Sidebar.prototype.hide = function() {
	var element = this.el;
	element.removeClass('sidebar--show');
	$('.overflow').remove();
	element.trigger("sidebar-hide");

	Sidebar.prototype.visible = false;
}

Sidebar.prototype.toggle = function() {
	if (this.visible) this.hide();
	else this.show();	
}

/* Toggle Button Module */
ToggleButton = function(element) {
	ToggleButton.prototype.el = element;
}

ToggleButton.prototype.activate = function() {
	ToggleButton.prototype.activated = true;
	var element = this.el;
	element.addClass('button--checked');
	element.trigger('toggle-button-activate');
}

ToggleButton.prototype.deactivate = function() {
	ToggleButton.prototype.activated = false;
	var element = this.el;
	element.removeClass('button--checked');
	element.trigger('toggle-button-deactivate');
}

ToggleButton.prototype.toggle = function() {
	if (this.activated) this.deactivate();
	else this.activate();
}


/* Toast уведомления */




/* Модальные окна */
Modal = function(element) {
	Modal.prototype.el = element;
	Modal.prototype.visible = false;
}

Modal.prototype.show = function() {
	var element = this.el;
	var target = this;
	this.visible = true;

	console.log($('.overflow').length);

	if (!$('.overflow').length) {
		$('body').append('<div class="overflow"></div>');
	}

	$('body').on('click', '.overflow', function() {
		target.hide();
	});

	element.find('.modal__discard').click(function() {
		target.hide();
	});

	element.show();
	element.trigger('modal-show');

	console.log(element);
}

Modal.prototype.hide = function() {
	this.visible = false;
	var element = this.el;
	$('.overflow').remove();
	element.hide();
	element.trigger('modal-hide');
}

Modal.prototype.toggle = function() {
	if (this.visible) this.hide();
	else this.show();
}