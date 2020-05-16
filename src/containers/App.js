import React, { Component } from "react";
import Gamepad from "react-gamepad";
import GameHeader from "../components/GameHeader";
class App extends Component {
  state = {
    game: null,
    currentProfile: null,
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

  buildSaveObject = () => {
    let saveObject = {
      profile: "test-profile",
      games: this.state.currentProfile?.games
        ? [...this.state.currentProfile?.games]
        : [],
    };
    if (!saveObject.games.find((game) => game.name === this.state.gameName)) {
      saveObject.games.push(this.state.game);
    }
    return saveObject;
  };

  saveData = () => {
    const saveObject = this.buildSaveObject();
    console.log(saveObject);
    localStorage.setItem("profileSave", JSON.stringify(saveObject));
    console.log("Game Saved " + this.state.game?.name);
    this.loadData("test");
  };

  loadData = (gameTitle) => {
    const loadedData = JSON.parse(localStorage.getItem("profileSave"));
    console.log("Loaded Game " + gameTitle);
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

  render() {
    console.log(this.state);
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
          gameName={this.state.game?.name || ""}
        />
        <select onChange={(e) => this.loadData(e.target.value)}>
          {this.state.currentProfile?.games?.map((game) => {
            return <option key={game.name}>{game.name}</option>;
          })}
        </select>
        <button onClick={() => this.saveData()}>TestSave</button>
      </div>
    );
  }
}

export default App;
