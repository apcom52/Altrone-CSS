$(function() {

	/* Dropdown Выпадающее меню */
	$('body').on('click', '[data-dropdown-target]', function(event) {
		var dropdown = $('#' + $(this).data('dropdownTarget'));
		var window_width = $(window).width();
		var dropdown_width = $(dropdown).outerWidth();
		var sender_x = $(this).position().left;
		var sender_y = $(this).position().top;
		var sender_height = $(this).outerHeight();

		var result_width = dropdown_width + sender_x;

		if (result_width <= window_width) {
			dropdown.css({
				'top': sender_y + sender_height,
				'left': sender_x
			});
		} else {
			var result_width = dropdown_width + sender_x;
			dropdown.css({
				'top': sender_y + sender_height,
				'left': window_width - dropdown_width
			});
		}
		dropdown.slideDown(300);
	});

	$(document).click(function(e) {
		if ($(e.target).closest('.dropdown, [data-dropdown-target]').length)
			return;
		$('.dropdown').slideUp(300);		
		e.stopPropagation();
	});

	/* Всплывающие подсказки */
	var lastTooltipPosition = {x: null, y: null};	
	$('[data-tooltip]').on({
		mouseenter: function(event) {
			$('body').append('<div class="tooltip"></div>');
			if (lastTooltipPosition.x == null && lastTooltipPosition.y == null) {				
				$('.tooltip').html($(this).data('tooltip'));
				var window_width = $(window).width();
				var window_height = $(window).height();
				var tooltip_width = $('.tooltip').outerWidth();
				var tooltip_height = $('.tooltip').outerHeight();
				var parent_width = $(this).outerWidth();
				var parent_height = $(this).outerHeight();
				var parent_left = $(this).position().left;
				var parent_top = $(this).position().top;

				if ($(this).css('position') == 'absolute' || $(this).css('position') == 'fixed') {
					var parent_left = $(this).offset().left;
					var parent_top = $(this).offset().top;
				}
				lastTooltipPosition.x = parent_left + parent_width / 2 - tooltip_width / 2;

				var tooltip_position = $(this).data('tooltipPosition');

				/* Позиционирование по ширине относительно окна */
				if (lastTooltipPosition.x + tooltip_width > window_width) {
					lastTooltipPosition.x = lastTooltipPosition.x - Math.abs(window_width - lastTooltipPosition.x - tooltip_width);
				}
				if (lastTooltipPosition.x < 0) {
					lastTooltipPosition.x = 0;
				}

				if (tooltip_position == null || tooltip_position == 'top') {
					lastTooltipPosition.y = parent_top - tooltip_height;	
				} else if (tooltip_position == 'down') {
					lastTooltipPosition.y = parent_top + parent_height + tooltip_height;
				} else if (tooltip_position == 'left') {
					lastTooltipPosition.x = parent_left - tooltip_width;
					lastTooltipPosition.y = parent_top + 8;
				} else if (tooltip_position == 'right') {
					lastTooltipPosition.x = parent_left + tooltip_width;
					lastTooltipPosition.y = parent_top + 8;
				}

				if ($(this).data('tooltipInvert') == true) {
					$('.tooltip').addClass('tooltip--invert');
				} else {
					$('.tooltip').removeClass('tooltip--invert');
				}
				$('.tooltip').css('left', lastTooltipPosition.x);
				$('.tooltip').css('top', lastTooltipPosition.y);

				setTimeout(function() {
					$('.tooltip').show();
				}, 500);				
			}
		}, 
		mouseleave: function(event) {
			lastTooltipPosition = {x: null, y: null};
			$('.tooltip').html('');
			$('.tooltip').remove();
		}
	});	

	$(window).scroll(function() {
		/* Если .sidebar--under-taskbar, то taskbar должен расширяться под доступное окно */
		var sidebars = Sidebar.prototype.collection;
		var current_sidebar = null;
		sidebars.forEach(function (current, index, sidebars) {
			if (current.visible && current.enable_scroll && current.el.hasClass('sidebar--under-taskbar')) {
				current_sidebar = current;
				return;
			}
		});

		if (current_sidebar != null) {
			var top_pos = $(window).scrollTop();
			if (top_pos >= 44) {
				current_sidebar.el.css('top', 0).css('height', '100%');
				$('.overflow').css('top', 0).css('height', '100%');
			} else {
				current_sidebar.el.css('top', 44 - top_pos).css('height', 'calc(100% - ' + (44 - top_pos).toString());
				$('.overflow').css('top', 44 - top_pos).css('height', 'calc(100% - ' + (44 - top_pos).toString());
			}
		}
	});
});

