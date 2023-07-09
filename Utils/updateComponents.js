import reconcileChildren from "./reconcileChildren.js";
import {
  setCurrentFunctionFiber,
  clearCurrentFunctionFiber,
} from "../src/useState.js";
import { createDOM } from "./createDOM.js";

export function updateHostComponents(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  const elementsChilrens = fiber.props.children;

  reconcileChildren(fiber, elementsChilrens);
}

export function updateFunctionComponents(fiber) {
  fiber.hooks = [];
  setCurrentFunctionFiber(fiber);
  const children = [fiber.type(fiber)];
  reconcileChildren(fiber, children);
  clearCurrentFunctionFiber();
}
