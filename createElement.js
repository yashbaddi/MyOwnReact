export function createElement(type, props = {}, ...children) {
  //   console.log("type=", type, "props=", props, "children=", children);
  return {
    type: type,
    props: {
      ...props,
      children:
        children !== undefined
          ? children.map((child) => {
              console.log(child);
              return typeof child === "object"
                ? child
                : createTextElement(child);
            })
          : [],
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
