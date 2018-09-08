import React, { Component } from "react";

class Toast extends Component {
  render() {
    return <div className="toast">{this.props.text}</div>;
  }
}

export default Toast;
