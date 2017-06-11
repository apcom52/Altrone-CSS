'use strict';

class Dropdown {
	constructor(objectSender, items = {}, props = {}) {
		var target = this;
		if (!props) {
			props = {};
		}

		target.items = items;
		target._items = [];
		target.props = props;
		this.objectSender = objectSender;
		this.isVisible = false;
		target.position = props.position || 'bottom';

		target.el = document.createElement('div');
		target.el.className = 'dropdown';

		target.items.forEach(function(value, index) {
			var currentNode = document.createElement('div');
			currentNode.className = 'dropdown__item';

			var actions = value.actions;

			actions.forEach(function(action_value, action_index) {
				console.log(action_value);
				let currentActionNode = document.createElement('div');
				if (action_value.tooltip) {
					currentActionNode.className = 'dropdown__item__tooltip';
					currentActionNode.innerHTML = action_value.tooltip;
				} else {
					currentActionNode.className = 'dropdown__item__action';

					if (action_value.onClick) {
						currentActionNode.onclick = function() { 
							target.close();
							action_value.onClick({
								row_index: index,
								action_index: action_index
							});
						}
					}

					if (action_value.icon) {
						console.log('find icon');
						let currentActionNodeIcon = document.createElement('i');
						currentActionNodeIcon.className = 'dropdown__item__action__icon ' + action_value.icon;
						currentActionNode.appendChild(currentActionNodeIcon);
					}

					if (action_value.label) {
						console.log('find label');
						let currentActionNodeLabel = document.createElement('div');
						currentActionNodeLabel.className = 'dropdown__item__action__label';
						currentActionNodeLabel.innerHTML = action_value.label;
						currentActionNode.appendChild(currentActionNodeLabel);
					}

					if (action_value.icon && action_value.label == null) {
						currentActionNode.classList.add('dropdown__item__action--no-stretch');
					}
				}

				currentNode.appendChild(currentActionNode);
			});
			
			target.el.appendChild(currentNode);
		});

		document.body.appendChild(this.el);
		this._render();

		window.onresize = () => this._render();

		this.objectSender.onclick = () => this.toggle();
	}

	toggle() {
		if (this.isVisible) this.close();
		else this.open();
	}

	open() {
		this.el.classList.add('dropdown--show');
		this.isVisible = true;
		this._render();
	}

	close() {
		this.el.classList.remove('dropdown--show');
		this.isVisible = false;
		this._render();
	}

	_render() {
		let [sender_left, sender_top] = [this.objectSender.offsetLeft - this.objectSender.style.marginLeft, this.objectSender.offsetTop];
		let [sender_width, sender_height] = [this.objectSender.clientWidth, this.objectSender.offsetHeight];
		let [dropdown_width, dropdown_height] = [this.el.offsetWidth, this.el.offsetHeight];
		let [dropdown_left, dropdown_top] = [0, 0];
		var [screen_width, screen_height] = [window.innerWidth, window.innerHeight];

		var sender_margin_left_str = window.getComputedStyle(this.objectSender).marginLeft;
		var sender_margin_left = parseInt(sender_margin_left_str.substr(0, sender_margin_left_str.length - 2));

		switch(this.position) {
			case 'left':
				dropdown_left = sender_left - sender_width - 4; 
				dropdown_top = sender_top;
				break;
			case 'right':
				dropdown_left = sender_left + sender_width + 4;
				dropdown_top = sender_top;
				break;
			case 'top':
				dropdown_left = sender_left;
				dropdown_top = sender_top - dropdown_height - 2;
				break;
			case 'bottom':
			default:
				dropdown_left = sender_left;
				dropdown_top = sender_top + sender_height + 2;
				break;
		}

		console.log('sender', sender_left, sender_top);
		console.log('sender box', sender_width, sender_height);
		console.log('dropdown', dropdown_left, dropdown_top);
		console.log('dropdown box', dropdown_width, dropdown_height);
		console.log('screen', screen_width, screen_height);

		if (dropdown_left < 0) {
			dropdown_left = 0;
		}

		if ((dropdown_left + dropdown_width) > screen_width) {
			console.log('delta', (dropdown_left + dropdown_width) - screen_width);
			dropdown_left -= (dropdown_left + dropdown_width) - screen_width;
		}

		if (sender_width >= 200) {
			dropdown_width = sender_width;
		} else {
			dropdown_width = 200;
		}

		console.log('-------------------------------');
		console.log('sender', sender_left, sender_top);
		console.log('sender box', sender_width, sender_height);
		console.log('dropdown', dropdown_left, dropdown_top);
		console.log('dropdown box', dropdown_width, dropdown_height);
		console.log('screen', screen_width, screen_height);

		this.el.style.top = dropdown_top + 'px';
		this.el.style.left = dropdown_left + 'px';

		this.el.style.width = (dropdown_width) + 'px';
	}
}