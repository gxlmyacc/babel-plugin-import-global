
const GLOBAL_NAME = 'window';

function isFunction(v) {
  return typeof v === 'function';
}

module.exports = function (babel) {
  const { types: t, template } = babel;

  function getGlobalVar(path, src, opts) {
    const { 
      globals = {}, 
      exclude = [],
    } = opts;

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

    let globalVar = isFunction(globals) ? globals(src) : globals[src];
    if (isFunction(globalVar)) globalVar = globalVar(src);

    return globalVar;
  }

  function getExpr(globalVar, opts) {
    const { 
      global: globalName = GLOBAL_NAME, 
      namespace
    } = opts;

    let str = globalName;
    if (namespace) str = namespace.includes('-') ? `${str}["${namespace}"]` : `${str}.${namespace}`;
    if (globalVar) str = globalVar.includes('-') ? `${str}["${globalVar}"]` : `${str}.${globalVar}`;
    return template(str)().expression;
  }

  return {
    name: 'babel-plugin-import-global',
    visitor: {
      ImportDeclaration(path, state) {
        let { node } = path;
        const { 
          namespace,
          varKind = 'const'
        } = state.opts;

        let src = node.source.value;
        let globalVar = getGlobalVar(path, src, state.opts);

        if (src !== namespace && !globalVar) return;

        let expr = getExpr(globalVar, state.opts);

        if (node.specifiers.length === 1
          && (node.specifiers[0].type === 'ImportDefaultSpecifier'
            || node.specifiers[0].type === 'ImportNamespaceSpecifier')
        ) {
          let identifier = node.specifiers[0].local.name;
          path.replaceWith(
            t.variableDeclaration(varKind, [
              t.variableDeclarator(t.identifier(identifier), expr)
            ])
          );
        } else if (node.specifiers) {
          node.specifiers.forEach(({ type, imported, local }) => {
            if (type === 'ImportDefaultSpecifier') {
              path.insertBefore(
                t.variableDeclaration(varKind, [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else if (imported.name === 'default') {
              path.insertBefore(
                t.variableDeclaration(varKind, [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else if (src === namespace) {
              path.insertBefore(
                t.variableDeclaration(varKind, [
                  t.variableDeclarator(t.identifier(local.name), expr)
                ])
              );
              path.getSibling(path.key - 1).stop();
            } else {
              path.insertBefore(
                t.variableDeclaration(varKind, [
                  t.variableDeclarator(
                    t.identifier(local.name),
                    template(`$EXPR$.${imported.name}`)({ $EXPR$: expr }).expression
                  )
                ])
              );
              path.getSibling(path.key - 1).stop();
            }
          });
          path.remove();
        }
      },
      CallExpression(path, state) {
        let { node } = path;

        if (!t.isIdentifier(node.callee) 
         || node.callee.name !== 'require'
         || node.arguments.length !== 1
         || !t.isStringLiteral(node.arguments[0])) return;

        let src = node.arguments[0].value;
        let globalVar = getGlobalVar(path, src, state.opts);
        if (!globalVar) return;

        path.replaceWith(getExpr(globalVar, state.opts));
      }
    }
  };
};