'use strict';

class Carousel {
	constructor(element, props) {
		if (element == null) {
			throw "Carousel: element is null or undefined";
		}

		let target = this;
		target.__element = element;
		target.__slides = element.querySelectorAll('.carousel__item');
		target.__length = target.__slides.length;
		target.__currentIndex = 0;
		target.onChangeCallback = props.onChange || null;

		target.__carouselPanel = document.createElement('div');
		target.__carouselPanelCounter = document.createElement('div');
		target.__carouselPanelText = document.createElement('div');
		target.__carouselPanelNavigation = document.createElement('div');
		target.__carouselPanelLeftButton = document.createElement('div');
		target.__carouselPanelRightButton = document.createElement('div');
		target.__carouselPanel.className = 'carousel__panel';
	}
}