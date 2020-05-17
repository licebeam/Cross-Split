import React, { Component } from "react";
import Split from "./Split";

Array.prototype.insert = function (index, item) {
  return this.splice(index, 0, item);
};

class Splits extends Component {
  state = {
    splits: [{ id: "cool first" }],
  };
  updateSplitName = (value, id) => {
    const newSplits = this.state.splits?.map((split) => {
      if (split.id === id) {
        return Object.assign({}, split, { name: value });
      } else return split;
    });
    this.setState({ splits: newSplits });
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

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          {this.state.splits?.map((split, index) => {
            return (
              <Split
                key={split.id}
                index={index}
                updateSplitName={this.updateSplitName}
                addSplit={this.addSplit}
                removeSplit={this.removeSplit}
                split={split}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Splits;
