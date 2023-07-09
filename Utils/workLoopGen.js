export default function workLoopGen(
  performUnitOfWork,
  firstUnitofWork,
  postDeadline = () => {}
) {
  let nextUnitOfWork = firstUnitofWork;

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
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
