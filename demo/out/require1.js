"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
// const React = require('react').default;
// const ReactDOM = require('react-dom').default;
// const {
//   Select, DatePicker
// } = require('antd').default;
// const {
//   Row, Col, Input, message, Modal, Table, Radio,
// } = require('antd-plus').default;
// const { Test1 } = require('antd-plus');
// let Test2;
// Test2 = require('antd-plus');
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