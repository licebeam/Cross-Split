import React, { Component } from "react";
import TimeClass from "../core/timer";

class Timer extends Component {
  state = {
    currentTime: "",
  };

  timer = new TimeClass(
    `split-${this.props.id}`,
    () => {
      this.updateTimer();
    },
    10
  );

  updateTimer = () => {
    this.setState({
      currentTime: this.timer.currentTime,
      timerState: this.timer.state,
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.props.addSplit(this.props.index)}>
          Add Split
        </button>
        {this.props.split.title}
        <input
          onChange={(e) =>
            this.props.updateSplitName(e.target.value, this.props.split.id)
          }
        />
        <button onClick={() => this.props.removeSplit(this.props.split)}>
          delete
        </button>
        <span>{this.props.currentTime}</span>
        <button onClick={() => this.props.addSplit(this.props.index + 1)}>
          Add Split
        </button>
      </div>
    );
  }
}

export default Timer;
