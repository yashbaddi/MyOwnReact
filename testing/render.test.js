import { render } from "../src/render.js";
import { createElement } from "../src/createElement.js";

const root = document.getElementById("root");
const outputCreateElement = createElement(
  "div",
  { id: "firstDiv", className: "divv" },
  createElement("h1", { id: "first" }, "hey"),
  createElement(
    "div",
    { id: "secondDiv" },
    createElement("h1", { id: "second" }, "hello")
  )
);
console.log(outputCreateElement);
render(outputCreateElement, root);
