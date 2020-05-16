import React from "react";

const GameHeader = (props) => {
  return (
    <div>
      <input
        onChange={(e) => props.changeTitle(e.target.value)}
        value={props.gameName || ""}
      />
    </div>
  );
};

export default GameHeader;
