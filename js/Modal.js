'use strict';

var __modals_collection = new Array();

class Modal {
	constructor(element, props = {}) {
		if (element == null) {
			throw "Modal: element is null or undefined";
		}

		let target = this;
		target.__add_to_collection();

		target.__element = element;
		target.__visible = false;
		target.__only_discarding = props.only_discarding || false;
		target.onShowCallback = props.onShow || null;
		target.onHideCallback = props.onHide || null;

		if (target.__only_discarding) {
			let header = null;
			if (target.__element.querySelector('.modal__header')) {
				header = target.__element.querySelector('.modal__header');
			} else {
				header = document.createElement('div');
				header.className = 'modal__header';
				target.__element.insertBefore(header, target.__element.firstChild);
			}

			var closeButton = document.createElement('div');
			closeButton.className = 'modal__header__close';
			header.appendChild(closeButton);

			closeButton.onclick = () => target.__overlay.destroy();
		}
	}

	get element() {
		return this.__element;
	}

	get visible() {
		return this.__visible;
	}

	get only_discarding() {
		return this.__only_discarding;
	}

	set only_discarding(value) {
		this.__only_discarding = value || false;
	}

	set onShow(func) {
		this.onShowCallback = func || null;
	}

	set onHide(func) {
		this.onHideCallback = func || null;
	}

	show() {
		let target = this;
		target.__hide_others();

		let element = target.__element;
		let modal_height = (window.getComputedStyle(element, null)).getPropertyValue('height');

		element.classList.remove('modal--hide');
		element.classList.add('modal--show');

		if (element.getElementsByClassName('modal__content').length == 0) {
			throw "Modal: need an element .modal__content";
		}

		let modal_content = element.getElementsByClassName('modal__content')[0];
		modal_content.style.height = (modal_height - 46 - 39).toString() + 'px';

		target.__overlay = new Overlay({
			onDestroy: () => target.hide(),
			disableClick: target.__only_discarding
		});

		let modal_discard_list = target.element.querySelectorAll('.modal__discard, .modal__header__close');
		for (let i = 0; i < modal_discard_list.length; i++) {
		    let current = modal_discard_list[i];
            current.addEventListener('click', () => target.__overlay.destroy());
        }

		target.__visible = true;		
		target.element.style.display = 'block';

		if (target.onShowCallback) {
			target.onShowCallback(target);
		}
	}

	hide() {
		let target = this;
		let element = target.__element;
		element.classList.remove('modal--show');
		element.classList.add('modal--hide');

		this.__visible = false;

		setTimeout(() => element.style.display = 'none', 300);

		if (target.onHideCallback) {
			target.onHideCallback(target);
		}
	}

	toggle() {
		let target = this;
		if (target.__visible) {
			target.hide();
		} else {
			target.show();
		}
	}

	__add_to_collection() {
		let target = this;
		if (!__modals_collection.includes(target)) {
			__modals_collection.push(target);
		}
	}

	__hide_others() {
		let target = this;
		for (let modal of __modals_collection) {
			if (modal != target) {
				if (modal.visible) {
					modal.hide();					
				}
			}
		}
	}
}