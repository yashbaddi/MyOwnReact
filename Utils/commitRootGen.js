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
  const parentDom = fiber.parent.dom;

  if (fiber.effectTag === "PLACEMENT") {
    parentDom.append(fiber.dom);
  }
  if (fiber.effectTag === "DELETE") {
    fiber.dom.remove();
  }
  if (fiber.effectTag === "UPDATE") {
    updateDom(fiber.dom, fiber.props, fiber.alternate.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
