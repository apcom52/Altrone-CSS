var currentCalendar = null;

class Calendar {
    constructor(element, options = {}) {
        let target = this;

        target.__element = element;
        target.__selectedDate = null;
        target.__now = new Date();
        // target.__currentMonth = target.__now.getMonth();
        // target.__currentYear = target.__now.getFullYear();
        target.__currentMonth = 11;
        target.__currentYear = 2016;
        target.__defaultLabel = options.defaultLabel || "Choose a date";
        target.__visible = false;

        if (!target.__selectedDate) {
            target.__element.innerText = target.__defaultLabel;
        }

        target.__element.onclick = () => target.__onClick();
    }

    __render() {
        let target = this;
        if (currentCalendar) currentCalendar.remove();
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
        leftCalendarHeader.onclick = () => target.__prev();
        let rightCalendarHeader = createElement('div', 'calendar-window__next');
        rightCalendarHeader.onclick = () => target.__next();
        let titleCalendarHeader = createElement('div', 'calendar-window__title');
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        titleCalendarHeader.innerText = monthNames[target.__currentMonth] + ", " + target.__currentYear;

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
        target.__render();
    }

    __prev() {
        let target = this;
        if (target.__currentMonth === 0) {
            target.__currentMonth = 11;
            target.__currentYear -= 1;
        } else {
            target.__currentMonth -= 1;
        }
        target.__render();
    }

    __getWeekday(date) {
        if (date.getDay() === 0) return 6;
        return date.getDay() - 1;
    }

    __printCalendar() {
        let target = this;
        let lastDateOfPrevMonth = target.__currentMonth == 0 ? new Date(target.__currentYear, 0, 0) : new Date(target.__currentYear, target.__currentMonth, 0);
        console.log(lastDateOfPrevMonth);
        let calendarHTML = createElement('div', 'calendar-window__content');

        /* Print names of the days of the week */
        let weekdays = createElement('div', 'calendar-window__days');
        let weekdays_list = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

        for (let i = 0; i < weekdays_list.length; i++)
            weekdays.appendChild(createElement('div', 'calendar-window__day', '', null, weekdays_list[i]));
        calendarHTML.appendChild(weekdays);

        /* Print calendar */
        let weeks = createElement('div', 'calendar-window__week');
        let d = new Date(target.__currentYear, target.__currentMonth, 1);
        // заполняем ячейки предыдущего месяца
        if (target.__getWeekday(lastDateOfPrevMonth) > 0 && target.__getWeekday(lastDateOfPrevMonth) < 6) {
            console.log(lastDateOfPrevMonth, target.__getWeekday(lastDateOfPrevMonth));
            let daysOfLastMonth = target.__getWeekday(lastDateOfPrevMonth) + 1; // получаем количество дней, которые относятся к пред месяцу
            console.log(daysOfLastMonth);
            for (let i = 0; i < daysOfLastMonth; i++) {
                weeks.appendChild(createElement('div', 'calendar-window__day calendar-window__day--other-month', '', [], (lastDateOfPrevMonth.getDate() - (daysOfLastMonth - i))));
            }
        }

        while(d.getMonth() == target.__currentMonth) {
            weeks.appendChild(createElement('div', 'calendar-window__day', '', [], d.getDate().toString()));

            if (target.__getWeekday(d) % 7 == 6) {
                calendarHTML.appendChild(weeks);
                weeks = createElement('div', 'calendar-window__week');
            }

            d.setDate(d.getDate() + 1);
        }

        console.log(d);

        //заполняем таблицу днями следующего месяца
        if (target.__getWeekday(d) != 0) {
            let nextWeekDay = 1;
            console.log('start next', target.__getWeekday(d));
            for (let i = target.__getWeekday(d); i < 7; i++) {
                console.log('next' + i, target.__getWeekday(d));
                weeks.appendChild(createElement('div', 'calendar-window__day calendar-window__day--other-month', '', [], (nextWeekDay++).toString()));
            }
        }
        calendarHTML.appendChild(weeks);
        currentCalendar.appendChild(calendarHTML);
    }
}