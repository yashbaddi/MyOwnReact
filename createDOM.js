import { createDOMElement, createTextNode } from "./DOMManupulation.js";

export function createDOM(fiber) {
  const DOMElement =
    fiber.type === "TEXT_ELEMENT"
      ? createTextNode(element.props.nodeValue)
      : createDOMElement(element.type, element.props);
  //   element.children.forEach((child) => {
  //     if (child !== undefined) render(child, DOMElement);
  //   });

  container.append(DOMElement);
}
