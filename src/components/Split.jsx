import React, { Component } from "react";

class Timer extends Component {
  render() {
    return (
      <div>
        {this.props.index}
        {this.props.isCurrentSplit ? <span>current</span> : <span></span>}
        <button onClick={() => this.props.addSplit(this.props.index)}>
          Add Split
        </button>
        {!this.props.isCurrentSplit ? (
          <span>{this.props.split?.previousTime}</span>
        ) : (
          <span>{this.props.globalTime || "time"}</span>
        )}

        {this.props.split.title}
        <input
          onChange={(e) =>
            this.props.updateSplitName(
              e.target.value,
              this.props.split.id,
              "name"
            )
          }
        />
        <button onClick={() => this.props.removeSplit(this.props.split)}>
          delete
        </button>
        <button onClick={() => this.props.addSplit(this.props.index + 1)}>
          Add Split
        </button>
      </div>
    );
  }
}

export default Timer;
