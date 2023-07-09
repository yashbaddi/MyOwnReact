import getNewFiber from "./getNewFiber.js";

export default function reconcileChildren(fiber, elements) {
  let oldFiber = fiber.alternate && fiber.alternate.child;

  let prevSibling = null;

  elements.forEach((element, index) => {
    const newFiber = getNewFiber(fiber, oldFiber, element);
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index == 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  });
}
