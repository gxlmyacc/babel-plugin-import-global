"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
var React = window.React;
var ReactDOM = window.ReactDOM;
var Row = window.antd.Row;
var Col = window.antd.Col;
var DatePicker = window.antd.DatePicker;
var Input = window.antd.Input;
var Select = window.antd.Select;
var message = window.antd.message;
var Modal = window.antd.Modal;
var Table = window.antd.Table;
var Radio = window.antd.Radio;
var Test1 = {}.Test1;
const _Select = Select,
      Option = _Select.Option;

class Test extends React.Component {
  render() {
    return (
      /*#__PURE__*/
      React.createElement(Option, null, "dd")
    );
  }

}

function test1() {
  ReactDOM.render(Test, document.getElementById('root'));
}

var _default = Test;
exports.default = _default;