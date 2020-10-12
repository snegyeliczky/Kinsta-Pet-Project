import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import DashBoard from "./DashBoard";


function App() {

    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route path={"/app"} component={DashBoard}/>

            </ApplicationProvider>
        </Router>

    );
}

export default App;