/* Боковое меню */
function Sidebar(element, enable_scroll) {
	// Sidebar.prototype.el = undefined;
	if (Sidebar.prototype.collection == undefined)
		Sidebar.prototype.collection = []
	this.enable_scroll = false;
	if (enable_scroll != undefined)
		this.enable_scroll = enable_scroll;
	this.el = element;	
	Sidebar.prototype.collection.push(this);
}

Sidebar.prototype.show = function() {
	// Пробегаемся по всем созданным сайдбарам и закрываем их, если они открыты
	var otherSidebars = Sidebar.prototype.collection;
	var target = this;
	otherSidebars.forEach(function (current, index, otherSidebars) {
		if (current != target && current.visible)
			current.hide();
	});
	var element = this.el;
	target.hide();
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
	
	// Sidebar.prototype.visible = true;
	this.visible = true;
	element.trigger("sidebar-show");
}

Sidebar.prototype.hide = function() {
	var element = this.el;
	element.removeClass('sidebar--show');
	$('.overflow').remove();

	// Sidebar.prototype.visible = false;
	this.visible = false;
	element.trigger("sidebar-hide");
}

Sidebar.prototype.toggle = function() {
	if (this.visible) this.hide();
	else this.show();	
}

/* Toggle Button Module */
ToggleButton = function(element) {
	this.el = element;
}

ToggleButton.prototype.activate = function() {
	this.activated = true;
	var element = this.el;
	element.addClass('button--checked');
	element.trigger('toggle-button-activate');
}

ToggleButton.prototype.deactivate = function() {
	this.activated = false;
	var element = this.el;
	element.removeClass('button--checked');
	element.trigger('toggle-button-deactivate');
}

ToggleButton.prototype.toggle = function() {
	if (this.activated) this.deactivate();
	else this.activate();
}


/* Toast уведомления */

function showToast(message, duration) {
	if (duration == undefined || duration < 1) {
		duration = 2;
	} else if (duration > 30) {
		duration = 30;
	}
	if ($('.toast-collection').length < 1) {
		$('body').append('<div class="toast-collection"></div>');
	}

	$('.toast-collection').append('<div class="toast-collection__item">' + message + '</div>');
	var current = $('.toast-collection__item').last();
	current.delay(duration * 1000 - 250);
	current.fadeOut(500);
	setTimeout(function() {
		current.remove();
	}, duration * 1000 + 300);
}


/* Модальные окна */
Modal = function(element) {
	this.el = element;
	this.visible = false;
}

