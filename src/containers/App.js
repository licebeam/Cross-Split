import React, { Component } from "react";
import Gamepad from "react-gamepad";
import GameHeader from "../components/GameHeader";
import Splits from "../components/Splits";
import Timer from "../components/Timer";
class App extends Component {
  state = {
    game: null,
    currentProfile: null,
    globalTimerOn: false,
    globalTimerPaused: false,
    //Split Time:
    splitStartPoint: 0,
    globalTime: 0,
  };
  componentDidMount() {
    this.loadData("test");
  }
  connectHandler(padindex) {
    console.log(`Gamepad ${padindex} connected !`);
  }
  disconnectHandler(gamepadIndex) {
    console.log(`Gamepad ${gamepadIndex} disconnected !`);
  }
  buttonChangeHandler(gamepadIndex) {
    console.log("button change" + gamepadIndex);
  }

  toggleGlobalTimer = () => {
    this.setState({ globalTimerOn: !this.state.globalTimerOn });
  };
  toggleGlobalPause = () => {
    this.setState({ globalTimerPaused: !this.state.globalTimerPaused });
  };

  stopTimers = () => {
    this.setState({
      globalTimerOn: false,
      globalTimerPaused: false,
    });
  };

  updateGlobalTime = (value) => {
    this.setState({
      globalTime: value,
    });
  };

  buildSaveObject = () => {
    let saveObject = {
      games: this.state.currentProfile?.games || [],
    };
    saveObject.games = saveObject.games.filter(
      (game) => game.name !== this.state.game.name
    );
    if (!saveObject.games.find((game) => game.name === this.state.game.name)) {
      saveObject.games.push(this.state.game);
    }
    return saveObject;
  };

  saveData = () => {
    const saveObject = this.buildSaveObject();
    localStorage.setItem("profileSave", JSON.stringify(saveObject));
    this.loadData(this.state.game.name);
  };

  loadData = (gameTitle) => {
    const loadedData = JSON.parse(localStorage.getItem("profileSave"));
    this.setState(
      {
        currentProfile: loadedData,
      },
      () => {
        this.setState({
          game: this.state.currentProfile?.games?.find(
            (game) => game.name === gameTitle
          ),
        });
      }
    );
  };

  //Header functions
  changeTitle = (value) => {
    this.setState({
      game: Object.assign({}, this.state.game, { name: value }),
    });
  };
  changePlatform = (value) => {
    this.setState({
      game: Object.assign({}, this.state.game, { platform: value }),
    });
  };

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
        <GameHeader
          changeTitle={this.changeTitle}
          changePlatform={this.changePlatform}
          gamePlatform={this.state.game?.platform || ""}
          gameName={this.state.game?.name || ""}
        />
        <select onChange={(e) => this.loadData(e.target.value)}>
          {this.state.currentProfile?.games?.map((game) => {
            return <option key={game.name}>{game.name}</option>;
          })}
        </select>
        <button
          disabled={!this.state.game?.name}
          onClick={() => this.saveData()}
        >
          TestSave
        </button>
        <Splits
          globalTime={this.state.globalTime}
          stopTimers={this.stopTimers}
          toggleGlobalTimer={this.toggleGlobalTimer}
          toggleGlobalPause={this.toggleGlobalPause}
          globalTimerOn={this.state.globalTimerOn}
          globalTimerPaused={this.state.globalTimerPaused}
        />
        <Timer
          updateGlobalTime={this.updateGlobalTime}
          toggleGlobalTimer={this.toggleGlobalTimer}
          toggleGlobalPause={this.toggleGlobalPause}
          globalTimerOn={this.state.globalTimerOn}
          globalTimerPaused={this.state.globalTimerPaused}
        />
      </div>
    );
  }
}

export default App;
