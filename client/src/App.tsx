import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {AuthCheck} from "./components/authComp/loginCheck"
import {ApplicationProvider} from "./context/ApplicationContext";


function App() {

    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route exact path={"/"} component={AuthCheck(MainPage,true)}/>
            </ApplicationProvider>
        </Router>

    );
}

export default App;
