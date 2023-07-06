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
  parentDom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
