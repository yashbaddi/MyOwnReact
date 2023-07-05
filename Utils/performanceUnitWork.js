import { createDOM } from "./createDOM";

export default function performUnitOfWork(fiber) {
  //Add dom
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.append(fiber.dom);
  }
  //create new Fibers
  createNewFibers(fiber);

  //Get Next fibers
  if (fiber.child) {
    return fiber.child;
  }

  return getNextFiberSibling(fiber);
}

function generateNewFiber(element, parentFiber) {
  return {
    type: element.type,
    props: element.props,
    parent: parentFiber,
    dom: null,
  };
}

function getNextFiberSibling(fiber) {
  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

function createNewFibers(fiber) {
  const elementsChilrens = fiber.props.children;
  let prevSibling = null;

  elementsChilrens.forEach((element, index) => {
    const newFiber = generateNewFiber(element, fiber);
    if (index == 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = fiber;
  });
}
