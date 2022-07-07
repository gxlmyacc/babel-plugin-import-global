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