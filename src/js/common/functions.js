export function createElement(tagName = 'div', parent, attributes = {}) {
    const element = document.createElement(tagName);

    Object.keys(attributes).forEach((attrName) => {
        element.setAttribute(attrName, attributes[attrName]);
    });

    element.innerHTML = '';

    if (parent) {
        return parent.appendChild(element);
    } else {
        return element;
    }
}