Modal.prototype.show = function() {
	var height = this.el.innerHeight();
	//height -= this.el.find('.modal__header').outerHeight() + this.el.find('.modal__footer').outerHeight();
	this.el.find('.modal__content').css('height', height - 46 - 39);

	var element = this.el;
	var target = this;
	this.visible = true;

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

/* Tabs */
Tabs = function(element) {
	this.el = element;
	this.currentIndex = -1;
	this.tabs = [];

	var target = this;
	this.el.find('.tabs__item').each(function (index) {
		target.tabs[index] = $(this);
	});

	var tabs = target.tabs;

	tabs.forEach(function (current, index, tabs) {
		var targetTabContent = '#' + current.data('tabTarget');			
		if (!current.hasClass('tabs__item--active'))
			$(targetTabContent).hide();
		else 
			target.currentIndex = index;
	});

	tabs.forEach(function (current, index, tabs) {
		current.click(function() {
			if (!current.hasClass('tabs__item--disabled')) {
				tabs.forEach(function (current, index, tabs) {
					var targetTabContent = '#' + current.data('tabTarget');
					$(targetTabContent).hide();
				});
			
				target.el.find('.tabs__item').removeClass('tabs__item--active');
				var targetTabContent = '#' + current.data('tabTarget');
				$(this).addClass('tabs__item--active');
				$(targetTabContent).show();
				target.currentIndex = index;
				target.el.trigger('select tab', [index]);
			} 
		});			
	});
}

Tabs.prototype.openTab = function(i) {
	var target = this;
	var tabs = target.tabs;

	tabs.forEach(function (current, index, tabs) {
		current.removeClass('tabs__item--active');
		var targetTabContent = '#' + current.data('tabTarget');		

		if (index != i) {
			$(targetTabContent).hide();
		} else {
			$(targetTabContent).show();
			current.addClass('tabs__item--active');
			target.currentIndex = index;
			target.el.trigger('select tab', [index]);
		}
	});
}

/* Модуль Select */
Select = function(element, options, index) {
	this.el = element;
	this.options = options;
	this.el.append("<div class='select__menu'></div>");
	this.menu = this.el.find('.select__menu');
	this.menu.html("Hello");
	this.visible = false;
	this.position = 'bottom';


	if (index == undefined || index < 0 || index >= this.options.length)
		this.selectedIndex = 0;
	else
		this.selectedIndex = index;

	var target = this;
	this.menu.html(options[this.selectedIndex]);

	this.menu.removeClass('select__menu--open');

	if (this.el.data('position') == 'top') 
		this.position = 'top';

	this.menu.click(function() {
		target.open();
	});
}

Select.prototype.open = function() {	
	var target = this;
	var options_menu = this.el.find('.select__options');

	if (this.visible) {
		target.hide();
	} else {
		this.el.find('.select__options').remove();
		this.menu.addClass('select__menu--open');
		var html_string = "<div class='select__options'>";

		var options = this.options;
		options.forEach(function(current, index, options) {
			if (target.selectedIndex == index) {
				html_string += "<div class='select__options__item select__options__item--active' data-id='" + index + "'>";
			} else {
				html_string += "<div class='select__options__item' data-id='" + index + "'>";
			}
			html_string += current + "</div>"
		});

		this.el.append(html_string);
		options_menu = this.el.find('.select__options');

		if (options_menu.outerWidth() <= this.menu.outerWidth()) {
			options_menu.css('width', this.menu.outerWidth());
		}

		if (target.position == 'top') {
			options_menu.css('top', this.menu.offset().top - options_menu.outerHeight());
		}

		options_menu.css('left', this.menu.offset().left);

		if (target.position == 'bottom') 
			options_menu.slideDown(300);
		else 
			options_menu.show();

		target.el.find('.select__options > .select__options__item').click(function() {
			target.selectedIndex = parseInt($(this).data('id'));
			target.menu.html(target.options[target.selectedIndex]);
			target.hide();
		});

		$(document).click(function(e) {
			if ($(e.target).closest('.select__menu, .select__options__item').length)
				return;
			target.hide();
			e.stopPropagation();
		});

		target.visible = true;
	}	
}

Select.prototype.hide = function() {
	this.menu.removeClass('select__menu--open');

	var target = this;
	var options_menu = this.el.find('.select__options');

	if (this.visible) {
		if (target.position == 'bottom') 
			options_menu.slideUp(300);
		else 
			options_menu.hide();
		setTimeout(function() {
			target.el.find('.select__options').remove();
		}, 300);		
		this.menu.removeClass('select__menu--open');

		target.visible = false;
	}
}

Select.prototype.set = function(index) {
	if (index >= 0 && index < this.options.length)
		this.selectedIndex = index;
		target.menu.html(target.options[target.selectedIndex]);
}