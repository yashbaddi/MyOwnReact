export function createDOMElement(
  elementName,
  childNodesArray = [],
  customDomObject = {}
) {
  const element = document.createElement(elementName);
  assignAttributes(element, customDomObject);
  element.append(...childNodesArray);
  return element;
}

function assignAttributes(element, object1) {
  for (const [key, value] of Object.entries(object1)) {
    if (element[key] !== undefined) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
}
