import React, { Component } from "react";

class ResetButton extends Component {
  render() {
    return (
      <div className="reset-bar">
        <button className="word-input full-size bordered rounded padded" onClick={this.props.resetGame}>
          let me try again
        </button>
      </div>
    );
  }
}

export default ResetButton;
