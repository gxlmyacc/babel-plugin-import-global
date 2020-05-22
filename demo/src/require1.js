const React = require('react').default;
const ReactDOM = require('react-dom').default;
const {
  Row, Col, DatePicker, Input, Select, message, Modal, Table, Radio,
} = require('antd').default;

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