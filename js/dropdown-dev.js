let currentDropdown = null;

let destroyDropdown = (e) => {
    console.log(e.target.hasAttribute('data-dropdown'));
    if (!e.target.hasAttribute('data-dropdown')) {
        currentDropdown.classList.remove('dropdown--position-bottom');
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

    if (senderLeft + popupWidth >= windowWidth) dropdownLeft = windowWidth - popupWidth;
    else dropdownLeft = senderLeft;

    dropdownTop = senderBottom;
    dropdown.style.left = dropdownLeft + 'px';
    dropdown.style.top = dropdownTop + 'px';

    dropdown.classList.add('dropdown--position-bottom');
    currentDropdown = dropdown;
}