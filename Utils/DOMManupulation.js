export function createDOMElement(
  elementName,
  customDomObject = {},
  childNodesArray = []
) {
  const element = document.createElement(elementName);
  assignAttributes(element, customDomObject);
  element.append(...childNodesArray);
  return element;
}

export function assignAttributes(element, object1) {
  for (const [key, value] of Object.entries(object1)) {
    console.log(element, key, value);
    if (element[key] !== undefined) {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }
}

export function createTextNode(text) {
  const textNode = document.createTextNode(text);
  return textNode;
}
