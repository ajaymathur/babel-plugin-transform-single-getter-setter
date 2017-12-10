const template = require('babel-template');

module.exports = function({types: t}) {
  return {
    visitor: {
      ClassMethod(path) {
        const {node} = path;
        if(['set', 'get'].indexOf(node.kind) > -1) {
          if(path.inList && path.container && path.container.length === 1) {
            let CLASS_NAME;
            path.findParent((path) => {
              if (!path.isClassDeclaration()) {
                return ;
              }
              CLASS_NAME = path.node.id.name
            }
          )
            path.replaceWith(
              buildRequire({
                KIND: t.identifier(node.kind),
                KEY: t.stringLiteral(node.key.name),
                CLASS_NAME: t.identifier(CLASS_NAME),
                FUNCTION_BODY: t.functionExpression(
                  null, [], node.body
                )
              })
            )
          }
        }
      }
    }
  }
}

const buildRequire = template(`
  Object.defineProperty(CLASS_NAME, KEY, {
    KIND: FUNCTION_BODY,
    enumerable: true,
    configurable: true
  });
`);
