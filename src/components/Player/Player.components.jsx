import React from "react";
import Counter from "../Counter/Counter.components";
const Player = (props) => {
  const { globalScore, tempScore, playerNumber } = props;
  return (
    <div className={`player-${playerNumber}`}>
      <div className="text-container">
        <h2>Player-{playerNumber}</h2>
        <Counter
          playerNumber={playerNumber}
          isTemp={false}
          score={globalScore}
        />
        <Counter playerNumber={playerNumber} isTemp={true} score={tempScore} />
      </div>
      <div className="winner-text display-none">
        <h3>Winner!!</h3>
      </div>
    </div>
  );
};
export default Player;
