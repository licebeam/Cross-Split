import React, { Component } from "react";
import styled from "styled-components";

const Split = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
class Timer extends Component {
  render() {
    return (
      <Split>
        {/* {this.props.isCurrentSplit ? <span>current</span> : <span></span>} */}

        <input
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
        <button onClick={() => this.props.addSplit(this.props.index)}>
          Add Split ^
        </button>
        <button onClick={() => this.props.addSplit(this.props.index + 1)}>
          Add Split V
        </button>
        <button onClick={() => this.props.removeSplit(this.props.split)}>
          delete
        </button>
      </Split>
    );
  }
}

export default Timer;
