'use strict';

class Dialog {
	constructor(props) {
		let target = this;

		target.__title = props.title || 'Empty title';
		target.__message = props.message || 'Empty message';
		target.__successLabel = props.successLabel || 'OK';
		target.__failLabel = props.failLabel || 'Cancel';
		target.__invert = props.invert || false;
		target.onSuccessCallback = props.onSuccess || null;
		target.onFailCallback = props.onFail || null;
		target.onShowCallback = props.onShow || null;
		target.onHideCallback = props.onHide || null;
	}

	get title() {
		return this.__title;
	}

	get message() {
		return this.__message;
	}

	get invert() {
		return this.__invert;
	}

	get successLabel() {
		return this.__successLabel;
	}

	get failLabel() {
		return this.__failLabel;
	}

	set title(value) {
		this.__title = value || 'Empty title';
	}

	set message(value) {
		this.__message = value || 'Empty message';
	}

	set invert(value) {
		this.__invert = Boolean(value) || false;
	}

	set successLabel(value) {
		this.__successLabel = value || 'OK';
	}

	set failLabel(value) {
		this.__failLabel = value || 'Cancel';
	}

	set onSuccess(func) {
		this.onSuccessCallback = func || null;
	}

	set onFail(func) {
		this.onFailCallback = func || null;
	}

	set onShow(func) {
		this.onShowCallback = func || null;
	}

	set onHide(func) {
		this.onHideCallback = func || null;
	}

	show() {
		let target = this;
		
		target.modal_body = document.createElement('div');
		target.modal_body.className = 'modal';

		if (target.__invert) {
			target.modal_body.classList.add('modal--invert');
		}

		target.modal = new Modal(target.modal_body, {
			onShow: target.onShowCallback,
			onHide: () => target.hide()
		});

		let modal_header = document.createElement('div');
		modal_header.className = 'modal__header';
		modal_header.innerHTML = target.__title;

		let modal_content = document.createElement('div');
		modal_content.className = 'modal__content';
		modal_content.innerHTML = target.__message;

		let modal_footer = document.createElement('div');
		modal_footer.className = 'modal__footer';

		let modal_cancelButton = document.createElement('button');
		if (target.__invert) {
			modal_cancelButton.className = 'button button--color-black modal__discard';			
		} else {
			modal_cancelButton.className = 'button modal__discard';			
		}

		if (target.onSuccessCallback) {
			let modal_okButton = document.createElement('button');
			modal_okButton.className = 'button button--color-green modal__discard';
			modal_okButton.innerHTML = target.__successLabel;
			modal_okButton.onclick = function() {
				target.onSuccessCallback(target);
			}

			modal_footer.appendChild(modal_okButton);
		} else {
			modal_cancelButton.className = 'button button--color-green modal__discard';
		}

		modal_cancelButton.innerHTML = target.__failLabel;

		modal_footer.appendChild(modal_cancelButton);

		target.modal_body.appendChild(modal_header);
		target.modal_body.appendChild(modal_content);
		target.modal_body.appendChild(modal_footer)

		document.body.appendChild(target.modal_body);		

		modal_cancelButton.onclick = function() {
			if (target.onFailCallback) {
				target.onFailCallback(target);		
			}
		}

		target.modal.show();
	}

	hide() {
		let target = this;

		if (target.onHideCallback) {
			target.onHideCallback(target);
		}
		
		target.modal_body.remove();
	}
}