class ToggleButton {
	constructor(objectSender, props = {}) {
		if (objectSender == null) {
			throw "ToggleButton: objectSender is null or undefined";
		}

		let target = this;
		target.__element = objectSender;
		target.__activated = props.activated || false;
		target.onActivateCallback = props.onActivate || false;
		target.onDeactivateCallback = props.onDeactivate || false;
		target.onChangeCallback = props.onChange || false;

		target.__element.addEventListener('click', target.toggle.bind(this));
	}

	get isActivated() {
		return this.__activated;
	}

	get element() {
		return this.__element;
	}

	set onActivate(func) {
		this.onActivateCallback = func || null;
	}

	set onDeactivate(func) {
		this.onDeactivateCallback = func || null;
	}

	set onChange(func) {
		this.onChangeCallback = func || null;
	}

	activate() {
		let target = this;

		if (target.__activated) {
			console.warn('ToggleButton: element is already activated');
			return;
		}

		target.element.classList.add('button--checked');
		target.__activated = true;

		if (target.onActivateCallback) {
			target.onActivateCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
		}
	}

	deactivate() {
		let target = this;

		if (!target.__activated) {
			console.warn('ToggleButton: element is already deactivated');
			return;
		}

		target.element.classList.remove('button--checked');
		target.__activated = false;

		if (target.onDeactivateCallback) {
			target.onDeactivateCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
		}
	}

	toggle() {
		let target = this;
		if (target.__activated) {
			target.deactivate();
		} else {
			target.activate();
		}
	}
}