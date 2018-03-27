class Popup {
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
}