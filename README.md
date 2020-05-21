# babel-plugin-import-global
a babel plugin that transfrom import vars to global vars

## installtion

```base
  npm install --save-dev babel-plugin-import-global
  // or 
  yarn add -D babel-plugin-import-global
```

## config


```js
// babel.config.js
module.exports = {
  presets: [
    ...
  ],
  plugins: [
    [
      'babel-plugin-import-global',
      {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ],
   ...
  ]
};
```

## demo

```js
import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
  render() {
    return <div>dd</div>
  }
}


function test1() {
  ReactDOM.render(Test, document.getElementById('root'))
}

export {
  test1
}

export default Test;
```

will transform to:
```js
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
const React = window.React;
const ReactDOM = window.ReactDOM;

class Test extends React.Component {
  render() {
    return (
      /*#__PURE__*/
      React.createElement("div", null, "dd")
    );
  }

}

function test1() {
  ReactDOM.render(Test, document.getElementById('root'));
}

var _default = Test;
exports.default = _default;
```

