import { createDOM } from "./createDOM.js";

export default function performUnitOfWork(fiber) {
  if (typeof fiber.type == "function") {
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

function updateHostComponents(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  const elementsChilrens = fiber.props.children;

  reconcileChildren(fiber, elementsChilrens);
}

function updateFunctionComponents(fiber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
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

function reconcileChildren(fiber, elements) {
  let oldFiber = fiber.alternate && fiber.alternate.child;

  let prevSibling = null;

  elements.forEach((element, index) => {
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
