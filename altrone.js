$(function() {

	/* Dropdown Выпадающее меню */
	$('[data-dropdown-target]').on('click', function() {
		var dropdown = $('#' + $(this).data('dropdownTarget'));
		var window_width = $(window).width();
		var dropdown_width = $(dropdown).outerWidth();
		var sender_x = $(this).position().left;
		var sender_y = $(this).position().top;
		var sender_height = $(this).outerHeight();

		var result_width = dropdown_width + sender_x;

		console.log(sender_height)

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
		console.log(selected_id);
		console.log(parent);
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
	var tooltipDiv = $('body').append('<div class="tooltip"></div>');
	$('[data-tooltip]').on({
		mouseenter: function(event) {
			if (lastTooltipPosition.x == null && lastTooltipPosition.y == null) {
				$('.tooltip').html($(this).data('tooltip'));
				var window_width = $(window).width();
				var window_height = $(window).height();
				var tooltip_width = $('.tooltip').outerWidth();
				var tooltip_height = $('.tooltip').outerHeight();
				var parent_width = $(this).outerWidth();
				var parent_left = $(this).position().left;
				lastTooltipPosition.x = parent_left + parent_width / 2 - tooltip_width / 2;

				/* Позиционирование по ширине относительно окна */
				if (lastTooltipPosition.x + tooltip_width > window_width) {
					lastTooltipPosition.x = lastTooltipPosition.x - Math.abs(window_width - lastTooltipPosition.x - tooltip_width);
				}
				if (lastTooltipPosition.x < 0) {
					lastTooltipPosition.x = 0;
				}

				/* Позиционирование по высоте относительно окна */
				lastTooltipPosition.y = $(this).position().top - tooltip_height;
				/* !!! ToDo: сделать позиционирование по вертикали */

				if ($(this).data('tooltipInvert') == true) {
					$('.tooltip').addClass('tooltip--invert');
				} else {
					$('.tooltip').removeClass('tooltip--invert');
				}
				$('.tooltip').css('left', lastTooltipPosition.x);
				$('.tooltip').css('top', lastTooltipPosition.y);				
				$('.tooltip').show();
			}
		}, 
		mouseleave: function(event) {
			lastTooltipPosition = {x: null, y: null};
			$('.tooltip').html('');
			$('.tooltip').hide();
		}
	});
});