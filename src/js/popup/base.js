import { createPopper} from "@popperjs/core";

window.altronePopup = null;

document.body.addEventListener('click', e => {
    let target = e.target.closest('[data-popup]');

    if (!target) {
        if (e.target.closest('.popup')) {
            return;
        } else if (window.altronePopup) {
            window.altronePopup.destroy();
        }

        return;
    }

    const popupElement = document.querySelector(target.dataset.popup);

    if (!popupElement) {
        return;
    }

    if (window.altronePopup) {
        const latestPopupElement = window.altronePopup.state.elements.popper;

        if (latestPopupElement === popupElement) {
            window.altronePopup.destroy();
            window.altronePopup = null;
            return;
        } else {
            window.altronePopup.destroy();
        }
    }

    const placement = target.dataset.popupPlacement || 'auto';
    const positionType = target.dataset.popupPositionType || 'absolute';

    popupElement.classList.add('popup--visible');

    window.altronePopup = createPopper(target, popupElement, {
        placement: placement,
        strategy: positionType,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [8, 12]
                }
            }
        ]
    });
})