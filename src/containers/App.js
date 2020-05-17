import React, { Component } from "react";
import Gamepad from "react-gamepad";
import GameHeader from "../components/GameHeader";
import Splits from "../components/Splits";
import Timer from "../components/Timer";
import styled from "styled-components";

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
`;
class App extends Component {
  state = {
    game: null,
    currentProfile: null,
    globalTimerOn: false,
    globalTimerPaused: false,
    //Split Time:
    splitStartPoint: 0,
    globalTime: 0,
    //EditMode
    editMode: true,
  };
  componentDidMount() {
    this.loadData("initial-game");
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
    console.log("loading - " + gameTitle);
    const loadedData = JSON.parse(localStorage.getItem("profileSave"));
    this.setState(
      {
        currentProfile: loadedData,
        game: null,
      },
      () => {
        console.log(loadedData);
        this.setState({
          game: this.state.currentProfile?.games?.find(
            (game) => game.name === gameTitle
          ),
        });
      }
    );
  };

  updateCurrentGame = (splits) => {
    this.setState(
      {
        game: Object.assign({}, this.state.game, { splits }),
      },
      () => {
        this.saveData();
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
  changeCategory = (value) => {
    this.setState({
      game: Object.assign({}, this.state.game, { category: value }),
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
        <TopBar>
          <select
            placeholder="Select Game"
            disabled={!this.state.currentProfile?.games?.length}
            onChange={(e) => this.loadData(e.target.value)}
          >
            <option selected="selected">Select a Game</option>
            {this.state.currentProfile?.games?.map((game) => {
              return <option key={game.name}>{game.name}</option>;
            })}
          </select>
          <button
            onClick={() => this.setState({ editMode: !this.state.editMode })}
          >
            Edit Mode
          </button>
        </TopBar>
        <GameHeader
          changeCategory={this.changeCategory}
          changeTitle={this.changeTitle}
          changePlatform={this.changePlatform}
          gamePlatform={this.state.game?.platform || ""}
          gameCategory={this.state.game?.category || ""}
          gameName={this.state.game?.name || ""}
        />
        <Splits
          editMode={this.state.editMode}
          currentProfile={this.state.currentProfile}
          game={this.state.game}
          updateCurrentGame={this.updateCurrentGame}
          globalTime={this.state.globalTime}
          stopTimers={this.stopTimers}
          toggleGlobalTimer={this.toggleGlobalTimer}
          toggleGlobalPause={this.toggleGlobalPause}
          globalTimerOn={this.state.globalTimerOn}
          globalTimerPaused={this.state.globalTimerPaused}
          splits={this.state.game?.splits || [{ id: "init-split" }]}
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
