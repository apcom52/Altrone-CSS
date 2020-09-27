import {createOverlay, destroyOverlay} from "../common/overlay";

window.altroneModalsInstances = [];
window.altroneCurrentModal = null;

class Modal {
    constructor(modalElement, options = {}) {
        if (!modalElement) {
            throw new Error('Modal: element is null');
        }

        const defaultOptions = {
            disableOverlay: false,
            disableOverlayClose: false,
            onShow: null,
            onShowed: null,
            onHide: null,
            onHidden: null
        }

        this.modal = modalElement;
        this.options = {...defaultOptions, options};

        window.altroneModalsInstances.push(this);
    }

    show() {
        if (!this.options.disableOverlay) {
            createOverlay();
        }

        this.modal.classList.add('modal--show');

        window.altroneCurrentModal = this;
    }

    hide() {
        if (window.altroneCurrentOverlay) {
            destroyOverlay();
        }

        window.altroneCurrentModal = null;

        this.modal.classList.remove('modal--show');
    }

    static getModal(modalElement) {
        const modal = window.altroneModalsInstances.find((modalInstance) => {
            return modalInstance.modal === modalElement;
        });

        if (modal) {
            return modal;
        } else {
            return new Modal(modalElement);
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

    const showTargetModal = function() {
        const targetModalElement = document.body.querySelector(targetElement.dataset.modal);

        if (!targetModalElement) {
            return;
        }

        const targetModal = Modal.getModal(targetModalElement);

        targetModal.show();
    }

    if (window.altroneCurrentModal) {
        window.altroneCurrentModal.hide();
    }

    showTargetModal();
});

document.body.addEventListener('overlay.hidden', (e) => {
    if (window.altroneCurrentModal && window.altroneCurrentModal.options.disableOverlayClose === false) {
        window.altroneCurrentModal.hide();
    }
})