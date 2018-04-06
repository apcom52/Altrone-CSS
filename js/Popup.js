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

        console.log(senderTop);

        if (senderBottom + popupHeight <= windowHeight) {
            popupLeft = senderLeft;
            popupTop = senderBottom;
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

        console.log(scrollTop);
        console.log(popupLeft, popupTop);

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
        console.log(target);
        if (target.__dropdown.classList.contains('popup--show')) target.hide();
        else target.show();
    }
}

Popup.currentDropdown = null;

/*class Popup {
    constructor(element, objectSender, options = {}) {
        if (element === null) {
            throw "Accordion: element is null or undefined";
        }

        let target = this;
        target.__popup = element;
        target.__sender = objectSender;
        target.__isVisible = false;

        Array.from(target.__popup.getElementsByClassName('popup__close'), (current) => {
            current.onclick = () => target.hide();
        });
    }

    show() {
        let target = this;
        target.__popup.style.display = 'flex';
        target.__setPosition();
        target.__isVisible = true;
    }

    hide() {
        let target = this;
        target.__popup.style.display = 'none';
        target.__isVisible = false;
    }

    toggle() {
        let target = this;
        if (!target.__isVisible) target.show();
        else target.hide();
    }

    __setPosition() {
        let target = this;
        let windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
        let senderRect = target.__sender.getBoundingClientRect();
        let senderLeft = senderRect.left,
            senderTop = senderRect.top,
            senderRight = senderRect.right,
            senderBottom = senderRect.bottom;
        let popupWidth = target.__popup.offsetWidth,
            popupHeight = target.__popup.offsetHeight;

        // расположить снизу от элемента
        const leftSide = senderLeft - popupWidth >= 0,
            topSide = senderTop - popupHeight >= 0,
            rightSide = senderRight + popupWidth <= windowWidth,
            bottomSide = senderTop + popupHeight <= windowHeight;

        console.log('sender', senderLeft, senderTop, senderRight, senderBottom);
        console.log(popupWidth, popupHeight);

        let popupLeft = 0,
            popupTop = 0;

        if (bottomSide) {
            if (senderLeft + popupWidth >= windowWidth) popupLeft = windowWidth - popupWidth;
            else popupLeft = senderLeft;
            popupTop = senderBottom;
        } else if (topSide) {
            if (senderLeft + popupWidth >= windowWidth) popupLeft = windowWidth - popupWidth;
            else popupLeft = senderLeft;
            popupTop = senderTop - popupHeight;
        } else if (leftSide) {
            if (senderLeft + popupWidth >= windowWidth) popupLeft = windowWidth - popupWidth;
            else popupLeft = senderLeft;
            popupTop = senderTop;
        } else if (rightSide) {
            popupLeft = senderRight;
            popupTop = senderTop;
        }

        console.log('popup', popupLeft, popupTop);
        target.__popup.style.left = popupLeft + 'px';
        target.__popup.style.top = popupTop + 'px';
    }
}*/