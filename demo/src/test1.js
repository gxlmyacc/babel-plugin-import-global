import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
  render() {
    return <div>dd</div>
  }
}


function test1() {
  ReactDOM.render(Test, document.getElementById('root'))
}

export {
  test1
}

export default Test;