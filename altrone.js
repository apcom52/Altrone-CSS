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
function Sidebar(element, enable_scroll, options) {
	// Sidebar.prototype.el = undefined;
	if (!options) options = {};
	if (Sidebar.prototype.collection == undefined)
		Sidebar.prototype.collection = []
	this.enable_scroll = false;
	if (enable_scroll != undefined)
		this.enable_scroll = enable_scroll;
	this.el = element;	
	Sidebar.prototype.collection.push(this);
	this.onShow = options.onShow || null;
	this.onHide = options.onHide || null;
}

Sidebar.prototype.show = function() {
	// Пробегаемся по всем созданным сайдбарам и закрываем их, если они открыты
	var otherSidebars = Sidebar.prototype.collection;
	var target = this;
	if (target.onShow) target.onShow();
	otherSidebars.forEach(function (current, index, otherSidebars) {
		if (current != target && current.visible)
			current.hide();
	});
	var element = this.el;
	element.addClass('sidebar--show');

	target.overflow = new Overflow({
		onDestroy: function() { target.hide(); }
	});

	if (element.hasClass('sidebar--under-taskbar')) {
		$('.overflow').addClass('overflow--under-taskbar');
	}
	
	// Sidebar.prototype.visible = true;
	this.visible = true;
	element.trigger("sidebar-show");
}

Sidebar.prototype.hide = function() {
	var target = this;
	var element = this.el;
	element.removeClass('sidebar--show');
	this.visible = false;
	if (this.onHide) this.onHide();
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
Modal = function(element, options) {
	if (!options) options = {};
	if (Modal.prototype.collection == undefined)
		Modal.prototype.collection = []
	this.el = element;
	this.visible = false;
	Modal.prototype.collection.push(this);


	this.only_discarding = options.only_discarding || false;
	if (!this.only_discarding) {
		this.el.find('.modal__header').append('<div class="modal__header__close"></div>');
	}
	this.onShow = options.onShow || undefined;
	this.onDiscard = options.onDiscard || undefined;
}

Modal.prototype.show = function() {
	var othersModals = Modal.prototype.collection;
	othersModals.forEach(function (current, index, othersModals) {
		if (current.visible)
			current.hide();		
	});
	var height = this.el.innerHeight();
	this.el.find('.modal__content').css('height', height - 46 - 39);

	var element = this.el;
	var target = this;
	this.visible = true;

	if (target.onShow) target.onShow();

	disableClick = false;
	if (target.only_discarding) disableClick = true;
	target.overflow = new Overflow({
		onDestroy: function() { target.hide(); },
		disableClick: disableClick,
	})

	element.find('.modal__discard, .modal__header__close').click(function() {
		target.overflow.destroy();
	});

	element.show();
}

Modal.prototype.hide = function(from_overflow) {
	this.visible = false;
	var element = this.el;

	if (!from_overflow) {
		this.overflow.destroy();
	}
	element.hide();
}

Modal.prototype.toggle = function() {
	if (this.visible) this.hide();
	else this.show();
}

/* Tabs */
Tabs = function(element, callback) {
	this.el = element;
	this.currentIndex = -1;
	this.tabs = [];

	var target = this;
	this.el.find('.tabs__item').each(function (index) {
		target.tabs[index] = $(this);
	});

	/* Присваиваем callback-функции */
	if (callback != undefined) {
		if (callback.onTabSelected != undefined) 
			this.onTabSelected = callback.onTabSelected;
	}

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

				if (target.onTabSelected != undefined)
					target.onTabSelected(target.currentIndex);
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
			if (target.onTabSelected != undefined)
					target.onTabSelected(target.currentIndex);
		}
	});
}

/* Модуль Select */
Select = function(element, options, index) {
	if (Select.prototype.collection == undefined)
		Select.prototype.collection = []
	Select.prototype.collection.push(this);
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
	var othersSelects = Select.prototype.collection;
	var target = this;
	othersSelects.forEach(function (current, index, othersSelects) {
		if (current != target && current.visible)
			current.hide();		
	});

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

		var parent_left_padding = this.menu.css('margin-left');
		var parent_top = this.menu.position().top;
		var parent_left = this.menu.position().left + 16;
		var parent_height = this.menu.outerHeight();

		if (options_menu.outerWidth() <= this.menu.outerWidth()) {
			options_menu.css('width', this.menu.outerWidth());
		}

		if (target.position == 'top') {
			options_menu.css('top', parent_top - options_menu.outerHeight());
		}

		options_menu.css('left', parent_left);

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
	if (index >= 0 && index < this.options.length) {
		this.selectedIndex = index;
		target.menu.html(target.options[target.selectedIndex]);
	} else {
		throw new Error("Invalid index");
	}
}


/* Progressbar */
Progress = function(element, options) {
	this.el = element;
	this.max = options.max || 0;
	this.current = options.current || 0;
	this.active_el = this.el.find('.progress__active');
	this.text_label = this.el.find('.progress__active .progress__active__text');
	this.set(this.current);
	this.render();
}

Progress.prototype.set = function(value) {
	if (value) {
		var target = this;
		if (value <= this.max) {
			this.current = value;
			this.render();
			this.percent = ((this.current / this.max) * 100).toFixed(2);
		}
		this.render();
	} else {
		throw new Error("Invalid value");
	}	
}

