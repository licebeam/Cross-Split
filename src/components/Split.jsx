import React, { Component } from "react";
import styled from "styled-components";

const Split = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  transition: 0.2s all;
  background-color: ${(props) => (props.current ? "orange" : "grey")};
  input {
    &:disabled {
      background-color: ${(props) => (props.editMode ? "purple" : "orange")};
      border: ${(props) => (props.editMode ? "none" : "grey")};
      color: black;
    }
  }
  &:hover {
    cursor: pointer;
  }
  button {
    &:hover {
      background-color: pink;
      color: black;
    }
  }
`;
class Timer extends Component {
  render() {
    return (
      <Split current={this.props.isCurrentSplit} editMode={this.props.editMode}>
        <input
          disabled={!this.props.editMode}
          placeholder="Split title"
          value={this.props.split?.name || ""}
          onChange={(e) =>
            this.props.updateSplitValue(
              e.target.value,
              this.props.split.id,
              "name"
            )
          }
        />
        <h1>{this.props.split?.previousTime || "--"}</h1>
        {this.props.editMode ? (
          <div>
            <button onClick={() => this.props.addSplit(this.props.index)}>
              Add Split ^
            </button>
            <button onClick={() => this.props.addSplit(this.props.index + 1)}>
              Add Split V
            </button>
            <button onClick={() => this.props.removeSplit(this.props.split)}>
              delete
            </button>
          </div>
        ) : null}
      </Split>
    );
  }
}

export default Timer;
