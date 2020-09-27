import { createElement } from "./functions";

window.altroneCurrentOverlay = null;

export function createOverlay(selfDestroyable = true) {
    if (window.altroneCurrentOverlay) {
        return window.altroneCurrentOverlay;
    }

    window.altroneCurrentOverlay = createElement('div', document.body, {
        'class': 'overlay'
    });

    console.log(window.altroneCurrentOverlay);

    if (selfDestroyable) {
        window.altroneCurrentOverlay.addEventListener('click', destroyOverlay());
    }
}

export function destroyOverlay() {
    if (window.altroneCurrentOverlay) {
        window.altroneCurrentOverlay.remove();
    }
}