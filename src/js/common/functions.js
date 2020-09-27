export function createElement(tagName = 'div', parent, attributes = {}) {
    const element = document.createElement(tagName);

    Object.keys(attributes).forEach((attrName) => {
        element.setAttribute(attrName, attributes[attrName]);
    });

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}