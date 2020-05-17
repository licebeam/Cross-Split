import React, { Component } from "react";
import Split from "./Split";
Array.prototype.insert = function (index, item) {
  return this.splice(index, 0, item);
};
class Splits extends Component {
  state = {
    splits: [{ id: "cool first" }],
    currentSplitIndex: 0,
  };

  removeSplit = (selectedSplit) => {
    const newSplits = this.state.splits?.filter(
      (split) => split !== selectedSplit
    );
    this.setState({ splits: newSplits });
  };

  addSplit = (splitIndex) => {
    let newSplits = this.state.splits;
    //Use our array prototype to add a new split
    newSplits.insert(splitIndex, { id: Date.now() });
    //Re-index the array
    newSplits.filter((item) => item);
    this.setState({ splits: newSplits });
  };

  updateSplitValue = (value, id, key) => {
    const newSplits = this.state.splits?.map((split) => {
      if (split.id === id) {
        return Object.assign({}, split, { [key]: value });
      } else return split;
    });
    this.setState({ splits: newSplits });
  };

  nextSplit = () => {
    this.setPrevTime();
    if (this.state.currentSplitIndex >= this.state.splits?.length - 1) {
      this.setState({ currentSplitIndex: 0 }, () => {
        //If you finish your splits, update the startpoint to 0ms
        this.props.stopTimers();
      });
    } else if (this.state.currentSplitIndex <= this.state.splits?.length - 1) {
      this.setState({
        currentSplitIndex: this.state.currentSplitIndex + 1,
      });
    }
  };

  setPrevTime = () => {
    const lastSplit = this.state.splits[this.state.currentSplitIndex];
    this.updateSplitValue(this.props.globalTime, lastSplit.id, "previousTime");
  };

  render() {
    return (
      <div>
        <div>
          {this.state.splits?.map((split, index) => {
            return (
              <Split
                globalTimerOn={this.props.globalTimerOn}
                globalTimerPaused={this.props.globalTimerPaused}
                isCurrentSplit={index === this.state.currentSplitIndex}
                key={split.id}
                index={index}
                updateSplitValue={this.updateSplitValue}
                addSplit={this.addSplit}
                removeSplit={this.removeSplit}
                split={split}
                globalTime={this.props.globalTime}
              />
            );
          })}
        </div>
        <button
          disabled={!this.props.globalTimerOn || this.props.globalTimerPaused}
          onClick={() => this.nextSplit()}
        >
          Next Split
        </button>
      </div>
    );
  }
}

export default Splits;
