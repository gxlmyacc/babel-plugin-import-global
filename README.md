# babel-plugin-import-global

a babel plugin that suppport:
  1. transfrom import vars (`import xxx from 'xxx'`) to global vars (`var xxx = window.xxx`).
  2. remove some import statements;
  3. redirect some import statements;


[![NPM version](https://img.shields.io/npm/v/babel-plugin-import-global.svg?style=flat)](https://npmjs.com/package/babel-plugin-import-global)
[![NPM downloads](https://img.shields.io/npm/dm/babel-plugin-import-global.svg?style=flat)](https://npmjs.com/package/babel-plugin-import-global)

## installtion

```bash
  npm install --save-dev babel-plugin-import-global
  // or 
  yarn add -D babel-plugin-import-global
```

## config


```js
const camelCase =  require('camelcase');
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
          antd: 'antd',
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        removes: [
          'antd.css'
        ],
        redirects: [
          {
            from: /^antd-plus\/npm\/components\/([^/]+)$/,
            to: 'antd-plus',
            imported: (src, matched) => camelCase(matched[1], { pascalCase: true })
          }
        ],
        // includes: [],
        // excludes: [/node_modules/],
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
import { Search } from 'antd/npm/components/input';
import Button from 'antd/npm/components/button';
import Input from 'antd/npm/components/input';

import 'antd.css';

const Select = require('antd/npm/components/select')

const { Option } = Select;

function Test() {
  return (
    <>
    <Select>
      <Option>dd</Option>
    </Select>
    <Input />
    <Search />
    <Button>test</Button>
    </>
  )
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
exports["default"] = void 0;

var _antd = require("antd");

var React = window.React;
var ReactDOM = window.ReactDOM;

var Search = require("antd").Input.Search;

var Select = require("antd").Select;

var Option = Select.Option;

function Test() {
  return (
    /*#__PURE__*/
    React.createElement(React.Fragment, null,
    /*#__PURE__*/
    React.createElement(Select, null,
    /*#__PURE__*/
    React.createElement(Option, null, "dd")),
    /*#__PURE__*/
    React.createElement(_antd.Input, null),
    /*#__PURE__*/
    React.createElement(Search, null),
    /*#__PURE__*/
    React.createElement(_antd.Button, null, "test"))
  );
}

function test1() {
  ReactDOM.render(Test, document.getElementById('root'));
}

var _default = Test;
exports["default"] = _default;
```

## options

- `globals` that will transform to global vars. demo:

```js
{
  globals: {
    antd: 'antd'
  }
}
```
or
```js
{
  globals(src) {
    const map = {
      antd: 'antd'
    };
    return map[src];
  }
}
```

- `removes` that will be removed from code. demo:
```js
{
  removes: [
    'antd',
    /some\.css$/,
    function(src) {
      return src === 'antd';
    }
  ]
}
```

- `redirects` that will redirect the import source. demo:
```js
{
  redirects: [
    {
      // string or Regexp
      from: /^antd\/npm\/components\/([^/]+)$/,
      // string or string.repalce`s function 
      to: 'antd',
      // custom imported handler, optional
      imported: (src, matched) => camelCase(matched[1], { pascalCase: true })
    }
  ]
}
```

- `namespace` that will transfrom to `window.namespace.varName` if provided.

- `global` default is `window`.

- `varKind` default is `var`.

- `includes` includes files RegExp list.

- `excludes` excludes files RegExp list.



