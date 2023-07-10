import {
  updateFunctionComponents,
  updateHostComponents,
} from "./updateComponents.js";

export default function performUnitOfWork(fiber) {
  if (fiber.type instanceof Function) {
    updateFunctionComponents(fiber);
  } else {
    updateHostComponents(fiber);
  }

  //Get Next fibers
  if (fiber.child) {
    return fiber.child;
  }

  return getNextFiberSibling(fiber);
}

function getNextFiberSibling(fiber) {
  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}
