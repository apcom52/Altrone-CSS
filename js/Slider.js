'use strict';

class Slider {
    constructor(element, props = {}) {
        let target = this;
        target.el = element;

        target.__value = props.value || 0;
        target.__min = props.min || 0;
        target.__max = props.max || 1;

        if (target.__max <= target.__min) {
            throw "Slider: maximum value must be more than minimum value";
        }

        if (target.__value < target.__min) {
            throw "Slider: value must be more or equal than minimum value";
        } else if (target.__value > target.__max) {
            throw "Slider: value must be less or equal than maximum value";
        }

        let backgroundBar = document.createElement('div');
        let foregroundBar = document.createElement('div');
        let manipulator = document.createElement('div');

        backgroundBar.className = 'slider__bar';
        foregroundBar.className = 'slider__bar__foreground';
        manipulator.className = 'slider__active';

        backgroundBar.appendChild(foregroundBar);
        target.el.appendChild(backgroundBar);
        target.el.appendChild(manipulator);

        target.__bgBar = backgroundBar;
        target.__fgBar = foregroundBar;
        target.__manipulator = manipulator;
        target.__manipulatorState = false;

        target.__manipulator.onmousedown = () => {
            target.__manipulatorState = true;
            console.log(target.__manipulatorState);
        };
        target.__manipulator.onmouseup = () => {
            target.__manipulatorState = false;
            console.log(target.__manipulatorState);
        };
        target.__manipulator.onmousemove = target.__onMove(event);

        target.__render();

        console.log(target);
    }

    __render() {
        let target = this;

        let min = target.__min;
        let max = target.__max;
        let value = target.__value;
        let element = target.el;
        let bgBar = target.__bgBar;
        let fgBar = target.__fgBar;
        let manipulator = target.__manipulator;

        let range = max - min;
        let valueInPercents = (value - min) / range * 100;

        fgBar.style.width = valueInPercents.toString() + '%';
        manipulator.style.left = valueInPercents.toString() + '%';
    }

    __onMove(event) {
        let target = this;

        if (target.__manipulatorState) {
            console.log('mouse move');
        }
    }
}