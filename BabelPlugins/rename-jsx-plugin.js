const renameJsxPlugin = ({ types }) => {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const { name } = path.node.name;
        console.log("RENAME JOIN=", name);

        // Replace 'jsx' with your desired function name
        path.node.name = types.identifier("createElement");
      },
    },
  };
};

module.exports = renameJsxPlugin;
