window.altroneCurrentSidebar = null;

class Sidebar {
	constructor(element, options = {}) {
		if (!element) {
			throw new Error("Sidebar: element is null or undefined");
		}

		const defaultOptions = {
			no_overlay: false,
			enable_swipe: false,
			onShow: null,
			onHide: null,
			onToggle: null
		}

		this.options = {...defaultOptions, options};
		this.element = element;
	}

	get element() {
		return this.__element;
	}

	get visible() {
		return this.__visible;
	}

	updateOptions(options = {}) {
		this.options = {...this.options, options};
	}

	show() {
		if (window.altroneCurrentSidebar) {
			window.altroneCurrentSidebar.hide();
		}

		const element = this.element;

		if (target.onShowCallback) {

			target.onShowCallback(target);
		}

		element.classList.add('sidebar--show');
		this.__visible = true;

		if (this.options.onShow) {
			this.options.onShow(this);
		}

		if (this.options.onToggle) {
			this.options.onToggle(this);
		}

		window.addEventListener('keydown', target.__onKeyDown);
		window.addEventListener('touchstart', target.__onSwipeStart, {passive: false});
	}

	hide() {
		let target = this;
		let element = target.__element;

		if (target.push_page) {
			if (element.classList.contains('sidebar--pin-right')) {
				document.body.classList.remove('body--sidebar-push-right');
			} else {
				document.body.classList.remove('body--sidebar-push-left');
			}
		}
		
		element.classList.remove('sidebar--show');			
		
		target.__visible = false;

		if (!target.no_overlay) {
			target.__overlay_element = null;			
		}

		if (target.onHideCallback) {
			target.onHideCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
		}

		window.removeEventListener('scroll', target.__onScrollEvent, false);
	}

	toggle() {
		let target = this;
		if (target.visible) {
			target.hide();
		} else {
			target.show();
		}
	}

	__scroll() {
		let target = this;
		let element = target.__element;

		if (!target.no_overlay) {
			let overlay_element = target.__overlay_element;			
		}

		let topScrollPosition = window.scrollTop;
		let taskbar_height = 44;

		if (topScrollPosition >= taskbar_height) {
			element.style.top = '0px';
			element.style.height = '100%';
			if (!target.no_overlay) {
				overlay_element.style.top = '0px';
				overlay_element.style.height = '100%';
			}
		} else {
			element.style.top = (taskbar_height - topScrollPosition) + 'px';
			if (!target.no_overlay) {
				overlay_element.style.top = (taskbar_height - topScrollPosition) + 'px';
				overlay_element.style.height = 'calc(100% - ' + (taskbar_height - topScrollPosition).toString() + 'px)';
			}
		}
	}

	__add_to_collection() {
		let target = this;
		if (!__sidebars_collection.includes(target)) {
			__sidebars_collection.push(target);
		}
	}

	__hide_others() {
		let target = this;
		for (let sidebar of __sidebars_collection) {
			if (sidebar !== target) {
				if (sidebar.visible) {
					sidebar.hide();					
				}
			}
		}
	}

    __onKeyDownHandler(target, e) {
        if (e.keyCode === 27) {
        	if (target.__overlay)
            	target.__overlay.destroy();
        	else
        		target.hide();
        }
    }

    __onSwipeHandler(target, e) {
        window.addEventListener('touchmove', target.__onSwipeMove, {passive: false});
        let touchObject = e.changedTouches[0];
        target.__touchStartX = touchObject.pageX;
        target.__touchStartY = touchObject.pageY;
    }

    __onSwipeMoveHandler(target, e) {
        window.addEventListener('touchend', target.__onSwipeEnd, {passive: false});
    }

    __onSwipeEndHandler(target, e) {
		window.removeEventListener('touchmove', target.__onSwipeMove);
		window.removeEventListener('touchend', target.__onSwipeEnd);

        let touchObject = e.changedTouches[0];
        let touchEndX = touchObject.pageX;
        let touchEndY = touchObject.pageY;
        let swipeSide = swipe(target.__touchStartX, target.__touchStartY, touchEndX, touchEndY);
        if ((swipeSide === 'left' && target.__element.classList.contains('sidebar--pin-right')) || (swipeSide === 'right' && !target.__element.classList.contains('sidebar--pin-right'))) {
            if (target.__overlay)
                target.__overlay.destroy();
            else
                target.hide();
		}
    }
}