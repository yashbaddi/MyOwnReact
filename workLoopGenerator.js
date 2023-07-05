export default function workLoopGenerator(performUnitOfWork) {
  let nextUnitOfWork = null;

  function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
  }

  requestIdleCallback(workLoop);
}