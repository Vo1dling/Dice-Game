import React from "react";
import Player from "../Player/Player.components";
import Dice from "../Dice/Dice.components";
import BGMusic from "../../audio/BGMusic.mp3";
import HoldSound from "../../audio/HoldSound.mp3";
import "./Board.styles.css";
import resetImage from "./assets/imgs/reset.gif";
class Board extends React.Component {
  componentDidMount() {
    this.ChangeActivePlayer();
    const BG = new Audio(BGMusic);
    document.body.addEventListener("click", () => {
      BG.play();
    });
    BG.addEventListener("ended", () => {
      BG.play();
    });
  }
  state = {
    p1Score: 0,
    p2Score: 0,
    p1Temp: 0,
    p2Temp: 0,
    playerTurn: 1,
    pointsToWin: 100,
    gameOver: false,
  };
  OnScoreChange = (sum) => {
    if (this.state.playerTurn === 1) {
      if (sum === 0) {
        this.setState({ p1Temp: 0 }, this.HoldScore);
      } else {
        this.setState({ p1Temp: this.state.p1Temp + sum });
      }
    }
    if (this.state.playerTurn === 2) {
      if (sum === 0) {
        this.setState({ p2Temp: 0 }, this.HoldScore);
      } else {
        this.setState({ p2Temp: this.state.p2Temp + sum });
      }
    }
  };
  HoldScore = () => {
    if (this.state.playerTurn === 1) {
      this.setState(
        {
          p1Score: this.state.p1Score + this.state.p1Temp,
          playerTurn: 2,
          p1Temp: 0,
        },
        this.CheckScore
      );
    }
    if (this.state.playerTurn === 2) {
      this.setState(
        {
          p2Score: this.state.p2Score + this.state.p2Temp,
          playerTurn: 1,
          p2Temp: 0,
        },
        this.CheckScore
      );
    }
    new Audio(HoldSound).play();
  };
  ChangeThreshold = () => {
    const input = document.querySelector(".input-threshold");
    if (+input.value >= 250 && +input.value <= 400) {
      this.setState({ pointsToWin: +input.value });
      document.querySelector(".landing-page").classList.add("opacity-hidden");
      setTimeout(() => {
        document.querySelector(".landing-page").classList.add("z-position");
      }, 750);
    } else {
      this.CallPopup("Please insert a number of blocks between 150 and 400");
    }
  };
  CallPopup(message) {
    const popup = document.querySelector(".popup-message");
    popup.innerText = message;
    popup.classList.remove("transform-y", "opacity-hidden");
    setTimeout(() => {
      popup.classList.add("transform-y", "opacity-hidden");
    }, 2500);
  }
  ResetGame = () => {
    this.setState({
      p1Score: 0,
      p2Score: 0,
      p1Temp: 0,
      p2Temp: 0,
      playerTurn: 1,
      gameOver: false,
    });
    document
      .querySelector(".landing-page")
      .classList.remove("z-position", "opacity-hidden");
    document
      .querySelector(".player-1 .text-container")
      .classList.remove("display-none");
    document
      .querySelector(".player-1 .winner-text")
      .classList.add("display-none");
    document
      .querySelector(".player-2 .text-container")
      .classList.remove("display-none");
    document
      .querySelector(".player-2 .winner-text")
      .classList.add("display-none");
  };
  ChangeActivePlayer = () => {
    const activePlayer = document.querySelector(
      `.player-${this.state.playerTurn}`
    );
    const passivePlayer = document.querySelector(
      `.player-${this.state.playerTurn === 1 ? 2 : 1}`
    );
    activePlayer.classList.add("active-turn");
    passivePlayer.classList.remove("active-turn");
  };
  CheckScore = () => {
    if (this.state.p1Score >= this.state.pointsToWin) {
      document
        .querySelector(".player-1 .text-container")
        .classList.add("display-none");
      document
        .querySelector(".player-1 .winner-text")
        .classList.remove("display-none");
      this.setState({ gameOver: true });
    } else if (this.state.p2Score >= this.state.pointsToWin) {
      document
        .querySelector(".player-2 .text-container")
        .classList.add("display-none");
      document
        .querySelector(".player-2 .winner-text")
        .classList.remove("display-none");
      this.setState({ gameOver: true });
    } else {
      this.ChangeActivePlayer();
    }
  };
  render() {
    const { p1Score, p2Score, p1Temp, p2Temp } = this.state;

    return (
      <div className="parent-container">
        <div className="popup-message opacity-hidden transform-y"></div>
        <div className="game-container">
          <Player playerNumber={1} tempScore={p1Temp} globalScore={p1Score} />

          <div className="settings-container">
            <button type="button" onClick={this.ResetGame}>
              <img src={resetImage} alt="Reset" /> Reset Game
            </button>
            <Dice
              onChange={this.OnScoreChange}
              onClick={this.HoldScore}
              gameOver={this.state.gameOver}
            />
          </div>
          <Player playerNumber={2} tempScore={p2Temp} globalScore={p2Score} />
        </div>
        <div className="landing-page">
          <h3>Please Input a number between 250 and 400</h3>
          <input
            type="number"
            placeholder="Type in the threshold for winning..."
            className="input-threshold"
            onKeyPress={(e) => {
              if (e.key === "Enter") this.ChangeThreshold();
            }}
          />
          <button
            type="button"
            onClick={this.ChangeThreshold}
            className="confirm-btn"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}
export default Board;
