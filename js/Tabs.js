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