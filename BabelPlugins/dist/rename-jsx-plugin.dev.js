"use strict";

var renameJsxPlugin = function renameJsxPlugin(_ref) {
  var types = _ref.types;
  return {
    visitor: {
      JSXOpeningElement: function JSXOpeningElement(path) {
        var name = path.node.name.name;
        console.log("RENAME JOIN=", name); // Replace 'jsx' with your desired function name

        path.node.name = types.identifier("createElement");
      }
    }
  };
};

module.exports = renameJsxPlugin;