import React, { Component } from "react";
import Split from "./Split";
import styled from "styled-components";

const SplitsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
Array.prototype.insert = function (index, item) {
  return this.splice(index, 0, item);
};
class Splits extends Component {
  state = {
    splits: [{ id: "init-split" }],
    currentSplitIndex: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentProfile !== this.props.currentProfile) {
      this.cleanSplits();
    }
    if (prevProps.game !== this.props.game) {
      this.cleanSplits();
    }
  }

  cleanSplits = () => {
    this.setState({ splits: this.props.splits, currentSplitIndex: 0 });
  };

  removeSplit = (selectedSplit) => {
    if (this.state?.splits?.length >= 2) {
      const newSplits = this.state.splits?.filter(
        (split) => split !== selectedSplit
      );
      this.setState({ splits: newSplits });
    }
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

  clearSplitTimes = () => {
    const newSplits = this.state.splits?.map((split) => {
      return Object.assign({}, split, { previousTime: null });
    });
    this.setState({ splits: newSplits });
  };

  render() {
    return (
      <SplitsContainer>
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
        <button
          disabled={
            this.props.globalTimerOn ||
            this.props.globalTimerPaused ||
            !this.state.splits[0]?.previousTime
          }
          onClick={() => this.clearSplitTimes()}
        >
          Clear Times
        </button>
        <button
          disabled={!this.props.game?.name}
          onClick={() => this.props.updateCurrentGame(this.state.splits)}
        >
          Save Splits
        </button>
      </SplitsContainer>
    );
  }
}

export default Splits;
