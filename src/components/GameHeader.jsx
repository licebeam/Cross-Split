import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;
const GameHeader = (props) => {
  return (
    <Header>
      <input
        placeholder="Game"
        onChange={(e) => props.changeTitle(e.target.value)}
        value={props.gameName || ""}
      />
      <input
        placeholder="Platform"
        onChange={(e) => props.changePlatform(e.target.value)}
        value={props.gamePlatform || ""}
      />
      <input
        placeholder="Category"
        onChange={(e) => props.changeCategory(e.target.value)}
        value={props.gameCategory || ""}
      />
    </Header>
  );
};

export default GameHeader;
