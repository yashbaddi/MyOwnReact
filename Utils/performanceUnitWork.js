import { createDOM } from "./createDOM.js";

export default function performUnitOfWork(fiber) {
  //Add dom
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  //create new Fibers
  createNewFibers(fiber);

  //Get Next fibers
  if (fiber.child) {
    return fiber.child;
  }

  return getNextFiberSibling(fiber);
}

function getNextFiberSibling(fiber) {
  let nextFiber = fiber;

  while (nextFiber) {
    console.log("sibling check", nextFiber);
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
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
    prevSibling = newFiber;
  });
}

function generateNewFiber(element, parentFiber) {
  return {
    type: element.type,
    props: element.props,
    parent: parentFiber,
    dom: null,
  };
}
