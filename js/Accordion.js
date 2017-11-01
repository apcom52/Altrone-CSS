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

        console.log(target.__accordionItems);

        for (let index = 0; index < target.__accordionItems.length; index++) {
            let current = target.__accordionItems[index];
            let itemNodes = current.children;
            console.log(itemNodes);
            for (let j = 0; j < itemNodes.length; j++) {
                if (itemNodes[j].classList.contains('accordion__item__title')) {
                    itemNodes[j].onclick = () => target.open(index);
                }
            }

        }
    }

    /**
     * Return the dom-element of Accordion
     * @returns {node}
     */
    get element() {
        return this.__element;
    }

    /**
     * Return the value of property 'multi'
     * @returns {bool}
     */
    get multi() {
        return this.__multi;
    }

    /**
     * Set the value of property 'multi'
     * @param {bool} value - new value
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

            if (!target.__multi && !current.classList.contains('accordion__item--active'))
                target.closeAll();

            current.classList.toggle('accordion__item--active');
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
            target.__accordionItems[index].classList.remove('accordion__item--active');
        }
    }
}