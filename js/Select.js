'use strict';

class Select {
    /**
     * Constructor of Select
     * @param {node} objectSender
     * @param {Object} props
     */
    constructor(objectSender, props = {}) {
        if (objectSender == null) {
            throw "Select: objectSender is null or undefined";
        }

        let target = this;
        target.__element = objectSender;
        target.__options = props.options || null;

        if (!target.__options || !target.__options.length) {
            throw  "Select: props.options is empty or undefined";
        }

        target.__visible = false;
        target.__position = props.position || "bottom";
        target.__index = props.selectedIndex || 0;
        target.__selectOptions = props.options || ['None'];
        target.__optionsSource = target.__selectOptions;
        target.__editable = props.editable || false;
        target.OnChangeCallback = props.onChange || null;
        target.__selectOptionsMaxWidth = null;
        target.__selectOptionsElement = null;
        target.__value = null;

        target.__selectMenu = document.createElement('div');
        target.__selectMenu.className = 'select__menu';

        target.__element.appendChild(target.__selectMenu);

        target.__selectMenu.onclick = () => target.toggle();
        target.__onResizeEvent = () => target.__setPosition();
        target.__buildDOM();
        target.select(target.__index);

        if (target.__editable) {
            target.__selectMenu.setAttribute('contenteditable', true);
            target.__selectMenu.onkeydown = (e) => {
                if (e.which != 13) {
                    target.__editablePopup(e);
                } else {
                    target.__selectMenu.innerText = target.__value;
                    target.__editablePopup(e);
                    return false;
                }
            }
        }
    }

    /**
     * Return the value of parameter 'visible'
     * @returns {boolean}
     */
    get visible() {
        return this.__visible;
    }

    /**
     * Return the value of parameter 'position'
     * @returns {string}
     */
    get position() {
        return this.__position;
    }

    /**
     * Return the value of parameter 'selectedIndex'
     * @returns {int}
     */
    get selectedIndex() {
        return this.__index;
    }

    /**
     * Return the list of parameter 'options'
     * @returns {Array}
     */
    get options() {
        return this.__options;
    }

    /**
     * Return the selected item
     * @returns {string}
     */
    get value() {
        return this.__value;
    }

    /**
     * Set new callback for onChangeEvent
     * @param {Function} func
     */
    set onChange(func) {
        this.OnChangeCallback = func || null;
    }

    /**
     * Open Selectbox
     */
    show() {
        let target = this;

        target.__visible = true;

        target.__selectMenu.classList.add('select__menu--open');
        target.__selectOptionsElement.style.visibility = 'visible';
        target.__setPosition();

        window.addEventListener('resize', target.__onResizeEvent, false);
    }

    /**
     * Hide Selectbox
     */
    hide() {
        let target = this;
        target.__visible = false;
        target.__selectMenu.classList.remove('select__menu--open');
        target.__selectOptionsElement.style.visibility = 'hidden';

        if (target.__selectMenu.innerText.trim().length == 0) {
            target.__selectMenu.innerText = target.__options[target.__index];
        }

        window.removeEventListener('resize', target.__onResizeEvent, false);
    }

    /**
     * Change visibility of Selectbox (show or hide)
     */
    toggle() {
        let target = this;
        if (target.__visible) target.hide();
        else target.show();
    }

    /**
     * Select item in Selectbox
     * @param {int} index
     */
    select(index) {
        let target = this;

        if (index < 0 || index >= target.__options.length) {
            throw 'Select: invalid index value';
        }

        target.__index = index;
        target.__selectMenu.innerText = target.__options[index];
        target.__value = target.__options[index];

        for (let node_index = 0; node_index < target.__selectOptionsElement.childNodes.length; node_index++) {
            let node = target.__selectOptionsElement.childNodes[node_index];
            node.classList.remove('select__options__item--active');
        }

        target.__selectOptionsElement.childNodes[index].classList.add('select__options__item--active');

        if (target.onChangeCallback) {
            target.OnChangeCallback(target);
        }

        target.__setPosition();
        target.hide();
    }

    __editablePopup(e) {
        let target = this;
        console.log(e.which);

        let value = target.__selectMenu.innerText.trim();
        for (let element of target.__selectOptionsElement.childNodes) {
            if (element.innerText.toLowerCase().includes(value.toLowerCase())) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }

        target.__setPosition();
        target.__value = target.__selectMenu.innerText;
    }

    __setPosition() {
        console.log('set position');
        let target = this;
        let [options_width, menu_width] = [target.__selectOptionsElement.offsetWidth, target.__selectMenu.offsetWidth];

        if (!target.__selectOptionsMaxWidth) {
            target.__selectOptionsMaxWidth = options_width;
            target.__selectMenu.style.minWidth = options_width + 'px';
        }

        target.__selectOptionsElement.style.width = menu_width + 'px';
        target.__selectOptionsElement.style.left = (target.__selectMenu.offsetLeft) + 'px';

        if (target.__position == 'top') {
            let options_height = target.__selectOptionsElement.offsetHeight;
            let menu_top = target.__selectMenu.offsetTop;
            target.__selectOptionsElement.style.top = (menu_top - options_height) + 'px';
        }
    }

    __buildDOM() {
        let target = this;
        if (target.__selectOptionsElement) {
            target.__selectOptionsElement.remove();
        }

        target.__selectOptionsElement = document.createElement('div');
        target.__selectOptionsElement.className = 'select__options';

        if (target.__position == 'top') {
            target.__selectOptionsElement.classList.add('select__options--top');
            target.__selectMenu.classList.add('select__menu--top');
        }

        target.__options.forEach((option, index) => {
            let selectOption = document.createElement('div');
            selectOption.className = 'select__options__item';
            selectOption.innerText = option;
            selectOption.onclick = () => target.select(index);
            target.__selectOptionsElement.appendChild(selectOption);
        });

        target.__element.appendChild(target.__selectOptionsElement);

        target.__setPosition();
    }
}
