import { changeNextUnitOfWork } from "../Utils/workLoopGen";

let currentFiber = null;

export const setCurrentFunctionFiber = (fiber) => (currentFiber = fiber);
export const clearCurrentFunctionFiber = () => (currentFiber = null);

export default function useState(initial) {
  const oldHook =
    currentFiber.alternate &&
    currentFiber.alternate.hooks &&
    currentFiber.alternate.hooks.length;

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });
  const workingFiber = currentFiber;
  function setState(action) {
    hook.queue.push(action);
    console;
    changeNextUnitOfWork(workingFiber);
  }
  currentFiber.hooks.push(hook);
  return [hook.state, setState];
}
