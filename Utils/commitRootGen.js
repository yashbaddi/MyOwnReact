import updateDom from "./updateDom";

export default function commitRootGen(root) {
  let workInProgressRoot = root;
  let currentRoot = workInProgressRoot;
  function commitRoot() {
    if (workInProgressRoot) {
      commitWork(workInProgressRoot.child);
      currentRoot = workInProgressRoot;
      workInProgressRoot = null;
    }
  }
  return commitRoot;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const parentFiber = fiber.parent;
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }
  const parentDom = parentFiber.dom;

  if (fiber.effectTag === "PLACEMENT") {
    parentDom.append(fiber.dom);
  }
  if (fiber.effectTag === "DELETE") {
    commitDeletion(fiber, parentDom);
  }
  if (fiber.effectTag === "UPDATE") {
    updateDom(fiber.dom, fiber.props, fiber.alternate.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, parentDOM) {
  if (fiber.dom) {
    fiber.dom.remove();
  } else {
    commitDeletion(fiber.child, parentDOM);
  }
}
