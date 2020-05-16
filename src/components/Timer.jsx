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
    this.setState({
      currentTime: this.timer.currentTime,
      timerState: this.timer.state,
    });
  };

  render() {
    return (
      <div>
        <span>{this.state.currentTime}</span>
        <button
          disabled={this.state.timerState === 1 || this.state.timerState === 2}
          onClick={() => this.timer.start(true)}
        >
          Start
        </button>
        <button
          disabled={this.state.timerState === 0 && this.state.timerState !== 1}
          onClick={() => this.timer.stop()}
        >
          Stop
        </button>
        <button
          disabled={this.state.timerState !== 1 || this.state.timerState === 2}
          onClick={() => this.timer.pause()}
        >
          Pause
        </button>
        <button
          disabled={this.state.timerState !== 2 || this.state.timerState === 3}
          onClick={() => this.timer.resume()}
        >
          Resume
        </button>
      </div>
    );
  }
}

export default Timer;
