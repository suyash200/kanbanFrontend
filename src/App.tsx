import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Trial from "./components/trial";
import Card from "./components/kanban/card/card";
import Column from "./components/kanban/column/column";
import MegaCombo from "./components/trialcombo";
import Board from "./components/kanban/board/board";
import Kanban from "./components/kanban/kanban";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    
     <Kanban/>
      
    </div>
  );
}

export default App;
