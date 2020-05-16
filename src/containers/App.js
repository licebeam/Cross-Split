import React, { Component } from "react";
import Gamepad from "react-gamepad";

class App extends Component {
  connectHandler(padindex) {
    console.log(`Gamepad ${padindex} connected !`);
  }
  disconnectHandler(gamepadIndex) {
    console.log(`Gamepad ${gamepadIndex} disconnected !`);
  }

  render() {
    return (
      <div className="App">
        <Gamepad
          onConnect={this.connectHandler}
          onDisconnect={this.disconnectHandler}
          onButtonChange={this.buttonChangeHandler}
        >
          <></>
        </Gamepad>
        <span>Everything will go here.</span>
      </div>
    );
  }
}

export default App;
