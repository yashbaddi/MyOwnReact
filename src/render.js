import commitRootGen from "../Utils/commitRootGen.js";
import performUnitOfWork from "../Utils/performanceUnitWork.js";
import workLoopGen from "../Utils/workLoopGen.js";

export function render(element, container) {
  const rootFiber = {
    dom: container,
    props: element.props,
  };

  const commitRoot = commitRootGen(rootFiber);
  workLoopGen(performUnitOfWork, rootFiber, () => {
    commitRoot();
  });
}
