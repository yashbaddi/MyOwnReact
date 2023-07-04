import { createElement } from "../createElement.js";

const output = createElement(
  "div",
  { id: "firstDiv", className: "divv" },
  createElement("h1", { id: "second" })
);

console.log(output);

// {
//     type: 'div',
//     props: { id: 'firstDiv', className: 'divv', children: [ undefined ] }
//   }
