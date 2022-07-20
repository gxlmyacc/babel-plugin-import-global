"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1 = test1;
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var React = window.React.default;
var ReactDOM = window.ReactDOM.default;
var _require$default = window.Antd.default,
    Select = _require$default.Select,
    DatePicker = _require$default.DatePicker;

var _require$default2 = require('antd-plus').default,
    Row = _require$default2.Row,
    Col = _require$default2.Col,
    Input = _require$default2.Input,
    message = _require$default2.message,
    Modal = _require$default2.Modal,
    Table = _require$default2.Table,
    Radio = _require$default2.Radio;

var _require = require('antd-plus'),
    Test1 = _require.Test1;

var Test2;
Test2 = require('antd-plus');
var Option = Select.Option;

var Test =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test() {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, _getPrototypeOf(Test).apply(this, arguments));
  }

  _createClass(Test, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        React.createElement(Option, null, "dd")
      );
    }
  }]);

  return Test;
}(React.Component);

function test1() {
  ReactDOM.render(Test, document.getElementById('root'));
}

var _default = Test;
exports.default = _default;