let currentDropdown = null;

let destroyDropdown = (e) => {
    console.log(e.target.hasAttribute('data-dropdown'));
    if (currentDropdown && !e.target.hasAttribute('data-dropdown')) {
        currentDropdown.classList.remove('dropdown--position-bottom');
        currentDropdown.classList.remove('dropdown--position-left');
        currentDropdown.classList.remove('dropdown--position-top');
        currentDropdown.classList.remove('dropdown--position-right');
        setTimeout(() => {
            currentDropdown.classList.remove('dropdown--show');
            currentDropdown = null;
        }, 500);
    }
};

document.addEventListener('click', destroyDropdown);
document.addEventListener('DOMContentLoaded', () => {
    let dropdownTargets = document.querySelectorAll('[data-dropdown]');
    dropdownTargets.forEach((current) => {
        current.addEventListener('click', function(e) {
            if (currentDropdown) {
                destroyDropdown({ target: current });
            }
            let dropdown = document.getElementById(current.getAttribute('data-dropdown'));
            console.log(current, dropdown);

            __setDropdownPosition(e.target, dropdown);
        });
    });
});



function __setDropdownPosition(sender, dropdown) {
    dropdown.classList.add('dropdown--show');
    let windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    let senderRect = sender.getBoundingClientRect();
    let senderLeft = senderRect.left,
        senderTop = senderRect.top,
        senderRight = senderRect.right,
        senderBottom = senderRect.bottom;
    let popupWidth = dropdown.offsetWidth,
        popupHeight = dropdown.offsetHeight;

    let dropdownLeft = 0,
        dropdownTop = 0;

    let side = 'bottom';
    if (sender.getAttribute('data-dropdown-position') === 'left') side = 'left';
    else if (sender.getAttribute('data-dropdown-position') === 'right') side = 'right';
    else if (sender.getAttribute('data-dropdown-position') === 'top') side = 'top';

    switch(side) {
        case 'bottom':
            if (senderLeft + popupWidth >= windowWidth) dropdownLeft = windowWidth - popupWidth;
            else dropdownLeft = senderLeft;
            dropdownTop = senderBottom;
            dropdown.classList.add('dropdown--position-bottom');
            break;
        case 'top':
            if (senderLeft + popupWidth >= windowWidth) dropdownLeft = windowWidth - popupWidth;
            else dropdownLeft = senderLeft;
            dropdownTop = senderTop - popupHeight;
            dropdown.classList.add('dropdown--position-top');
            break;
        case 'left':
            if (senderLeft - popupWidth < 0) dropdownLeft = 0;
            else dropdownLeft = senderLeft - popupWidth;
            dropdownTop = senderTop;
            dropdown.classList.add('dropdown--position-left');
            break;
        case 'right':
            if (senderLeft + popupWidth >= windowWidth) dropdownLeft = windowWidth - popupWidth;
            else dropdownLeft = senderRight;
            dropdown.classList.add('dropdown--position-right');
            break;
    }

    dropdown.style.left = dropdownLeft + 'px';
    dropdown.style.top = dropdownTop + 'px';


    currentDropdown = dropdown;
}