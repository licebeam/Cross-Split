import React from "react";

const GameHeader = (props) => {
  return (
    <div>
      <input
        onChange={(e) => props.changeTitle(e.target.value)}
        value={props.gameName || ""}
      />
      <input
        onChange={(e) => props.changePlatform(e.target.value)}
        value={props.gamePlatform || ""}
      />
    </div>
  );
};

export default GameHeader;
