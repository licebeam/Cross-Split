import React, { Component } from "react";
import TimeClass from "../core/timer";

import styled from "styled-components";

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

class Timer extends Component {
  state = {
    currentTime: "",
    timerState: null,
    lastKnownTime: null,
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
      this.setState({ lastKnownTime: this.state.currentTime }, () => {
        this.timer.stop();
      });
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
      <TimerContainer>
        <h1>{this.state.currentTime || this.state.lastKnownTime}</h1>
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
      </TimerContainer>
    );
  }
}

export default Timer;
