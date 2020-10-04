import { createFocusTrap } from "focus-trap";

window.altroneCurrentSidebar = null;

const SidebarEvents = {
    show: 'sidebar.show',
    showed: 'sidebar.showed',
    hide: 'sidebar.hide',
    hidden: 'sidebar.hidden'
}

const SidebarModificators = {
    visible: 'sidebar--visible',
    bodyScrollFix: 'body--fix'
}

class Sidebar {
    constructor(element, options = {}) {
        if (!element) {
            throw new Error("Sidebar: element is null");
        }

        this.defaultOptions = {
            escClose: true,
            focusTrap: true,
            onShow: null,
            onShowed: null,
            onHide: null,
            onHidden: null
        }

        this.sidebar = element;
        this.options = {...this.defaultOptions, ...options};
        this.focusTrap = null;

        this.onOverlayClick = this.onOverlayClick.bind(this);
        this.onESCPress = this.onESCPress.bind(this);
    }

    open() {
        this.sidebar.dispatchEvent(new Event(SidebarEvents.show));
        this.sidebar.classList.add(SidebarModificators.visible);

        this.sidebar.addEventListener('click', this.onOverlayClick);

        document.body.classList.add(SidebarModificators.bodyScrollFix);

        if (this.options.escClose) {
            document.body.addEventListener('keydown', this.onESCPress);
        }

        if (this.options.focusTrap) {
            this.focusTrap = createFocusTrap(this.sidebar);
            this.focusTrap.activate();
        }

        this.sidebar.dispatchEvent(new Event(SidebarEvents.showed));
    }

    close() {
        this.sidebar.dispatchEvent(new Event(SidebarEvents.hide));
        this.sidebar.classList.remove(SidebarModificators.visible);

        document.body.classList.remove(SidebarModificators.bodyScrollFix);

        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }

        this.sidebar.dispatchEvent(new Event(SidebarEvents.hidden));
    }

    onOverlayClick(e) {
        if (e.target.classList.contains('sidebar')) {
            this.close();
        }
    }

    onESCPress(e) {
        if (e.code === 'Escape') {
            this.close();
        }
    }
}

document.body.addEventListener('click', e => {
    const targetElement = e.target.closest('[data-sidebar]');

    if (!targetElement) {
        return;
    }

    if (window.altroneCurrentSidebar) {
        window.altroneCurrentSidebar.close();
    }

    const targetSidebarElement = document.body.querySelector(targetElement.dataset.sidebar);

    if (!targetSidebarElement) {
        return;
    }

    const targetSidebar = new Sidebar(targetSidebarElement);
    targetSidebar.open();
});