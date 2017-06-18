'use strict';

var __overlay_collection = new Array();

class Overlay {
	constructor(props = {}) {
		let target = this;

		target.__add_to_collection();
		target.__remove_others();
		target.onDestroyCallback = props.onDestroy || null;
		target.disableClick = Boolean(props.disableClick) || true;

		let element = document.createElement('div');
		element.className = 'overlay';
		document.body.appendChild(element);
		target.element = element;

		element.onclick = function() {
			if (target.disableClick) 
				target.destroy();
		}
	}

	set onDestroy(event) {
		this.onDestroyCallback = event || null;
	}

	destroy() {
		let target = this;
		
		target.__remove_from_collection(target);
		target.element.remove();

		if (target.onDestroyCallback) {
			target.onDestroyCallback(target);	
		}
	}

	__add_to_collection() {
		let target = this;
		if (!__overlay_collection.includes(target)) {
			__overlay_collection.push(target);
		}
	}

	__remove_others() {
		let target = this;
		for (let overflow of __overlay_collection) {
			if (overflow != target) {
				overflow.destroy();
				target.__remove_from_collection(overflow);
			}
		}
	}

	__remove_from_collection(overflow) {
		let target = this;
		let index = __overlay_collection.indexOf(overflow);
		if (index > -1) {
			__overlay_collection.splice(index, 1);
		}
	}
}