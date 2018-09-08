import React, { Component } from "react";
import WordBar from "./WordBar";
import Word from "./Word";

import { GOOD_WORDS, BAD_WORDS } from "./Constants";

class Game extends Component {
  state = {
    goodWords: [],
    badWords: [],
    toastText: ""
  };

  addGoodWord = base => word => !base.includes(word) && this.setState({ goodWords: [...base, word] });

  addBadWord = base => word => !base.includes(word) && this.setState({ badWords: [...base, word] });

  addWord = word => {
    if (GOOD_WORDS.has(word)) {
      this.addGoodWord(this.state.goodWords)(word);
    } else if (BAD_WORDS.has(word)) {
      this.addBadWord(this.state.badWords)(word);
    }
  };

  render() {
    const goodWords = this.state.goodWords.map(w => <Word word={w} />);
    const badWords = this.state.badWords.map(w => <Word word={w} />);
    return (
      <div className="game">
        <WordBar addWord={this.addWord} />
        <div className="words right-aligned">{badWords}</div>
        <div className="words left-aligned">{goodWords}</div>
      </div>
    );
  }
}

export default Game;
