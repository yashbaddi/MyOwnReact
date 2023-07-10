import updateDom from "./updateDom";

const deleteDomList = [];
let workInProgressRoot = null;
export default function commitRootGen(root) {
  deleteDomList.forEach((fiber) => commitWork(fiber));
  workInProgressRoot = root;
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
  let parentFiber = fiber.parent;
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }
  const parentDom = parentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    parentDom.append(fiber.dom);
  }
  if (fiber.effectTag === "DELETE" && fiber.dom !== null) {
    commitDeletion(fiber, parentDom);
  }
  if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

export function setWorkInProgressRoot(root) {
  workInProgressRoot = root;
}

function commitDeletion(fiber, parentDOM) {
  if (fiber.dom) {
    fiber.dom.remove();
  } else {
    commitDeletion(fiber.child, parentDOM);
  }
}

export function addDeleteList(fiber) {
  deleteDomList.push(fiber);
}
