element = {
  type: "div",
  props: {
    title: "foo",
    children: {
      type: "h1",
    },
  },
};

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((child) => {
        typeof child === "object" ? child : creaetTextElement(child);
      }),
    },
  };
}

function creaetTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
