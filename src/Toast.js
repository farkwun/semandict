import React, { Component } from "react";

class Toast extends Component {
  render() {
    return <div className="toast outline-text">{this.props.text}</div>;
  }
}

export default Toast;
