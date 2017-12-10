const template = require("babel-template");

module.exports = function({ types: t }) {
  return {
    visitor: {
      ClassMethod(path) {
        const { node } = path;
        // see if method is set or get
        if (["set", "get"].indexOf(node.kind) > -1) {
          // check if it is single child of the container
          if (path.inList && path.container && path.container.length === 1) {
            let CLASS_NAME;
            // get the class name on parent of path
            path.findParent(path => {
              if (!path.isClassDeclaration()) {
                return;
              }
              CLASS_NAME = path.node.id.name;
            });
            // mutate path
            path.replaceWith(
              buildRequire({
                KIND: t.identifier(node.kind),
                KEY: t.stringLiteral(node.key.name),
                CLASS_NAME: t.identifier(CLASS_NAME),
                FUNCTION_BODY: t.functionExpression(null, [], node.body)
              })
            );
          }
        }
      }
    }
  };
};

// template for transformation
const buildRequire = template(`
  Object.defineProperty(CLASS_NAME, KEY, {
    KIND: FUNCTION_BODY,
    enumerable: true,
    configurable: true
  });
`);
