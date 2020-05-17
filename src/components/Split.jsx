import React, { Component } from "react";
import TimeClass from "../core/timer";
import moment from "moment";
import { convertStringTime } from "../core/converter";
class Timer extends Component {
  state = {
    savedTimer: false,
    timerState: 0,
  };

  componentDidUpdate(prevProps) {
    //Check if split timer should activate
    if (
      this.props.globalTimerOn &&
      prevProps.isCurrentSplit &&
      !this.props.isCurrentSplit
    ) {
      this.saveTime();
    }
  }

  saveTime = () => {
    this.setState({ savedTimer: this.props.globalTime });
  };

  render() {
    return (
      <div>
        {this.props.isCurrentSplit ? <span>current</span> : <span></span>}
        <button onClick={() => this.props.addSplit(this.props.index)}>
          Add Split
        </button>
        {this.props.isCurrentSplit ? (
          <span>{this.state.savedTimer}</span>
        ) : (
          <span>{this.props.globalTime || "time"}</span>
        )}

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
