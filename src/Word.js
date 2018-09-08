import React, { Component } from "react";

class Word extends Component {
  render() {
    return (
      <div className="word outline-text">
        <b>{this.props.word}</b>
      </div>
    );
  }
}

export default Word;
