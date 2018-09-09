import React, { Component } from "react";
import WordBar from "./WordBar";
import Word from "./Word";
import Toast from "./Toast";
import ResetButton from "./ResetButton";

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
    gameOver: false,
    tryCounter: 0
  };

  addGoodWord = base => word => this.setState({ goodWords: [...base, word] }, this.setScore);

  addBadWord = base => word => this.setState({ badWords: [...base, word] }, this.setScore);

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
    if (this.state.goodWords.includes(word) || this.state.badWords.includes(word)) {
      this.setToastText("That word doesn't make me feel anything anymore.");
      return;
    }
    if (GOOD_WORDS.has(word)) {
      this.addGoodWord(this.state.goodWords)(word);
      this.setState({ tryCounter: 0 });
    } else if (BAD_WORDS.has(word)) {
      this.addBadWord(this.state.badWords)(word);
      this.setState({ tryCounter: 0 });
    } else if (this.state.tryCounter < 15) {
      this.setToastText("That word doesn't make me feel anything.");
      this.setState({ tryCounter: this.state.tryCounter + 1 });
    } else {
      this.setToastText("That word doesn't make me *feel anything*.");
    }
  };

  resetGame = () =>
    this.setState({
      goodWords: [],
      badWords: [],
      toastText: "",
      score: BASE_SCORE,
      gameOver: false
    });

  render() {
    const goodWords = this.state.goodWords.map(w => <Word word={w} />);
    const badWords = this.state.badWords.map(w => <Word word={w} />);
    const { score, gameOver } = this.state;
    return (
      <div className="game" style={{ backgroundColor: `rgb(${score}, ${score}, ${score})` }}>
        <div className="title outline-text">talk to me</div>
        {gameOver ? <ResetButton resetGame={this.resetGame} /> : <WordBar disabled={gameOver} addWord={this.addWord} />}
        {this.state.toastText !== "" && <Toast text={this.state.toastText} />}
        {gameOver && <div className="words right-aligned">{badWords}</div>}
        {gameOver && <div className="words left-aligned">{goodWords}</div>}
      </div>
    );
  }
}

export default Game;
