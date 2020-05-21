
const GLOBAL_NAME = 'window';

function isFunction(v) {
  return typeof v === 'function';
}

module.exports = function (babel) {
  const { types: t, template } = babel;

  return {
    name: 'babel-plugin-import-global',
    visitor: {
      ImportDeclaration(path, state) {
        let { node } = path;
        const { globals = {}, exclude = [], global: globalName = GLOBAL_NAME, namespace } = state.opts;

        let src = node.source.value;

        if (exclude.some(v => {
          let matched 
            = v instanceof RegExp 
              ? v.test(src) 
              : isFunction(v)
                ? v(src)
                : (v === src);

          if (!matched) return;
          path.remove();
          return true;
        })) return;

        let camel = isFunction(globals) ? globals(src) : globals[src];
        if (isFunction(camel)) camel = camel(src);

        if (src !== namespace && !camel) return;

        let expr = template(namespace ? `${namespace}.${camel}` : camel)().expression;
        if (globalName) expr = t.memberExpression(t.identifier(globalName), expr);

        if (
          node.specifiers.length === 1
          && (node.specifiers[0].type === 'ImportDefaultSpecifier'
            || node.specifiers[0].type === 'ImportNamespaceSpecifier')
        ) {
          let identifier = node.specifiers[0].local.name;
          path.replaceWith(
            t.variableDeclaration('const', [
              t.variableDeclarator(t.identifier(identifier), expr)
            ])
          );
        } else if (node.specifiers) {
          node.specifiers.forEach(({ type, imported, local }) => {
            if (type === 'ImportDefaultSpecifier') {
              path.replaceWith(
                t.variableDeclaration('const', [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else if (imported.name === 'default') {
              path.replaceWith(
                t.variableDeclaration('const', [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else if (src === namespace) {
              path.replaceWith(
                t.variableDeclaration('const', [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else {
              path.replaceWith(
                t.variableDeclaration('const', [
                  t.variableDeclarator(
                    t.identifier(local.name),
                    template(`$EXPR$.${imported.name}`)({ $EXPR$: expr }).expression
                  )
                ])
              );
              path.getSibling(path.key - 1).stop();
            }
          });
        }
      }
    }
  };
};