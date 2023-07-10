let nextUnitOfWork = null;
export default function workLoopGen(
  performUnitOfWork,
  firstUnitofWork,
  postDeadline = () => {}
) {
  nextUnitOfWork = firstUnitofWork;

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      console.log("next unit of work", nextUnitOfWork);
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }
    if (!nextUnitOfWork) {
      postDeadline();
    }
    requestIdleCallback(workLoop);
  }

  requestIdleCallback(workLoop);
}

export function changeNextUnitOfWork(fiber) {
  nextUnitOfWork = fiber;
}
