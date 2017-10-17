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