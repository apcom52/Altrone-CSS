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
		if ($(e.target).closest('.dropdown, [data-dropdown-target], .select__menu, .select__options__item').length)
			return;
		$('.dropdown').slideUp(300);
		$('.select__options').slideUp(300);
		$('.select__menu').removeClass('select__menu--open');
		e.stopPropagation();
	});


	/* Select Меню */
	$('body').on('click', '.select__menu', function(event) {
		var parent = $(this).parent();
		var select = $(this);
		var options = parent.find('.select__options');
		var selected_id = $(this).data('selectValue');
		options.find('.select__options__item').removeClass('select__options__item--active');
		var active_option = options.find('.select__options__item[data-option-id="' + selected_id + '"]');
		active_option.addClass('select__options__item--active');
		select.toggleClass('select__menu--open');
		options.css('width', select.outerWidth());
		options.css('top', $(this).offset().top + select.outerHeight());
		options.css('left', $(this).offset().left);
		options.slideToggle(300);

		/* !!! ToDo: сделать позиционирование по вертикали и горизонтали */

		$('body').on('click', '.select__options__item', function(e) {
			var current = $(this);
			var parentSelect = $(this).parent().parent().find('.select__menu');
			var currentValue = current.data('optionId');
			options.find('.select__options__item').removeClass('select__options__item--active');
			$(this).addClass('select__options__item--active');
			parentSelect.html(current.html());
			parentSelect.data('selectValue', currentValue);
			parentSelect.removeClass('select__menu--open');
			options.slideUp(300);
		});
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
					lastTooltipPosition.y = $(this).position().top - tooltip_height;	
				} else if (tooltip_position == 'down') {
					lastTooltipPosition.y = $(this).position().top + parent_height + tooltip_height;
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
});

/* Боковое меню */
function Sidebar(element) {
	// Sidebar.prototype.el = undefined;
	this.el = element;	
}

Sidebar.prototype.show = function() {
	var element = this.el;
	var target = this;
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