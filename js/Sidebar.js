var __sidebars_collection = new Array();
class Sidebar {
	constructor(objectSender, props = {}) {
		if (objectSender == null) {
			throw "Sidebar: objectSender is null or undefined";
		}

		let target = this;
		target.__add_to_collection();

		target.onShowCallback = props.onShow || null;
		target.onHideCallback = props.onHide || null;
		target.onChangeCallback = props.onChange || null;
		target.enable_scroll = props.enable_scroll || false;
		target.push_page = props.push_page || false;		
		target.no_overlay = props.no_overlay || false;		
		target.__element = objectSender;
		target.__visible = false;
		target.__touchStartX = 0;
		target.__touchStartY = 0;
		target.__onScrollEvent = () => target.__scroll();
        target.__onKeyDown = (e) => target.__onKeyDownHandler(target, e);
        target.__onSwipeStart = (e) => target.__onSwipeHandler(target, e);
        target.__onSwipeMove = (e) => target.__onSwipeMoveHandler(target, e);
        target.__onSwipeEnd = (e) => target.__onSwipeEndHandler(target, e);
	}

	get element() {
		return this.__element;
	}

	get visible() {
		return this.__visible;
	}

	set onShow(func) {
		this.onShowCallback = func || null;
	}

	set onHide(func) {
		this.onHideCallback = func || null;
	}

	set onChange(func) {
		this.onChangeCallback = func || null;
	}

	show() {
		let target = this;
		target.__hide_others();

		if (target.onShowCallback) {
			target.onShowCallback(target);
		}

		let element = target.__element;

		element.classList.add('sidebar--show');			
		if (target.push_page) {
			if (element.classList.contains('sidebar--pin-right')) {
				document.body.classList.add('body--sidebar-push-right');
			} else {
				document.body.classList.add('body--sidebar-push-left');
			}
		}

		if (!target.no_overlay) {
			target.__overlay = new Overlay({
				onDestroy: () => target.hide()
			});

			target.__overlay_element = target.__overlay.element;

			if (element.classList.contains('sidebar--under-taskbar')) {
				target.__overlay_element.classList.add('overlay--under-taskbar');			
			}
		}

		if (target.enable_scroll && element.classList.contains('sidebar--under-taskbar')) {
			window.addEventListener('scroll', target.__onScrollEvent, false);
		}

		target.__visible = true;

		if (target.onShowCallback) {
			target.onShowCallback(target);
		}

		if (target.onChangeCallback) {
			target.onChangeCallback(target);
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
        e.preventDefault();
    }

    __onSwipeMoveHandler(target, e) {
        window.addEventListener('touchend', target.__onSwipeEnd, {passive: false});
        e.preventDefault();
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
        e.preventDefault();
    }
}