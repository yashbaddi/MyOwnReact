import { createDOMElement } from "./createDOMElement.js";

export function render(element, container) {
  const DOMElement = createDOMElement(element.type);
  element.props.children.forEach((child) => {
    render(child, DOMElement);
  });

  container.append(DOMElement);
}
