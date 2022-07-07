import React from "react";
import ReactDOM from "react-dom";
import { Search } from 'antd/npm/components/input';
import Button from 'antd/npm/components/button';
import Input from 'antd/npm/components/input';

import 'antd.css';

const Select = require('antd/npm/components/select')

const { Option } = Select;

function Test() {
  return (
    <>
    <Select>
      <Option>dd</Option>
    </Select>
    <Input />
    <Search />
    <Button>test</Button>
    </>
  )
}


function test1() {
  ReactDOM.render(Test, document.getElementById('root'))
}

export {
  test1
}

export default Test;
