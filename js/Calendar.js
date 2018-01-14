var currentCalendar = null;

class Calendar {
    constructor(element, options = {}) {
        let target = this;

        target.__element = element;
        target.__selectedDate = null;
        target.__now = new Date();
        target.__currentMonth = target.__now.getMonth();
        target.__currentYear = target.__now.getYear();
        target.__defaultLabel = options.defaultLabel || "Choose a date";
        target.__visible = false;

        if (!target.__selectedDate) {
            target.__element.innerText = target.__defaultLabel;
        }

        target.__element.onclick = () => target.__onClick();
    }

    __render() {
        let target = this;
        currentCalendar = createElement('div', 'calendar-window');

        /* Set themes and accent colors to calendar-window */
        if (target.__element.classList.contains('calendar--invert'))
            currentCalendar.classList.add('calendar-window--invert');
        if (target.__element.className.search('calendar--color') != -1) {
            let accentRegExp = /calendar--color-(\w*)/;
            currentCalendar.classList.add('calendar-window--color-' + target.__element.className.match(accentRegExp)[1]);
        }

        let calendarHeader = createElement('div', 'calendar-window__header');
        let leftCalendarHeader = createElement('div', 'calendar-window__prev');
        let rightCalendarHeader = createElement('div', 'calendar-window__next');
        let titleCalendarHeader = createElement('div', 'calendar-window__title');
        titleCalendarHeader.innerText = "December, 2017";

        calendarHeader.appendChild(leftCalendarHeader);
        calendarHeader.appendChild(titleCalendarHeader);
        calendarHeader.appendChild(rightCalendarHeader);
        currentCalendar.appendChild(calendarHeader);
        currentCalendar.classList.add('calendar-window--show');
        let calendarWindowWidth = currentCalendar.offsetWidth;
        let calendarInputWidth = target.__element.offsetWidth;
        let calendarInputPosition = target.__element.getBoundingClientRect();

        if (calendarInputWidth > calendarWindowWidth) {
            currentCalendar.style.width = calendarInputWidth + 'px';
        }

        currentCalendar.style.left = calendarInputPosition.left + 'px';
        currentCalendar.style.top = calendarInputPosition.top + calendarInputPosition.height + 'px';

        target.__printCalendar();
        document.body.appendChild(currentCalendar);
    }

    __show() {
        console.log("show");
        let target = this;
        target.__element.classList.add('calendar--show');
        target.__visible = true;
        target.__render();
    }

    __hide() {
        let target = this;
        target.__element.classList.remove('calendar--show');
        target.__visible = false;
        currentCalendar.remove();
    }

    __onClick() {
        let target = this;
        console.log(target);
        console.log("click handler");
        if (!target.__visible) {
            target.__show();
        } else {
            target.__hide();
        }
    }

    __next() {
        let target = this;
        if (target.__currentMonth === 11) {
            target.__currentMonth = 0;
            target.__currentYear += 1;
        } else {
            target.__currentMonth += 1;
        }
    }

    __prev() {
        let target = this;
        if (target.__currentMonth === 0) {
            target.__currentMonth = 11;
            target.__currentYear -= 1;
        } else {
            target.__currentMonth -= 1;
        }
    }

    __printCalendar() {
        let target = this;
        let firstDay = new Date(target.__currentYear, target.__currentMonth, 1).getDay() - 5;
        let lastDate = new Date(target.__currentYear, target.__currentMonth + 1, 0).getDate();
        let lastDateOfPrevMonth = target.__currentMonth == 0 ? new Date(target.__currentYear, 11, 0).getDate() : new Date(target.__currentYear, target.__currentMonth, 0).getMonth();
        let calendarHTML = createElement('div', 'calendar-window__content');

        /* Print names of the days of the week */
        let weekdays = createElement('div', 'calendar-window__days');
        let weekdays_list = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        for (let i = 0; i < weekdays_list.length; i++)
            weekdays.appendChild(createElement('div', 'calendar-window__day', '', null, weekdays_list[i]));

        /* Print calendar */
        let p = 1;
        console.log(firstDay, lastDate, lastDateOfPrevMonth);
        for (let lm = 0; lm < 6; lm++) {
            for (let day = 0; day < 7; day++) {
                // let d = 
            }
        }


        calendarHTML.appendChild(weekdays);
        currentCalendar.appendChild(calendarHTML);
    }
}