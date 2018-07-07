class Select {
    /**
     * Constructor of Select
     * @param {Node} objectSender
     * @param {Object} props
     */
    constructor(objectSender, props = {}) {
        if (objectSender === null) {
            throw "Select: objectSender is null or undefined";
        }

        let target = this;
        target.__element = objectSender;
        target.__options = target.__element.getElementsByClassName('select__option') || null;

        if (!target.__options || !target.__options.length) {
            throw  "Select: no options in select";
        }

        target.__visible = false;
        target.__position = props.position || "bottom";
        target.__index = props.selectedIndex || 0;
        target.__selectOptions = props.options || ['None'];
        target.__optionsSource = target.__selectOptions;
        target.__editable = props.editable || false;
        target.__disabled = props.disabled || false;
        target.__name = props.name || null;
        target.OnChangeCallback = props.onChange || null;
        target.__selectOptionsMaxWidth = null;
        target.__selectOptions = null;
        target.__value = null;

        if (!target.__element.hasAttribute('tabindex')) {
            target.__element.setAttribute('tabindex', 0);
        }

        target.__selectMenu = createElement('div', 'select__menu');
        target.__element.appendChild(target.__selectMenu);
        target.__input = null;

        if (target.__name) {
            target.__input = createElement('input', '', '', {name: target.__name, type: 'hidden'});
            target.__element.appendChild(target.__input);
        }

        target.__selectMenu.onclick = () => target.toggle();
        target.__element.onkeydown = (e) => {
            if (e.keyCode === 32) {
                e.preventDefault();
                target.toggle();
            } else if (e.keyCode === 38) {
                e.preventDefault();
                target.select(target.__index - 1, true);
            } else if (e.keyCode === 40) {
                e.preventDefault();
                target.select(target.__index + 1, true);
            }
        };
        target.__onResizeEvent = () => target.__setPosition();
        target.__buildDOM();
        target.select(target.__index);

        if (target.__editable) {
            target.__selectMenu.setAttribute('contenteditable', true);
            target.__selectMenu.onkeydown = (e) => {
                if (e.which !== 13) {
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
     * Return an input attribute 'name' value
     * @returns {String}
     */
    get name() {
        return this.__name;
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
     * Get state of Select
     * @returns {Boolean}
     */
    get disabled() {
        return this.__disabled;
    }

    /**
     * Set new callback for onChangeEvent
     * @param {Function} func
     */
    set onChange(func) {
        this.OnChangeCallback = func || null;
    }

    /**
     * Set state (enabled/disabled)
     * @param {Boolean} value
     */
    set disabled(value) {
        this.__disabled = value;

        if (this.__visible) this.hide(true);

        if (value) this.__element.classList.add('select--disabled');
        else this.__element.classList.remove('select--disabled');
    }

    /**
     * Open Selectbox
     */
    show() {
        let target = this;

        if (!target.__disabled) {
            target.__visible = true;

            target.__selectMenu.classList.add('select__menu--open');
            target.__selectOptions.style.display = 'block';
            target.__setPosition();

            window.addEventListener('resize', target.__onResizeEvent, false);
        }
    }

    /**
     * Hide Selectbox
     */
    hide(ignoreDisabled = false) {
        let target = this;

        if (!target.__disabled || ignoreDisabled) {
            target.__visible = false;
            target.__selectMenu.classList.remove('select__menu--open');
            target.__selectOptions.style.display = 'none';

            if (target.__selectMenu.innerText.trim().length === 0) {
                target.__selectMenu.innerText = target.__options[target.__index];
            }

            window.removeEventListener('resize', target.__onResizeEvent, false);
        }
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
     * @param {Boolean} using_keyboard
     */
    select(index = 0, using_keyboard = false) {
        let target = this;

        if (index < 0 || index >= target.__options.length) {
            if (!using_keyboard) throw 'Select: invalid index value';
            return;
        }

        target.__index = index;
        target.__selectMenu.innerText = target.__options[index].innerText;
        target.__value = target.__options[index];

        for (let node_index = 0; node_index < target.__selectOptions.childNodes.length; node_index++) {
            let node = target.__selectOptions.childNodes[node_index];
            node.classList.remove('select__option--active');
        }

        target.__selectOptions.childNodes[index].classList.add('select__option--active');

        if (target.onChangeCallback) {
            target.OnChangeCallback(target);
        }

        if (target.__input) {
            if (target.__value.hasAttribute('data-value')) target.__input.value = target.__value.getAttribute('data-value');
            else target.__input.value = target.__index;
        }

        target.__setPosition();

        if (!using_keyboard) target.hide();
    }

    __editablePopup() {
        let target = this;

        let value = target.__selectMenu.innerText.trim();
        for (let element of target.__selectOptions.childNodes) {
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
        let target = this;
        let [options_width, menu_width] = [target.__selectOptions.offsetWidth, target.__selectMenu.offsetWidth];

        if (!target.__selectOptionsMaxWidth) {
            target.__selectOptionsMaxWidth = options_width;
            target.__selectMenu.style.minWidth = options_width + 'px';
        }

        target.__selectOptions.style.width = menu_width + 'px';
        target.__selectOptions.style.left = (target.__selectMenu.offsetLeft) + 'px';

        if (target.__position === 'top') {
            let options_height = target.__selectOptions.offsetHeight;
            let menu_top = target.__selectMenu.offsetTop;
            target.__selectOptions.style.top = (menu_top - options_height) + 'px';
        }
    }

    __buildDOM() {
        let target = this;
        if (target.__selectOptions) {
            target.__selectOptions.remove();
        }

        target.__selectOptions = createElement('div', 'select__options');

        if (target.__position === 'top') {
            target.__selectOptions.classList.add('select__options--top');
            target.__selectMenu.classList.add('select__menu--top');
        }

        Array.from(target.__options).forEach((option, index) => {
            let select_option = option.cloneNode(true);
            select_option.onclick = () => target.select(index);
            target.__selectOptions.appendChild(select_option);
            option.remove();
        });

        target.__element.appendChild(target.__selectOptions);

        target.__setPosition();
    }
}
