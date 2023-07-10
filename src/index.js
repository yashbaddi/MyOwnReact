import { render } from "./render.js";
import { createElement } from "./createElement.js";
import useState from "./useState.js";

const root = document.getElementById("root");

export const MyReact = {
  createElement,
  render,
  useState,
};

//Testing

// function App({ props }) {
//   //   return <h1>Hi {props.name}</h1>;
//   let val = 0;
//   return <button onclick={() => console.log("val")}>Count: {val}</button>;
// }
// const jsxdata = <App name="foo" />;

function Counter() {
  const [state, setState] = MyReact.useState(1);
  console.log("state", state);
  return (
    <div>
      <h1 onclick={() => setState((c) => c + 1)}>Count: {state}</h1>
    </div>
  );
}
const jsxdata = <Counter />;
console.log(jsxdata);
MyReact.render(jsxdata, root);

// function Apple() {
//   return <h1>Count: </h1>;
// }
// function Counter() {
//     const state = 2;
//   const [state, setState] = MyReact.useState(1);
//   return <h1 onClick={() => console.log(state)}>Count: {state}</h1>;
//   setState((c) => c + 1)
//   return (
//     <div>
//       <Apple />
//     </div>
//   );
// }

// const jsxdata = <Counter />;
