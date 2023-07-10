import { setWorkInProgressRoot } from "../Utils/commitRootGen";
import { changeNextUnitOfWork } from "../Utils/workLoopGen";

let currentFiber = null;
let hookIndex = 0;

export const setCurrentFunctionFiber = (fiber) => (currentFiber = fiber);
export const clearCurrentFunctionFiber = () => (currentFiber = null);

export default function useState(initial) {
  const oldHook =
    currentFiber.alternate &&
    currentFiber.alternate.hooks &&
    currentFiber.alternate.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });
  currentFiber.hooks[hookIndex] = hook;
  currentFiber.alternate = currentFiber;
  const workingFiber = currentFiber;

  function setState(action) {
    hook.queue.push(action);
    changeNextUnitOfWork(workingFiber);
  }

  return [hook.state, setState];
}
