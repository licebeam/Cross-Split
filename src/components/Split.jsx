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
        <span>{this.props.split?.previousTime || "--"}</span>
        <input
          value={this.props.split?.name || ""}
          onChange={(e) =>
            this.props.updateSplitValue(
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
