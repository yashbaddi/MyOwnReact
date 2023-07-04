import { createDOMElement } from "./createDOMElement.js";

export function render(element, container) {
  const children = element.props.children;
  delete element.props.children;
  const DOMElement = createDOMElement(element.type, element.props);
  element.props.children.forEach((child) => {
    render(child, DOMElement);
  });

  container.append(DOMElement);
}
