/*var activeDropdown = null;

function __dropdownSetPosition() {
    if (activeDropdown) {
        let position = 'bottom';
        let target = activeDropdown.objSender;
        let dropdown = activeDropdown;

        let targetRect = target.getBoundingClientRect();

        if (target.hasAttribute('data-dropdown-position')) {
            let positionValue = target.getAttribute('data-dropdown-position');
            if (positionValue == 'left') position = 'left';
            else if (positionValue == 'right') position = 'right';
            else if (positionValue == 'top') position = 'top';
        }

        let left, top, width = 0;

        switch (position) {
            case 'left':
                left = target.offsetLeft - dropdown.offsetWidth;
                top = targetRect.offsetTop;
                dropdown.classList.add('dropdown--position-left');
                break;
            case 'right':
                left = target.offsetLeft + targetRect.width;
                top = target.offsetTop;
                dropdown.classList.add('dropdown--position-right');
                break;
            case 'top':
                left = target.offsetLeft;
                top = target.offsetTop - dropdown.offsetHeight;
                dropdown.classList.add('dropdown--position-top');
                break;
            case 'bottom':
            default:
                left = target.offsetLeft;
                top = target.offsetTop + targetRect.height;
                dropdown.classList.add('dropdown--position-bottom');
                break;
        }

        console.log(position);

        if ((position == 'top' || position == 'bottom') && targetRect.width >= dropdown.offsetWidth) {
           width = targetRect.width;
        } else {
            width = dropdown.offsetWidth;
        }

        if ((left + width) >= window.innerWidth) {
            left -= (left + width - window.innerWidth + 10);
        } else if (target.offsetLeft < 0) {
            left = 0;
        }

        dropdown.style.left = left + 'px';
        dropdown.style.top = top + 'px';
        dropdown.style.width = width + 'px';
    }
}

function __checkParentsDropdown(node = null) {
    while(node) {
        if (node.hasAttribute('data-dropdown')) {
            return node;
        } else {
            if (node.parentNode && node.parentNode.nodeName != 'HTML') {
                node = node.parentNode;
            } else {
                return node;
            }
        }
    }
}

document.addEventListener('click', function(event) {
    let target = event.target;
    let dropdownNode = __checkParentsDropdown(target);
    let dropdown = document.getElementById(dropdownNode.getAttribute('data-dropdown'));

	if (activeDropdown && !target.classList.contains('dropdown__header')) {
        activeDropdown.classList.remove('dropdown--show');
        activeDropdown.classList.remove('dropdown--show-left');
        activeDropdown.classList.remove('dropdown--show-right');
        activeDropdown.classList.remove('dropdown--show-top');
        activeDropdown.classList.remove('dropdown--show-bottom');

        if (activeDropdown == dropdown) {
            activeDropdown = null;
            return;
        } else {
            activeDropdown = null;
        }

        window.removeEventListener('resize', __dropdownSetPosition, false);
    }

	if (dropdown && (target.hasAttribute('data-dropdown') || __checkParentsDropdown(target))) {
        dropdown.classList.add('dropdown--show');
        activeDropdown = dropdown;
        activeDropdown.objSender = dropdownNode;

        __dropdownSetPosition();

        window.addEventListener('resize', __dropdownSetPosition, false);
	}
});*/