'use strict';

class InputModal {
    get contentTypeInteger() { return 'number' };
    get contentTypeString() { return 'text' };
    get contentTypeURL() { return 'url' };
    get contentTypeMail() { return 'mail' };

    constructor(props = {}) {
        let target = this;

        target.__title = props.title || 'Empty title';
        target.__placeholder = props.placeholder || '';
        target.__successLabel = props.successLabel || 'OK';
        target.__failLabel = props.failLabel || 'Cancel';
        target.__invert = props.invert || false;
        target.__contentType = props.contentType || target.contentTypeString;
        target.__regexp = props.regexp || null;
        target.__value = props.value || null;
        target.onSuccessCallback = props.onSuccess || null;
        target.onFailCallback = props.onFail || null;
        target.onShowCallback = props.onShow || null;
        target.onHideCallback = props.onHide || null;
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

        let form = document.createElement('form');
        form.className = 'form form--fit';

        let inputField = document.createElement('input');
        inputField.setAttribute('type', target.__contentType);
        inputField.setAttribute('placeholder', target.__placeholder);
        form.appendChild(inputField);

        modal_content.appendChild(form);

        let modal_footer = document.createElement('div');
        modal_footer.className = 'modal__footer align-center';

        target.modal_body.appendChild(modal_header);
        target.modal_body.appendChild(modal_content);
        target.modal_body.appendChild(modal_footer);

        document.body.append(target.modal_body);
        target.modal.show();
    }
}