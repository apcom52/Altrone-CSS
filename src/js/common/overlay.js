import { createElement } from "./functions";

window.altroneCurrentOverlay = null;

export function createOverlay(selfDestroyable = true) {
    if (window.altroneCurrentOverlay) {
        return window.altroneCurrentOverlay;
    }

    window.altroneCurrentOverlay = createElement('div', document.body, {
        'class': 'overlay'
    });

    if (selfDestroyable) {
        window.altroneCurrentOverlay.addEventListener('click', destroyOverlay);
    }

    document.body.dispatchEvent(new Event('overlay.showed'));
}

export function destroyOverlay() {
    if (window.altroneCurrentOverlay) {
        window.altroneCurrentOverlay.remove();
        window.altroneCurrentOverlay = null;
    }

    document.body.dispatchEvent(new Event('overlay.hidden'));
}