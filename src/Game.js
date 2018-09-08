import React, { Component } from "react";
import WordBar from "./WordBar";
import Word from "./Word";
import Toast from "./Toast";

import {
  MAX_SCORE,
  MIN_SCORE,
  GOOD_WORDS,
  BAD_WORDS,
  BASE_SCORE,
  MULTIPLIER,
  CONVERSATION_LENGTH,
  getGameOverText
} from "./Constants";

class Game extends Component {
  state = {
    goodWords: [],
    badWords: [],
    toastText: "",
    score: BASE_SCORE,
    gameOver: false
  };

  addGoodWord = base => word => !base.includes(word) && this.setState({ goodWords: [...base, word] }, this.setScore);

  addBadWord = base => word => !base.includes(word) && this.setState({ badWords: [...base, word] }, this.setScore);

  setScore = () => {
    const { goodWords, badWords } = this.state;
    const score = goodWords.length * MULTIPLIER - badWords.length * MULTIPLIER + BASE_SCORE;
    this.setState({ score }, this.setGameOver);
  };

  setGameOver = () => {
    const { score, goodWords, badWords } = this.state;
    const gameOver =
      score <= MIN_SCORE || score >= MAX_SCORE || goodWords.length + badWords.length >= CONVERSATION_LENGTH;
    this.setState({ gameOver }, gameOver ? this.setToastText(getGameOverText(score)) : () => {});
  };

  setToastText = toastText => this.setState({ toastText });

  addWord = word => {
    this.setState({ toastText: "" });
    if (GOOD_WORDS.has(word)) {
      this.addGoodWord(this.state.goodWords)(word);
    } else if (BAD_WORDS.has(word)) {
      this.addBadWord(this.state.badWords)(word);
    } else {
      this.setToastText("That word doesn't make me feel anything.");
    }
  };

  render() {
    const goodWords = this.state.goodWords.map(w => <Word word={w} />);
    const badWords = this.state.badWords.map(w => <Word word={w} />);
    const { score, gameOver } = this.state;
    console.log(score);
    return (
      <div className="game" style={{ backgroundColor: `rgb(${score}, ${score}, ${score})` }}>
        <div className="title outline-text">talk to me</div>
        <WordBar disabled={gameOver} addWord={this.addWord} />
        {this.state.toastText !== "" && <Toast text={this.state.toastText} />}
        {gameOver && <div className="words right-aligned">{badWords}</div>}
        {gameOver && <div className="words left-aligned">{goodWords}</div>}
      </div>
    );
  }
}

export default Game;
