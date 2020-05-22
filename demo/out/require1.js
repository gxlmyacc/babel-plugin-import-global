"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;
const React = window.haha.React.default;
const ReactDOM = window.haha.ReactDOM.default;
const _require$default = window.haha.antd.default,
      Row = _require$default.Row,
      Col = _require$default.Col,
      DatePicker = _require$default.DatePicker,
      Input = _require$default.Input,
      Select = _require$default.Select,
      message = _require$default.message,
      Modal = _require$default.Modal,
      Table = _require$default.Table,
      Radio = _require$default.Radio;
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