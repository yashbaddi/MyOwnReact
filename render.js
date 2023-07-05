import { createDOMElement, createTextNode } from "./createDOMElement.js";

export function render(element, container) {
  //   console.log(element);
  const DOMElement =
    element.type === "TEXT_ELEMENT"
      ? createTextNode(element.props.nodeValue)
      : createDOMElement(element.type, element.props);
  element.children.forEach((child) => {
    // console.log(child);
    if (child !== undefined) render(child, DOMElement);
  });

  container.append(DOMElement);
}
