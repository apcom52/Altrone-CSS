class Popup {
    constructor(sender, dropdown) {
        let target = this;
        target.__sender = sender;
        target.__dropdown = dropdown;
        target.__side = 'bottom';
        target.__sender.addEventListener('click', target.__toggle);
        window.addEventListener('resize', target.__calculatePosition.bind(this));
        window.addEventListener('scroll', target.__calculatePosition.bind(this));
        console.log(target);
    }

    __calculatePosition() {
        let target = this;
        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
        let senderWidth = target.__sender.offsetWidth,
            senderHeight = target.__sender.offsetHeight;
        let senderLeft = getCoordinates(target.__sender).left,
            senderTop = getCoordinates(target.__sender).top,
            senderRight = senderLeft + senderWidth,
            senderBottom = senderTop + senderHeight;
        let popupWidth = target.__dropdown.offsetWidth,
            popupHeight = target.__dropdown.offsetHeight;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let popupLeft = 0,
            popupTop = 0;

        if (senderBottom + popupHeight <= windowHeight) {
            popupLeft = senderLeft;
            popupTop = senderBottom;
            target.__side = 'bottom';
        } else if (senderTop - popupHeight > 0) {
            popupLeft = senderLeft;
            popupTop = senderTop - popupHeight;
            target.__side = 'top';
        } else if (senderLeft + popupWidth <= windowWidth) {
            popupLeft = senderRight;
            popupTop = senderTop;
            target.__side = 'right';
        } else {
            popupLeft = senderLeft - popupWidth;
            popupTop = senderTop;
            target.__side = 'left';
        }


        if (popupLeft < 0) popupLeft = 0;
        else if (popupLeft >= windowWidth) popupLeft = windowWidth - popupWidth;
        if (popupTop < 0) popupTop = 0;
        else if (popupTop >= (scrollTop + windowHeight)) popupTop = (scrollTop + windowHeight) - popupHeight;

        target.__dropdown.style.left = popupLeft + 'px';
        target.__dropdown.style.top = popupTop + 'px';
    }

    show() {
        let target = this;
        target.__dropdown.classList.add('popup--show');
        target.__calculatePosition();
        target.__dropdown.classList.add('popup--position-' + target.__side);

        if (Popup.currentDropdown) Popup.currentDropdown.hide();
        Popup.currentDropdown = target;
    }

    hide() {
        let target = this;
        target.__dropdown.classList.remove('popup--position-' + target.__side);
        setTimeout(() =>  target.__dropdown.classList.remove('popup--show'), 500);
        Popup.currentDropdown = null;
    }

    toggle() {
        let target = this;
        if (target.__dropdown.classList.contains('popup--show')) target.hide();
        else target.show();
    }
}

Popup.currentDropdown = null;