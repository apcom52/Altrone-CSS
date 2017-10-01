'use strict';

class Carousel {
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

		console.log(target.__data);
		target.__render();
	}

	get element() {
		return this.__element;
	}

	get index() {
		return this.__currentIndex;
	}

	get length() {
		return this.__length;
	}

	set index(index) {
		this.open(index);
	}

	set onChange(func) {
		this.onChangeCallback = func || null;
	}

	prev() {
		let target = this;
		target.open(target.__currentIndex - 1);

		return target;
	}

    next() {
        let target = this;
		target.open(target.__currentIndex + 1);

        return target;
    }

    open(index = 0) {
		let target = this;
		if (index >= 0 && index < target.__length) {
			target.__currentIndex = index;
			target.__render();

			if (target.onChangeCallback) {
				target.onChangeCallback(target);
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