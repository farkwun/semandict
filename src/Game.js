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
      <div>
        <WordBar addWord={this.addWord} />
        {words}
      </div>
    );
  }
}

export default Game;
