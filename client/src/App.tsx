import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
      <Router>
        <Route exact path={"/auth"} component={AuthPage}/>
      </Router>

  );
}

export default App;
