import React, { Component } from "react";
import TimeClass from "../core/timer";

class Timer extends Component {
  state = {
    currentTime: "",
  };

  timer = new TimeClass(
    "main",
    () => {
      this.updateTimer();
    },
    10
  );

  updateTimer = () => {
    this.setState({ currentTime: this.timer.currentTime });
  };

  render() {
    return (
      <div>
        <span>{this.state.currentTime}</span>
        <button
          disabled={this.state.currentTime}
          onClick={() => this.timer.start()}
        >
          Start
        </button>
        <button onClick={() => this.timer.stop()}>Stop</button>
      </div>
    );
  }
}

export default Timer;
