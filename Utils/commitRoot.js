export default function domCommiter() {}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const parentDom = fiber.parent.dom;
  parentDom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
