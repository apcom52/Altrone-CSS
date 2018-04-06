'use strict';

Array.prototype.remove = function(element) {
    for (let i = 0; i < this.length; i++) {
        if (element == this[i]) {
            this.splice(i, i);
            return element;
        }
    }
}

Array.prototype.random = function() {
    let items = this.slice();
    return items[Math.floor(Math.random()*items.length)];
};

class Cookie {
    isEnabled() {
        return navigator.cookieEnabled;
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {
        let expires = options.expires;
        if (typeof expires == "number" && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }

        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        this.setCookie(name, "", {
            expires: -1
        });
    }
}

function createElement(tagName = 'div', className = '', id = '', attrs = {}, innerText = '') {
    let element = document.createElement(tagName);
    if (className) element.className = className;
    if (id) element.id = id;
    if (attrs) {
        Object.keys(attrs).map((current, index, keys) => {
            element.setAttribute(current, attrs[current]);
        });
    }
    if (innerText) element.innerText = innerText;
    return element;
}

function swipe(startX, startY, endX, endY) {
    let dist = endX - startX;
    let ydist = Math.abs(endY - startY) <= 50;
    if (dist >= 150 && ydist) return 'left';
    else if (dist <= -150 && ydist) return 'right';
    return null;
}

function getCoordinates(element) {
    let box = element.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}