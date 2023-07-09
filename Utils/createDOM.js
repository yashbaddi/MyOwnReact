import { createDOMElement, createTextNode } from "./DOMManupulation.js";

export function createDOM(fiber) {
  const filteredProps = propsWithoutChildren(fiber.props);
  const DOMElement =
    fiber.type === "TEXT_ELEMENT"
      ? createTextNode(fiber.props.nodeValue)
      : createDOMElement(fiber.type, filteredProps);
  return DOMElement;
}

function propsWithoutChildren(props) {
  const filtered = Object.keys(props)
    .filter((key) => key !== "children")
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: props[key],
      });
    }, {});

  return filtered;
}
