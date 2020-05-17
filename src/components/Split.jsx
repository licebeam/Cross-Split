import React, { Component } from "react";
import TimeClass from "../core/timer";

class Timer extends Component {
  state = {
    currentTime: "",
    timerState: 0,
  };

  //Currently the split timer is approximately .01 second off from global timer;
  timer = new TimeClass(
    `split-${this.props.split.id}`,
    () => {
      this.updateTimer();
    },
    10
  );

  componentDidUpdate(prevProps) {
    //Check if split timer should activate
    if (
      this.props.globalTimerOn &&
      this.props.isCurrentSplit &&
      this.timer.state === 0
    ) {
      this.props.updateSplitStart(this.state.currentTime);
      this.props.index === 0
        ? this.timer.start(true)
        : this.timer.start(false, this.props.splitStartPoint);
    }
    //Check if split timer should deactivate
    if (!this.props.globalTimerOn) {
      this.timer.resume();
      this.timer.stop();
    }
    //Check if split should pause or unpause
    if (this.props.globalTimerOn && this.props.globalTimerPaused) {
      this.timer.pause();
    }
    //Check if split should resume
    if (
      this.props.globalTimerOn &&
      prevProps.globalTimerPaused &&
      !this.props.globalTimerPaused
    ) {
      this.timer.resume();
    }
  }

  updateTimer = () => {
    this.setState({
      currentTime: this.timer.currentTime,
      timerState: this.timer.state,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.props.isCurrentSplit ? <span>current</span> : <span></span>}
        <button onClick={() => this.props.addSplit(this.props.index)}>
          Add Split
        </button>
        <span>{this.state.currentTime || "time"}</span>
        {this.props.split.title}
        <input
          onChange={(e) =>
            this.props.updateSplitName(e.target.value, this.props.split.id)
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
