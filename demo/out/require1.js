"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
const React = window.React.default;
const ReactDOM = window.ReactDOM.default;
const _require$default = window.antd.default,
      Select = _require$default.Select,
      DatePicker = _require$default.DatePicker;
const _require$default2 = window["antd-plus"].default,
      Row = _require$default2.Row,
      Col = _require$default2.Col,
      Input = _require$default2.Input,
      message = _require$default2.message,
      Modal = _require$default2.Modal,
      Table = _require$default2.Table,
      Radio = _require$default2.Radio;
const Option = Select.Option;

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