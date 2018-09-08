import React, { Component } from "react";

const allowedChars = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
class WordBar extends Component {
  state = {
    word: ""
  };

  wordFilter = c => allowedChars.has(c);

  changeWord = event => {
    const word = event.target.value
      .split("")
      .filter(this.wordFilter)
      .join("");
    this.setState({ word });
  };

  onEnter = event => {
    event.key === "Enter" && (this.props.addWord(this.state.word), this.setState({ word: "" }));
  };

  render() {
    return (
      <div className="word-bar">
        <input
          className="word-input full-size bordered rounded padded"
          type="text"
          disabled={this.props.disabled}
          value={this.state.word}
          onChange={this.changeWord}
          onKeyPress={this.onEnter}
          maxLength="20"
        />
      </div>
    );
  }
}

export default WordBar;
