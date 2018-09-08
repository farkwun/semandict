import React, { Component } from "react";
import WordBar from "./WordBar";
import Word from "./Word";
import Toast from "./Toast";

import { GOOD_WORDS, BAD_WORDS } from "./Constants";

class Game extends Component {
  state = {
    goodWords: [],
    badWords: [],
    toastText: "",
    score: 127,
    gameOver: false
  };

  addGoodWord = base => word => !base.includes(word) && this.setState({ goodWords: [...base, word] });

  addBadWord = base => word => !base.includes(word) && this.setState({ badWords: [...base, word] });

  addWord = word => {
    this.setState({ toastText: "" });
    if (GOOD_WORDS.has(word)) {
      this.addGoodWord(this.state.goodWords)(word);
    } else if (BAD_WORDS.has(word)) {
      this.addBadWord(this.state.badWords)(word);
    } else {
      this.setState({ toastText: "That word doesn't make me feel anything." });
    }
  };

  render() {
    const goodWords = this.state.goodWords.map(w => <Word word={w} />);
    const badWords = this.state.badWords.map(w => <Word word={w} />);
    const { score, gameOver } = this.state;
    return (
      <div className="game" style={{ backgroundColor: `rgb(${score}, ${score}, ${score})` }}>
        <WordBar addWord={this.addWord} />
        {this.state.toastText !== "" && <Toast text={this.state.toastText} />}
        {gameOver && <div className="words right-aligned">{badWords}</div>}
        {gameOver && <div className="words left-aligned">{goodWords}</div>}
      </div>
    );
  }
}

export default Game;
