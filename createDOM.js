import { createDOMElement, createTextNode } from "./DOMManupulation.js";

export function createDOM(fiber) {
  const DOMElement =
    fiber.type === "TEXT_ELEMENT"
      ? createTextNode(element.props.nodeValue)
      : createDOMElement(element.type, element.props);
  return DOMElement;
}