Progress.prototype.render = function() {	
	this.text_label.html(this.percent + '%');
	this.active_el.css('width', this.percent + '%');
}

Progress.prototype.setMaximum = function(max) {
	if (max) {
		this.max = max;
		this.set(this.current);
		this.render();
	} else {
		throw new Error("Invalid maximum value");
	}	
}


/* Carousel */
Carousel = function(element, options) {
	this.el = element;
	if (!options) options = {};
	this.slides = element.find('.carousel__item').toArray();
	this.size = this.slides.length;
	this.currentIndex = 0;
	this.onChanged = options.onChanged || undefined;

	var target = this;

	target.el.append('<div class="carousel__panel"><div class="carousel__panel__counter"></div><div class="carousel__panel__text"></div><div class="carousel__panel__navigation"><div class="carousel__panel__navigation__button" id="prev"></div><div class="carousel__panel__navigation__button" id="next"></div></div></div>');
	
	if (this.size) this.open(1);

	target.el.on('click', '.carousel__panel > .carousel__panel__navigation > #prev', function() {
		target.prev();
	});

	target.el.on('click', '.carousel__panel > .carousel__panel__navigation > #next', function() {
		target.next();
	});
}

Carousel.prototype.open = function(index) {
	var target = this;
	target.el.find('#next, #prev').removeClass('disabled');
	var slides = target.slides;
	if (index > 0 && index <= this.size) {
		target.currentIndex = index;
		var current = $(target.slides[index - 1]);
		var image = current.find('img');
		var title = current.find('.carousel__item__text');
		var counter = target.el.find('.carousel__panel__counter');

		target.el.find('.carousel__panel__text').html(title.html());
		target.el.css('background-image', 'url(' + image.attr('src') + ')');

		counter.html(target.currentIndex.toString() + '/' + target.size.toString());

		if (index == target.size) {
			target.el.find('#next').addClass('disabled');
		}
		if (index == 1) {
			target.el.find('#prev').addClass('disabled');
		}

		if (target.onChanged) target.onChanged(target.currentIndex);
	} else {
		throw new Error("Invalid carousel index");
	}
}

Carousel.prototype.next = function() {
	if (!this.el.find('#next').hasClass('disabled')) {
		var index = this.currentIndex + 1;
		this.open(index);
	} else {
		throw new Error("Cannot open next carousel item");
	}
}

Carousel.prototype.prev = function() {
	if (!this.el.find('#prev').hasClass('disabled')) {
		var index = this.currentIndex - 1;
		this.open(index);
	} else {
		throw new Error("Cannot open previous carousel item");
	}	
}

/* Диалоговое окно */
Dialog = function(options) {
	this.id = new Date().getTime();
	this.title = options.title || 'Не указано';
	this.message = options.message || 'Не указано';
	this.onOK = options.onOK || null;
	this.onCancel = options.onCancel || null;

	return this;
}

Dialog.prototype.show = function() {
	$('body').append('<div class="modal" id="' + this.id + '"></div>');
	this.el = $('body').find('#' + this.id.toString());
	var target = this;
	var el = target.el;
	el.append('<div class="modal__header"><div class="modal__header__title">' + this.title + '</div></div>');
	el.append('<div class="modal__content">' + this.message + '</div>');
	if (target.onOK) {
		el.append('<div class="modal__footer align-center"><button class="button--color-green" id="ok">OK</button><button id="cancel">Отмена</button></div>');		
	} else {
		el.append('<div class="modal__footer align-center"><button class="button--color-green" id="cancel">OK</button></div>');				
	}

	this.modal = new Modal(el);
	this.modal.show();
	this.okButton = el.find('.modal__footer #ok');
	this.cancelButton = el.find('.modal__footer #cancel');

	this.cancelButton.click(function() {
		if (target.onCancel) 
			target.onCancel();
		target.modal.hide();
		el.remove();
	});

	this.okButton.click(function() {
		target.onOK();
		target.modal.hide();
		el.remove();
	});
}

Accordion = function(element, options) {
	var target = this;
	target.el = element;
	target.multi = options.multi || false;
	
	target.el.find('.accordion__item__title').click(function() {
		target.open($(this));
	});
}

Accordion.prototype.open = function(element) {
	var target = this;

	if (element.hasClass('accordion__item__title')) {
		var parent = element.parent();		
	} else {
		var parent = element;
	}

	if (!target.multi)
		target.closeOthers();

	var title = element.text();
	parent.toggleClass('accordion__item--active');
};

Accordion.prototype.closeOthers = function() {
	var target = this;
	target.el.find('.accordion__item').removeClass('accordion__item--active');
};


Overflow = function(options) {
	if (options == undefined) options = {};
	var target = this;
	$('body').append('<div class="overflow"></div>');
	target.el = $('body .overflow');
	target.onDestroy = options.onDestroy || null;
	target.disableClick = options.disableClick || false;

	$('body').on('click.overflow', '.overflow', function() {
		if (target.disableClick == false)
			target.destroy();
	});
}

Overflow.prototype.destroy = function() {
	var target = this;
	$('body').off('.overflow');	
	target.el.remove();

	if (!target.onDestroyCalled && target.onDestroy) {
		target.onDestroyCalled = true;
		target.onDestroy(true);
	}
};