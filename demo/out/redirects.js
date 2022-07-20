"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
var React = window.React;
var ReactDOM = window.ReactDOM;
var Search = window.Antd.Input.Search;
var Button = window.Antd.Button;
var Input = window.Antd.Input;
var Select = window.Antd.Select;
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
    React.createElement(Input, null),
    /*#__PURE__*/
    React.createElement(Search, null),
    /*#__PURE__*/
    React.createElement(Button, null, "test"))
  );
}

function test1() {
  ReactDOM.render(Test, document.getElementById('root'));
}

var _default = Test;
exports.default = _default;