import { createDOM } from "./createDOM.js";

export default function performUnitOfWork(fiber) {
  //Add dom
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }

  //create new Fibers
  reconcileChildren(fiber);

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

function reconcileChildren(fiber) {
  const elementsChilrens = fiber.props.children;
  let oldFiber = fiber.alternate && fiber.alternate.child;

  let prevSibling = null;

  elementsChilrens.forEach((element, index) => {
    const newFiber = generateNewFiber(fiber, oldFiber, element);
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

function generateNewFiber(fiber, oldFiber, element) {
  const sameType = oldFiber && element & (element.type === oldFiber.type);
  let newFiber = null;
  if (sameType) {
    newFiber = {
      type: element.type,
      props: element.props,
      dom: null,
      parent: fiber,
      alternate: oldFiber,
      effectTag: "UPDATE",
    };
  }
  if (element && !sameType) {
    newFiber = {
      type: element.type,
      props: element.props,
      dom: null,
      parent: fiber,
      alternate: null,
      effectTag: "PLACEMENT",
    };
  }
  if (oldFiber && !sameType) {
    oldFiber.effectTag = "DELETION";
    deleteDomList.push(oldFiber);
  }
  return newFiber;
}
