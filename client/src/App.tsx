import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import {isLoggedIn} from "./components/authComp/loginCheck";
import {addHeaderAndFooter} from "./components/addHeaderAndFooter";

function App() {
    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route exact path={"/"} component={isLoggedIn(addHeaderAndFooter(MainPage),true)}/>
            </ApplicationProvider>
        </Router>

    );
}

export default App;
