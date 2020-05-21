

const GLOBAL_NAME = 'window';

module.exports = function (babel) {
  const t = babel.types;
  return {
    name: 'babel-plugin-import-global',
    visitor: {
      ImportDeclaration(path, state) {
        let node = path.node;
        const _state$opts = state.opts;
        const whiteList = _state$opts.whiteList;
        const _state$opts$global = _state$opts.global;
        const globalName = _state$opts$global === void 0 ? GLOBAL_NAME : _state$opts$global;
        const namespace = _state$opts.namespace;
        let src = node.source.value;
        let camel = whiteList[src];
        if (src !== namespace && !camel) return;

        if (node.specifiers.length === 1 && (node.specifiers[0].type === 'ImportDefaultSpecifier' || node.specifiers[0].type === 'ImportNamespaceSpecifier')) {
          let identifier = node.specifiers[0].local.name;
          path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(identifier), t.memberExpression(t.identifier(globalName), t.identifier([namespace, camel].join('.'))))]));
        } else if (node.specifiers) {
          node.specifiers.forEach(function (_ref) {
            let type = _ref.type;
            let imported = _ref.imported;
            let local = _ref.local;

            if (type === 'ImportDefaultSpecifier') {
              path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(globalName), t.identifier([namespace, camel].join('.'))))]));
              path.getSibling(path.key - 1).stop();
            } else if (imported.name === 'default') {
              path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(globalName), t.identifier([namespace, camel].join('.'))))]));
              path.getSibling(path.key - 1).stop();
            } else if (src === namespace) {
              path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(globalName), t.identifier([namespace, imported.name].join('.'))))]));
              path.getSibling(path.key - 1).stop();
            } else {
              path.insertBefore(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(local.name), t.memberExpression(t.identifier(globalName), t.identifier([namespace, camel, imported.name].join('.'))))]));
              path.getSibling(path.key - 1).stop();
            }
          });
        }

        path.remove();
      }

    }
  };
};