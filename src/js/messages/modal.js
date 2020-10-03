import { createFocusTrap} from "focus-trap";

window.altroneCurrentModal = null;

const ModalModificators = {
    show: 'modal--show',
    bodyScrollFix: 'body--fix'
}

const ModalEvents = {
    show: 'modal.show',
    showed: 'modal.showed',
    hide: 'modal.hide',
    hidden: 'modal.hidden'
}

class Modal {
    constructor(modalElement, options = {}) {
        if (!modalElement) {
            throw new Error('Modal: element is null');
        }

        const defaultOptions = {
            overlayVisible: true,
            overlayClose: true,
            escClose: true,
            focusTrap: true,
            onShow: null,
            onShowed: null,
            onHide: null,
            onHidden: null
        }

        this.modal = modalElement;
        this.options = {...defaultOptions, options};
        this.focusTrap = null;

        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onESCPress = this.onESCPress.bind(this);
    }

    show() {
        this.modal.dispatchEvent(new Event(ModalEvents.show));
        window.altroneCurrentModal = this;

        this.modal.classList.add(ModalModificators.show);
        document.body.classList.add(ModalModificators.bodyScrollFix);

        if (this.options.overlayClose) {
            this.modal.addEventListener('click', this.onOverlayClick);
        }

        if (this.options.escClose) {
            document.body.addEventListener('keydown', this.onESCPress);
        }

        if (this.options.focusTrap) {
            this.focusTrap = createFocusTrap(this.modal);
            this.focusTrap.activate();
        }

        this.modal.dispatchEvent(new Event(ModalEvents.showed));
    }

    hide() {
        this.modal.dispatchEvent(new Event(ModalEvents.hide));
        window.altroneCurrentModal = null;

        this.modal.classList.remove(ModalModificators.show);
        document.body.classList.remove(ModalModificators.bodyScrollFix);
        this.modal.dispatchEvent(new Event(ModalEvents.hidden));

        this.modal.removeEventListener('click', this.onOverlayClick);
        document.body.removeEventListener('keydown', this.onESCPress);

        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    }

    updateOptions(options = {}) {
        this.options = {...this.options, ...options};
    }

    onOverlayClick(e) {
        if (this.options.overlayClose) {
            this.hide();
        }
    }

    onESCPress(e) {
        if (this.options.escClose) {
            if (e.code === 'Escape') {
                this.hide();
            }
        }
    }
}

document.body.addEventListener('click', e => {
    const closeButton = e.target.closest('[data-modal-close]');

    if (closeButton && window.altroneCurrentModal) {
        window.altroneCurrentModal.hide();
        return;
    }

    const targetElement = e.target.closest('[data-modal]');

    if (!targetElement) {
        return;
    }

    if (window.altroneCurrentModal) {
        window.altroneCurrentModal.hide();
    }

    const targetModalElement = document.body.querySelector(targetElement.dataset.modal);

    if (!targetModalElement) {
        return;
    }

    const targetModal = new Modal(targetModalElement);
    targetModal.show();
});