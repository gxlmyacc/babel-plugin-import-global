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