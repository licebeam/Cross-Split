import React, { Component } from "react";
import TimeClass from "../core/timer";

class Timer extends Component {
  state = {
    currentTime: "",
    timerState: null,
  };

  timer = new TimeClass(
    "main",
    () => {
      this.updateTimer();
    },
    10
  );

  componentDidUpdate(prevProps) {
    if (
      prevProps.globalTimerOn &&
      !this.props.globalTimerOn &&
      !this.props.globalTimerPaused
    ) {
      this.timer.pause();
    }
  }

  updateTimer = () => {
    this.setState(
      {
        currentTime: this.timer.currentTime,
        timerState: this.timer.state,
      },
      () => {
        this.props.updateGlobalTime(this.timer.currentTime);
      }
    );
  };

  render() {
    return (
      <div>
        <span>{this.state.currentTime}</span>
        <button
          disabled={this.state.timerState === 1 || this.state.timerState === 2}
          onClick={() => {
            this.props.toggleGlobalTimer();
            this.timer.start(true);
          }}
        >
          Start
        </button>
        <button
          disabled={
            this.state.timerState === 0 ||
            this.state.timerState !== 1 ||
            !this.state.timerState
          }
          onClick={() => {
            this.timer.stop();
            this.props.toggleGlobalTimer();
          }}
        >
          Stop
        </button>
        <button
          disabled={
            this.state.timerState !== 1 ||
            this.state.timerState === 2 ||
            !this.state.timerState
          }
          onClick={() => {
            this.timer.pause();
            this.props.toggleGlobalPause();
          }}
        >
          Pause
        </button>
        <button
          disabled={this.state.timerState !== 2 || this.state.timerState === 3}
          onClick={() => {
            this.timer.resume();
            this.props.toggleGlobalPause();
          }}
        >
          Resume
        </button>
      </div>
    );
  }
}

export default Timer;
