import { render } from "./render.js";
import { createElement } from "./createElement.js";

const root = document.getElementById("root");

export const MyReact = {
  createElement,
  render,
};

//Testing
const jsxdata = <h1>Hi</h1>;
console.log(jsxdata);
MyReact.render(jsxdata, root);
