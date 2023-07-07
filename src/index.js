import { render } from "./render.js";
import { createElement } from "./createElement.js";

const root = document.getElementById("root");
// const outputCreateElement = createElement(
//   "div",
//   { id: "firstDiv", className: "divv" },
//   createElement("h1", { id: "first" }, "hey"),
//   createElement(
//     "div",
//     { id: "secondDiv" },
//     createElement("h1", { id: "second" }, "hello")
//   )
// );
const MyReact = {
  createElement,
  render,
};

const babelIP = <h1>Hi</h1>;
console.log(babelIP);
MyReact.render(babelIP, root);
