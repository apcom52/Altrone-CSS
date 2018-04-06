document.addEventListener('DOMContentLoaded', () => {
    let dropdownTargets = document.querySelectorAll('[data-dropdown]');

    if (dropdownTargets.length) {
        window.addEventListener('resize', () => {
            if (Popup.currentDropdown) Popup.currentDropdown.__calculatePosition;
        });
        document.addEventListener('click', (e) => {
            console.log(e.target);
            if (Popup.currentDropdown && !e.target.hasAttribute('data-dropdown'))
                Popup.currentDropdown.hide();
        });
    }

    let dropdowns = [];
    dropdownTargets.forEach((current) => {
        let currentPopup = new Popup(current, document.getElementById(current.getAttribute('data-dropdown')));
        dropdowns.push(currentPopup);
        current.addEventListener('click', function(e) {
            currentPopup.toggle();
        });
    });
});