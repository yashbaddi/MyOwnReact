import performUnitOfWork from "../Utils/performanceUnitWork.js";
import workLoopGenerator from "../Utils/workLoopGenerator.js";

export function render(element, container) {
  const rootFiber = {
    dom: container,
    props: element.props,
  };

  workLoopGenerator(performUnitOfWork, rootFiber);
}
