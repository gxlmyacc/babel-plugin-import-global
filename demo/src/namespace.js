import React from "react";
import ReactDOM from "react-dom";
import {
  Row, Col, DatePicker, Input, Select, message, Modal, Table, Radio,
} from 'haha';

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