export default function commitRootGen(root) {
  workInProgressRoot = root;
  function commitRoot() {
    commitWork(workInProgressRoot.child);
    workInProgressRoot = null;
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
