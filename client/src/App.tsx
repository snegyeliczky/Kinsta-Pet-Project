import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <Router>
        <Route exact path={"/auth"} component={AuthPage}/>
        <Route exact path={"/"} component={MainPage}/>
      </Router>

  );
}

export default App;
