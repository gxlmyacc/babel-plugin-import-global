const React = require('react').default;
const ReactDOM = require('react-dom').default;
const {
  Select, DatePicker
} = require('antd').default;

const {
  Row, Col, Input, message, Modal, Table, Radio,
} = require('antd-plus').default;

const { Test1 } = require('antd-plus');

let Test2;

Test2 = require('antd-plus');

require('antd.css');

const { Option } = Select;

class Test extends React.Component {
  render() {
    return <Option>dd</Option>
  }
}


function test1() {
  ReactDOM.render(Test, document.getElementById('root'))
}

export {
  test1
}

export default Test;