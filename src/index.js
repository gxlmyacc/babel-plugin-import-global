
const GLOBAL_NAME = 'window';
const VAR_KIND = 'var';

function isFunction(v) {
  return typeof v === 'function';
}

const _toString = Object.prototype.toString;
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

module.exports = function (babel) {
  const { types: t, template } = babel;

  function getGlobalExpr(globalVar, opts) {
    const {
      global: globalName = GLOBAL_NAME,
      namespace
    } = opts;

    let str = globalName;
    if (namespace) str = /[@/-]/.test(namespace) ? `${str}["${namespace}"]` : `${str}.${namespace}`;
    if (globalVar) str = /[@/-]/.test(globalVar) ? `${str}["${globalVar}"]` : `${str}.${globalVar}`;
    return template(str)().expression;
  }

  function walkRemoves(path, src, opts, isRequire) {
    const {
      removes = [],
    } = opts;

    return removes.some(v => {
      let matched
        = v instanceof RegExp
          ? v.test(src)
          : isFunction(v)
            ? v(src)
            : (v === src);

      if (!matched) return;
      if (isRequire && !t.isExpressionStatement(path.parent)) {
        path.replaceWith(t.objectExpression([]));
      } else if (t.isImportDeclaration(path.node) && path.node.specifiers.length) {
        transformExpr(path, src, t.objectExpression([]), opts);
      } else path.remove();
      return true;
    });
  }

  function walkRedirects(path, src, opts, isRequire) {
    const {
      varKind = VAR_KIND,
      redirects = [],
    } = opts;
    return redirects.some(redirect => {
      let { from, to, imported } = redirect;
      if (!to) return;
      let matched = from instanceof RegExp
        ? src.match(from)
        : isFunction(from)
          ? from(src)
          : (from === src);
      if (!matched) return;

      if (imported) {
        imported = isFunction(imported)
          ? imported.call(redirect, src, Array.isArray(matched) ? matched : [])
          : Array.isArray(matched)
            ? imported.repalce(/\$(\d)/, (m, index) => matched[index])
            : imported;
      }
      if (from instanceof RegExp) to = src.replace(from, to);
      if (!to) return;

      let toExpr = t.stringLiteral(to);
      if (isRequire) {
        path.node.arguments[0] = toExpr;
        if (imported) {
          path.replaceWith(t.memberExpression(path.node, t.identifier(imported)));
        }
        return true;
      }
      let node = path.node;
      if (!imported) {
        node.source = toExpr;
        return true;
      }
      if (node.specifiers.length === 1
          && (node.specifiers[0].type === 'ImportDefaultSpecifier'
            || node.specifiers[0].type === 'ImportNamespaceSpecifier')
      ) {
        let identifier = node.specifiers[0].local;
        path.replaceWith(t.importDeclaration([
          t.importSpecifier(identifier, t.identifier(imported))
        ], toExpr));
      } else if (node.specifiers) {
        toExpr = t.memberExpression(t.callExpression(t.identifier('require'), [toExpr]), t.identifier(imported));
        node.specifiers.forEach(({ type, imported, local }) => {
          if (type === 'ImportDefaultSpecifier') {
            path.insertBefore(
              t.variableDeclaration(varKind, [
                t.variableDeclarator(t.identifier(local.name), t.memberExpression(toExpr, local))
              ])
            );
            path.getSibling(path.key - 1).stop();
          } else if (imported.name === 'default') {
            path.insertBefore(
              t.variableDeclaration(varKind, [
                t.variableDeclarator(t.identifier(local.name), t.memberExpression(toExpr, local))
              ])
            );
            path.getSibling(path.key - 1).stop();
          } else {
            path.insertBefore(
              t.variableDeclaration(varKind, [
                t.variableDeclarator(
                  t.identifier(local.name),
                  template(`$EXPR$.${imported.name}`)({ $EXPR$: toExpr }).expression
                )
              ])
            );
            path.getSibling(path.key - 1).stop();
          }
        });
        path.remove();
      }

      return true;
    });
  }

  function walkGlobals(path, src, opts, isRequire) {
    const {
      globals = {},
    } = opts;

    let globalVar = isFunction(globals) ? globals(src) : globals[src];
    if (isPlainObject(globalVar)) {
      globalVar = globalVar.globalVar;
    }
    if (isFunction(globalVar)) globalVar = globalVar(src);

    let expr = globalVar ? getGlobalExpr(globalVar, opts) : null;
    if (!expr) return;

    if (isRequire) path.replaceWith(expr);
    else transformExpr(path, src, expr, opts);

    return true;
  }

  function transformExpr(path, src, expr, opts) {
    const {
      namespace,
      varKind = VAR_KIND
    } = opts;
    const { node } = path;

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
                template(`%%EXPR%%.${imported.name}`)({ "EXPR": expr }).expression
              )
            ])
          );
          path.getSibling(path.key - 1).stop();
        }
      });
      path.remove();
    }
  }

  return {
    name: 'babel-plugin-import-global',
    visitor: {
      ImportDeclaration(path, state) {
        let { filename, opts = {} } = state;
        let { node } = path;

        if ((opts.excludes || []).some(exclude => exclude.test(filename))) {
          return;
        }
        if (opts.includes && opts.includes.length && !opts.includes.some(include => include.test(filename))) {
          return;
        }

        let src = node.source.value;
        if (walkRemoves(path, src, opts)) return;
        walkRedirects(path, src, opts);
        walkGlobals(path, src, opts);
      },
      CallExpression(path, state) {
        let { filename, opts = {} } = state;
        let { node } = path;

        if ((opts.excludes || []).some(exclude => exclude.test(filename))) {
          return;
        }
        if (opts.includes && opts.includes.length && !opts.includes.some(include => include.test(filename))) {
          return;
        }

        if (!t.isIdentifier(node.callee)
         || node.callee.name !== 'require'
         || node.arguments.length !== 1
         || !t.isStringLiteral(node.arguments[0])) return;

        let src = node.arguments[0].value;
        if (walkRemoves(path, src, opts, true)) return;
        walkRedirects(path, src, opts, true);
        walkGlobals(path, src, opts, true);
      }
    }
  };
};
