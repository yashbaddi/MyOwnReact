import { addDeleteList } from "./commitRootGen";

export default function getNewFiber(fiber, oldFiber, element) {
  const sameType = oldFiber && element && element.type === oldFiber.type;
  console.log("isSameType", sameType);
  let newFiber = null;

  if (sameType) {
    newFiber = {
      type: element.type,
      props: element.props,
      dom: oldFiber.dom,
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
    addDeleteList(oldFiber);
  }
  return newFiber;
}
