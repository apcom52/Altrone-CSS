/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_Utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_Overlay__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_Accordion__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_Carousel__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_Modal__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_Dialog__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_Progress__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_Select__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__js_Tabs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__js_ToggleButton__ = __webpack_require__(10);
/* Собирает все модули в единый файл */













/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var __overlay_collection = new Array();

class Overlay {
	constructor(props = {}) {
		let target = this;

		target.__add_to_collection();
		target.__remove_others();
		target.onDestroyCallback = props.onDestroy || null;
		target.disableClick = Boolean(props.disableClick) || false;

		let element = document.createElement('div');
		element.className = 'overlay';
		document.body.appendChild(element);
		target.element = element;

		element.classList.add('overlay--show');

		element.onclick = function() {
			if (target.disableClick == false) 
				target.destroy();
		}
	}

	set onDestroy(event) {
		this.onDestroyCallback = event || null;
	}

	destroy() {
		let target = this;
		
		target.element.classList.remove('overlay--show');
		target.element.classList.add('overlay--hide');

		target.__remove_from_collection(target);
		setTimeout(() => target.element.remove(), 300);

		if (target.onDestroyCallback) {
			target.onDestroyCallback(target);	
		}
	}

	__add_to_collection() {
		let target = this;
		if (!__overlay_collection.includes(target)) {
			__overlay_collection.push(target);
		}
	}

	__remove_others() {
		let target = this;
		for (let overflow of __overlay_collection) {
			if (overflow != target) {
				overflow.destroy();
				target.__remove_from_collection(overflow);
			}
		}
	}

