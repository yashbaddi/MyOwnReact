import { createDOM } from "./createDOM.js";

export default function performUnitOfWork(fiber) {
  //Add dom
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.append(fiber.dom);
    console.log("fiber:", fiber);
  }

  //create new Fibers
  createNewFibers(fiber);

  //Get Next fibers
  if (fiber.child) {
    console.log("child fib:", fiber);
    return fiber.child;
  }

  return getNextFiberSibling(fiber);
}

function getNextFiberSibling(fiber) {
  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
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
    prevSibling = fiber;
  });
}

function generateNewFiber(element, parentFiber) {
  console.log(element);
  return {
    type: element.type,
    props: element.props,
    parent: parentFiber,
    dom: null,
  };
}
