var activeDropdown = null;

document.addEventListener('click', function(event) {
    let target = event.target;
    let dropdown = document.getElementById(target.getAttribute('data-dropdown'));

	if (activeDropdown && !target.classList.contains('dropdown__header')) {
        activeDropdown.classList.remove('dropdown--show');
        activeDropdown.classList.remove('dropdown--show-left');
        activeDropdown.classList.remove('dropdown--show-right');
        activeDropdown.classList.remove('dropdown--show-top');
        activeDropdown.classList.remove('dropdown--show-bottom');
        if (activeDropdown == dropdown) {
            activeDropdown = null;
            return;
        }
    }

	if (target.hasAttribute('data-dropdown')) {
		let position = 'bottom';
        dropdown.classList.add('dropdown--show');
        activeDropdown = dropdown;

        console.log(dropdown);

		let targetRect = target.getBoundingClientRect();

		if (target.hasAttribute('data-dropdown-position')) {
			let positionValue = target.getAttribute('data-dropdown-position');
			if (positionValue == 'left') position = 'left';
			else if (positionValue == 'right') position = 'right';
			else if (positionValue == 'top') position = 'top';
		}

		switch (position) {
			case 'left':
				dropdown.style.left = (targetRect.left - dropdown.offsetWidth) + 'px';
				dropdown.style.top = targetRect.top + 'px';
				dropdown.classList.add('dropdown--position-left');
				break;
			case 'right':
                dropdown.style.left = (targetRect.left + targetRect.width) + 'px';
                dropdown.style.top = targetRect.top + 'px';
                dropdown.classList.add('dropdown--position-right');
                break;
            case 'top':
                dropdown.style.left = targetRect.left + 'px';
                dropdown.style.top = (targetRect.top - dropdown.offsetHeight) + 'px';
                dropdown.classList.add('dropdown--position-top');
                break;
			case 'bottom':
			default:
                dropdown.style.left = targetRect.left + 'px';
                dropdown.style.top = (targetRect.top + targetRect.height) + 'px';
                dropdown.classList.add('dropdown--position-bottom');
                break;
		}

		console.log(position);

		if ((position == 'top' || position == 'bottom') && targetRect.width >= dropdown.offsetWidth) {
			dropdown.style.width = targetRect.width + 'px';
		}
	}
});