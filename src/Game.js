import React, { Component } from "react";
import WordBar from "./WordBar";
import Word from "./Word";

class Game extends Component {
  state = {
    words: []
  };

  addWord = word => this.setState({ words: [...this.state.words, word] });

  render() {
    const words = this.state.words.map(w => <Word word={w} />);
    return (
      <div className="game">
        <WordBar addWord={this.addWord} />
        <div className="words">{words}</div>
      </div>
    );
  }
}

export default Game;
