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