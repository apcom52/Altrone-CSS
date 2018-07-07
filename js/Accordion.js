class Accordion {
    /**
     * Constructor of Accordion
     * @param {node} element
     * @param {Object} options
     */
    constructor(element, options = {}) {
        if (element == null) {
            throw "Accordion: element is null or undefined";
        }

        let target = this;
        target.__element = element;
        target.__multi = options.multi || false;
        target.__accordionItems = target.__element.children;

        for (let index = 0; index < target.__accordionItems.length; index++) {
            let current = target.__accordionItems[index];
            let itemNodes = current.children;
            for (let j = 0; j < itemNodes.length; j++) {
                if (itemNodes[j].classList.contains('section__title')) {
                    itemNodes[j].onclick = () => target.open(index);
                }
            }

        }
    }

    /**
     * Return the dom-element of Accordion
     * @returns {Node}
     */
    get element() {
        return this.__element;
    }

    /**
     * Return the value of property 'multi'
     * @returns {Boolean}
     */
    get multi() {
        return this.__multi;
    }

    /**
     * Set the value of property 'multi'
     * @param {Boolean} value - new value
     */
    set multi(value) {
        this.__multi = value || false;
    }

    /**
     * Open selected accordion-item
     * @param {int} index
     */

    open(index = 0) {
        let target = this;
        if (index >= 0 && index < target.__accordionItems.length) {
            let current = target.__accordionItems[index];

            if (!target.__multi && !current.classList.contains('section--active'))
                target.closeAll();

            current.classList.toggle('section--active');
        } else {
            throw "Accordion: invalid index";
        }
    }

    /**
     * Close all accordion-items
     */
    closeAll() {
        let target = this;
        for (let index = 0; index < target.__accordionItems.length; index++) {
            target.__accordionItems[index].classList.remove('section--active');
        }
    }
}