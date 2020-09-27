import {createOverlay, destroyOverlay} from "../common/overlay";

window.altroneCurrentModals = [];

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

        console.log('constructor', this);
        window.altroneCurrentModals.push(this);
    }

    show() {
        createOverlay();
        return new Promise((resolve, reject) => {
            console.log('promise', this);

            this.modal.classList.add('modal--show');
            setTimeout(() => {
                resolve(this);
            }, 300);
        })
    }

    hide() {
        return new Promise((resolve, reject) => {
            this.modal.classList.remove('modal--show');
            setTimeout(() => {
                destroyOverlay();
                resolve(this);
            }, 300);
        });
    }

    static getModal(modalElement) {
        const modal = window.altroneCurrentModals.find((modalInstance) => {
            return modalInstance.modal === modalElement;
        });

        if (modal) {
            console.log('find in existings modals', modal);
            return modal;
        } else {
            console.log('create new modal');
            return new Modal(modalElement);
        }
    }
}

console.log('modal init');

document.body.addEventListener('click', e => {
    const currentModalElement = document.body.querySelector('.modal--show');
    const closeButton = e.target.closest('[data-modal-close]');

    if (closeButton && currentModalElement) {
        const currentModal = Modal.getModal(currentModalElement);
        currentModal.hide();
        return;
    }

    const targetElement = e.target.closest('[data-modal]');

    if (!targetElement) {
        return;
    }

    const showTargetModal = function() {
        const targetModalElement = document.body.querySelector(targetElement.dataset.modal);

        console.log(targetModalElement);
        if (!targetModalElement) {
            return;
        }

        const targetModal = Modal.getModal(targetModalElement);
        console.log(targetModal);

        targetModal.show();
    }

    if (currentModalElement) {
        const currentModal = Modal.getModal(currentModalElement);

        currentModal.hide().then(showTargetModal);
    } else {
        showTargetModal();
    }
})