	__remove_from_collection(overflow) {
		let target = this;
		if (__overlay_collection.length) {
			let index = __overlay_collection.indexOf(overflow);
			if (index > -1) {
				__overlay_collection.splice(index, 1);
			}
		}		
	}
}
/* unused harmony export Overlay */


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* unused harmony export Accordion */


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Carousel {

    /**
	 * Constructor of Carousel
     * @param {domElement} element - the parent block
     * @param {object} props - options
     */
	constructor(element, props = {}) {
		if (element == null) {
			throw "Carousel: element is null or undefined";
		}

		let target = this;
		target.__element = element;
		target.__slides = element.querySelectorAll('.carousel__item');
		target.__data = [];
		target.__length = target.__slides.length;
		target.__currentIndex = props.currentIndex || 0;
		target.__time = props.time || 0;
		target.__loop = props.loop;
		target.onChangeCallback = props.onChange || null;

		// Check every .carousel__item, get attributes and put them into target.__data
		[].forEach.call(target.__slides, function(slide) {
			target.__data.push({
				title: slide.dataset.title,
				description: slide.dataset.description,
				imageUrl: slide.dataset.imageUrl
			});
        });

		target.__carouselLeftButton = document.createElement('div');
		target.__carouselLeftButton.className = 'carousel__left';
		target.__carouselLeftButton.onclick = () => target.prev();

		target.__carouselRightButton = document.createElement('div');
        target.__carouselRightButton.className = 'carousel__right';
        target.__carouselRightButton.onclick = () => target.next();

        target.__carouselInfoPanel = document.createElement('div');
        target.__carouselInfoPanel.className = 'carousel__info';

        target.__carouselTitlePanel = document.createElement('div');
        target.__carouselTitlePanel.className = 'carousel__info__title';

        target.__carouselContentPanel = document.createElement('div');
        target.__carouselContentPanel.className = 'carousel__info__content';

        target.__element.appendChild(target.__carouselLeftButton);
        target.__element.appendChild(target.__carouselRightButton);
        target.__element.appendChild(target.__carouselInfoPanel);
        target.__carouselInfoPanel.appendChild(target.__carouselTitlePanel);
        target.__carouselInfoPanel.appendChild(target.__carouselContentPanel);

		target.__render();

		if (target.__time > 0) {
			target.__loop = true;
			setInterval(function() {
				target.next();
			}, target.__time);
		}
	}

    /**
	 * Get the parent block
     * @returns {domElement|*}
     */
	get element() {
		return this.__element;
	}

    /**
	 * Get the index of current slide
     * @returns {*}
     */
	get index() {
		return this.__currentIndex;
	}

    /**
	 * Get amount of slides in Carousel
     * @returns {*}
     */
	get length() {
		return this.__length;
	}

    /**
	 * Set current slide in Carousel (like a open())
     * @param {int} index - index of slide
     */
	set index(index) {
		this.open(index);
	}

    /**
	 * Set callback for onChange event
     * @param {Function} func - function
     */
	set onChange(func) {
		this.onChangeCallback = func || null;
	}

    /**
	 * Show previous slide
     * @returns {Carousel}
     */
	prev() {
		let target = this;
		target.open(target.__currentIndex - 1);

		return target;
	}

    /**
	 * Show next slide
     * @returns {Carousel}
     */
    next() {
        let target = this;
		target.open(target.__currentIndex + 1);

        return target;
    }

    /**
	 * Open selected slide
     * @param {int} index - index of slide
     * @returns {Carousel}
     */
    open(index = 0) {
		let target = this;
		if (index >= 0 && index < target.__length) {
			target.__currentIndex = index;
			target.__render();

			if (target.onChangeCallback) {
				target.onChangeCallback(target);
			}
		} else {
			if (target.__loop) {
				if (index >= target.__length)
					target.open(0);
				if (index < 0)
					target.open(target.__length - 1);
			}
		}

		return target;
	}

	__render() {
		let target = this;
		let currentData = target.__data[target.__currentIndex];

		target.__element.style.backgroundImage = 'url("' + currentData.imageUrl + '")';
		target.__carouselTitlePanel.innerHTML = currentData.title;
		target.__carouselContentPanel.innerHTML = currentData.description;
	}
}
/* unused harmony export Carousel */


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Modal {
    /**
	 * Constructor of Modal
     * @param {domObject} element - modal-block in html-page
     * @param {object} props - parameters of Modal
     */
	constructor(element, props = {}) {
		if (element == null) {
			throw "Modal: element is null or undefined";
		}

		let target = this;
		target.__add_to_collection();

		target.__element = element;
		target.__visible = false;
		target.__only_discarding = props.only_discarding || false;
		target.onShowCallback = props.onShow || null;
		target.onHideCallback = props.onHide || null;

		if (target.__only_discarding) {
			let header = null;
			if (target.__element.querySelector('.modal__header')) {
				header = target.__element.querySelector('.modal__header');
			} else {
				header = document.createElement('div');
				header.className = 'modal__header';
				target.__element.insertBefore(header, target.__element.firstChild);
			}

			var closeButton = document.createElement('div');
			closeButton.className = 'modal__header__close';
			header.appendChild(closeButton);

			closeButton.onclick = () => target.__overlay.destroy();
		}
	}

    /**
	 * Get element in html-page
     * @returns {domObject|*}
     */
	get element() {
		return this.__element;
	}

    /**
	 * Get state of Modal
     * @returns {boolean}
     */
	get visible() {
		return this.__visible;
	}

    /**
	 * Get value of property 'only_discarding'
     * @returns {boolean}
     */
	get only_discarding() {
		return this.__only_discarding;
	}

    /**
	 * Set value of property 'only_discarding'
     * @param {boolean} value
     */
	set only_discarding(value) {
		this.__only_discarding = value || false;
	}

    /**
	 * Set callback for onShow event
     * @param {Function} func - callback function
     */
	set onShow(func) {
		this.onShowCallback = func || null;
	}

    /**
	 * Set callback for onHide event
     * @param {Function} func - callback function
     */
	set onHide(func) {
		this.onHideCallback = func || null;
	}

    /**
	 * Show modal
     */
	show() {
		let target = this;
		target.__hide_others();

		let element = target.__element;
		let modal_height = (window.getComputedStyle(element, null)).getPropertyValue('height');

		element.classList.remove('modal--hide');
		element.classList.add('modal--show');

		if (element.getElementsByClassName('modal__content').length == 0) {
			throw "Modal: need an element .modal__content";
		}

		let modal_content = element.getElementsByClassName('modal__content')[0];
		modal_content.style.height = (modal_height - 46 - 39).toString() + 'px';

		target.__overlay = new Overlay({
			onDestroy: () => target.hide(),
			disableClick: target.__only_discarding
		});

		let modal_discard_list = target.element.querySelectorAll('.modal__discard, .modal__header__close');
		for (let i = 0; i < modal_discard_list.length; i++) {
		    let current = modal_discard_list[i];
            current.addEventListener('click', () => target.__overlay.destroy());
        }

		target.__visible = true;		
		target.element.style.display = 'block';

		if (target.onShowCallback) {
			target.onShowCallback(target);
		}
	}

    /**
	 * Hide modal
     */
	hide() {
		let target = this;
		let element = target.__element;
		element.classList.remove('modal--show');
		element.classList.add('modal--hide');

		this.__visible = false;

		setTimeout(() => element.style.display = 'none', 300);

		if (target.onHideCallback) {
			target.onHideCallback(target);
		}
	}

    /**
	 * Toggle visible state of Modal
     */
	toggle() {
		let target = this;
		if (target.__visible) {
			target.hide();
		} else {
			target.show();
		}
	}

	__add_to_collection() {
		let target = this;
		if (!__modals_collection.includes(target)) {
			__modals_collection.push(target);
		}
	}

	__hide_others() {
		let target = this;
		for (let modal of __modals_collection) {
			if (modal != target) {
				if (modal.visible) {
					modal.hide();					
				}
			}
		}
	}
}
/* unused harmony export Modal */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dialog {
    /**
	 * Constructor of Dialog
     * @param {Object} props
     */
	constructor(props = {}) {
		let target = this;

		target.__title = props.title || 'Empty title';
		target.__message = props.message || 'Empty message';
		target.__successLabel = props.successLabel || 'OK';
		target.__failLabel = props.failLabel || 'Cancel';
		target.__invert = props.invert || false;
		target.onSuccessCallback = props.onSuccess || null;
		target.onFailCallback = props.onFail || null;
		target.onShowCallback = props.onShow || null;
		target.onHideCallback = props.onHide || null;
	}

    /**
	 * Return the title of Dialog
     * @returns {String}
     */
	get title() {
		return this.__title;
	}

    /**
	 * Return the message of Dialog
     * @returns {String}
     */
	get message() {
		return this.__message;
	}

    /**
	 * Return the value of property 'invert'
     * @returns {bool}
     */
	get invert() {
		return this.__invert;
	}

    /**
	 * Return the caption of success button
     * @returns {String}
     */
	get successLabel() {
		return this.__successLabel;
	}

    /**
	 * Return the caption of failed button
     * @returns {String}
     */
	get failLabel() {
		return this.__failLabel;
	}

    /**
	 * Set new title of Dialog
     * @param {String} value
     */
	set title(value) {
		this.__title = value || 'Empty title';
	}

    /**
     * Set new message of Dialog
     * @param {String} value
     */
	set message(value) {
		this.__message = value || 'Empty message';
	}

    /**
     * Set new value of property 'invert'
     * @param {bool} value
     */
	set invert(value) {
		this.__invert = Boolean(value) || false;
	}

    /**
     * Set new caption of success button
     * @param {String} value
     */
	set successLabel(value) {
		this.__successLabel = value || 'OK';
	}

    /**
     * Set new caption of fail button
     * @param {String} value
     */
	set failLabel(value) {
		this.__failLabel = value || 'Cancel';
	}

    /**
     * Set new callback for onSuccessButtonPress Event
     * @param {Function} func
     */
	set onSuccess(func) {
		this.onSuccessCallback = func || null;
	}

    /**
     * Set new callback for onFailButtonPress Event
     * @param {Function} func
     */
	set onFail(func) {
		this.onFailCallback = func || null;
	}

    /**
     * Set new callback for onModalShow Event
     * @param {Function} func
     */
	set onShow(func) {
		this.onShowCallback = func || null;
	}

    /**
     * Set new callback for onModalHide Event
     * @param {Function} func
     */
	set onHide(func) {
		this.onHideCallback = func || null;
	}

    /**
	 * Show dialog
     */
	show() {
		let target = this;
		
		target.modal_body = document.createElement('div');
		target.modal_body.className = 'modal';

		if (target.__invert) {
			target.modal_body.classList.add('modal--invert');
		}

		target.modal = new Modal(target.modal_body, {
			onShow: target.onShowCallback,
			onHide: () => target.hide()
		});

		let modal_header = document.createElement('div');
		modal_header.className = 'modal__header';
		modal_header.innerHTML = target.__title;

		let modal_content = document.createElement('div');
		modal_content.className = 'modal__content';
		modal_content.innerHTML = target.__message;

		let modal_footer = document.createElement('div');
		modal_footer.className = 'modal__footer align-center';

		let modal_cancelButton = document.createElement('button');
		if (target.__invert) {
			modal_cancelButton.className = 'button button--color-black modal__discard';			
		} else {
			modal_cancelButton.className = 'button modal__discard';			
		}

		if (target.onSuccessCallback) {
			let modal_okButton = document.createElement('button');
			modal_okButton.className = 'button button--color-green modal__discard';
			modal_okButton.innerHTML = target.__successLabel;
			modal_okButton.onclick = function() {
				target.onSuccessCallback(target);
			}

			modal_footer.appendChild(modal_okButton);
		} else {
			modal_cancelButton.className = 'button button--color-green modal__discard';
		}

		modal_cancelButton.innerHTML = target.__failLabel;

		modal_footer.appendChild(modal_cancelButton);

		target.modal_body.appendChild(modal_header);
		target.modal_body.appendChild(modal_content);
		target.modal_body.appendChild(modal_footer);

		document.body.appendChild(target.modal_body);		

		modal_cancelButton.onclick = function() {
			if (target.onFailCallback) {
				target.onFailCallback(target);		
			}
		}

		target.modal.show();
	}

    /**
	 * Hide dialog
     */
	hide() {
		let target = this;

		if (target.onHideCallback) {
			target.onHideCallback(target);
		}
		
		target.modal_body.remove();
	}
}
/* unused harmony export Dialog */


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Progress {
    constructor(element, props = {}) {
        if (element == null) {
            throw "Progress: element is null or undefined";
        }

        let target = this;
        target.__element = element;
        target.__max = props.max || 0;
        target.__bars = props.bars || [];

        target.__render();
    }

    get max() {
    	return this.__max;
    }

    set max(value) {
    	this.__max = value || 0;
    	this.__render();
    }

    get element() {
    	return this.__element;
    }

    add(bar) {
    	let target = this;

    	if (bar && bar.value) {
    		target.__bars.push(bar);
			target.__render();
	    }
    }

    get(index = 0) {
    	let target = this;

    	if (index >= 0 && index < target.__bars.length) {
    		return target.__bars[index];
	    } else {
    		throw "Progress: invalid index";
	    }
    }

	remove(index = 0) {
		let target = this;

		if (index >= 0 && index < target.__bars.length) {
			target.__bars.splice(index, 1);
			console.log(target.__bars);
			target.__render();
		} else {
			throw "Progress: invalid index";
		}
	}

    update(index, bar) {
    	let target = this;

	    if (index >= 0 && index < target.__bars.length) {
	    	if (bar && bar.value != null) {
			    target.__bars[index] = bar;
			    target.__render();
		    } else {
	    	    throw "Progress: invalid bar";
		    }
	    } else {
		    throw "Progress: invalid index";
	    }
    }

    __render() {
        let target = this;

        let index = 0;
        for(let bar of target.__bars) {
            if (target.__element.childNodes[index]) {
            	let element = target.__element.childNodes[index];

	            if (bar.value > target.__max) {
		            throw "Progress: value must be less or equal than maximum value";
	            }

	            element.className = 'progress__active';

	            element.style.width = (bar.value /  target.__max * 100) + "%";

	            if (bar.color)
		            element.classList.add('progress__active--color-' + bar.color);

	            if (bar.label && element.childNodes.length) {
	            	element.childNodes[0].innerText = bar.label;
	            } else if (bar.label && !element.childNodes.length) {
		            let labelElement = document.createElement('div');
		            labelElement.className = 'progress__active__label';
		            labelElement.innerText = bar.label;
		            element.appendChild(labelElement);
	            } else {
	            	element.innerHTML = "";
	            }

            } else {
                let element = document.createElement('div');
                element.className = 'progress__active';

                if (bar.value > target.__max) {
                    throw "Progress: value must be less or equal than maximum value";
                }

                element.style.width = (bar.value /  target.__max * 100) + "%";

                if (bar.color)
                    element.classList.add('progress__active--color-' + bar.color);

                if (bar.label) {
                    let labelElement = document.createElement('div');
                    labelElement.className = 'progress__active__label';
                    labelElement.innerText = bar.label;
                    element.appendChild(labelElement);
                }

                target.__element.appendChild(element);
            }
            index++;
        }

        if (target.__element.childNodes.length > target.__bars.length) {
        	for (let i = target.__bars.length; i < target.__element.childNodes.length; i++) {
        		target.__element.removeChild(target.__element.childNodes[i]);
	        }
        }
    }
}
/* unused harmony export Progress */


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* unused harmony export Select */



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tabs {
	constructor(objectSender, props = {}) {
        if (objectSender == null) {
            throw "Tabs: objectSender is null or undefined";
        }

        let target = this;
        target.__element = objectSender;
        target.__index = -1;
        target.__tabs = new Array();
        target.onChangeTabCallback = props.onChangeTab;

        let tabItems = objectSender.querySelectorAll('.tabs__item');
        let selectedIndex = 0;

        for (let index = 0; index < tabItems.length; index++) {
            let current = tabItems[index];
            current.onclick = () => target.open(index);
            target.__tabs.push(current);

            if (current.classList.contains('tabs__item--active')) {
                selectedIndex = index;
            }
        }

        target.__hide_all();
        target.open(selectedIndex);
	}

	get element() {
	    return this.__element;
    }

    get tabs() {
	    return this.__tabs;
    }

    get currentIndex() {
        return this.__index;
    }

    set currentIndex(index) {
	    thi
    }

    set onChangeTab(func) {
	    this.onChangeTabCallback = func || null;
    }

	open(index) {
	    let target = this;

        if (index < 0 || index >= target.__tabs.length) {
            throw "Tabs: invalid index";
        }

	    let tabElement = target.__tabs[index];

	    if (!tabElement.classList.contains('tabs__item--disabled')) {
            target.__hide_all();
            target.__open(index);
        }

        if (target.onChangeTabCallback) {
	        target.onChangeTabCallback(target);
        }
	}

	__hide(index) {
	    let target = this;

	    if (index < 0 || index >= target.__tabs.length) {
	        throw "Tabs: invalid index";
        }

	    let tab = target.__tabs[index];
	    tab.classList.remove('tabs__item--active');
	    let content = document.getElementById(tab.getAttribute('data-tab-target'));
        content.style.display = 'none';
        target.__index = -1;
    }

    __hide_all() {
	    let target = this;
	    for (let i = 0; i < target.__tabs.length; i++) {
	        target.__hide(i);
        }
    }

    __open(index) {
	    let target = this;

        if (index < 0 || index >= target.__tabs.length) {
            throw "Tabs: invalid index";
        }

        let tab = target.__tabs[index];
        tab.classList.add('tabs__item--active');
        let content = document.getElementById(tab.getAttribute('data-tab-target'));
        content.style.display = 'block';
        target.__index = index;
    }
}
/* unused harmony export Tabs */


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ToggleButton {
	constructor(objectSender, props = {}) {
		if (objectSender == null) {
			throw "ToggleButton: objectSender is null or undefined";
		}

		let target = this;
		target.__element = objectSender;
		target.__activated = props.activated || false;
		target.onActivateCallback = props.onActivate || false;
		target.onDeactivateCallback = props.onDeactivate || false;
		target.onChangeCallback = props.onChange || false;

		target.__element.addEventListener('click', target.toggle.bind(this));
	}

	get isActivated() {
		return this.__activated;
	}

	get element() {
		return this.__element;
	}

	set onActivate(func) {
		this.onActivateCallback = func || null;
	}

	set onDeactivate(func) {
		this.onDeactivateCallback = func || null;
	}

	set onChange(func) {
		this.onChangeCallback = func || null;
	}

	activate() {
		let target = this;

		if (target.__activated) {
			console.warn('ToggleButton: element is already activated');
			return;
		}

		target.element.classList.add('button--checked');
		target.__activated = true;

		if (target.onActivateCallback) {
			target.onActivateCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
		}
	}

	deactivate() {
		let target = this;

		if (!target.__activated) {
			console.warn('ToggleButton: element is already deactivated');
			return;
		}

		target.element.classList.remove('button--checked');
		target.__activated = false;

		if (target.onDeactivateCallback) {
			target.onDeactivateCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
		}
	}

	toggle() {
		let target = this;
		if (target.__activated) {
			target.deactivate();
		} else {
			target.activate();
		}
	}
}
/* unused harmony export ToggleButton */


/***/ })
/******/ ]);