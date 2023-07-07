import { render } from "./render.js";
import { createElement } from "./createElement.js";

const root = document.getElementById("root");

export const MyReact = {
  createElement,
  render,
};

//Testing

function App({ props }) {
  return <h1>Hi {props.name}</h1>;
}
const jsxdata = <App name="foo" />;
console.log(jsxdata);
MyReact.render(jsxdata, root);
