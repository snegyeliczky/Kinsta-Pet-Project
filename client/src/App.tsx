import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import DashBoard from "./DashBoard";
import "./App.less"


function App() {

    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route path={"/app"} component={DashBoard}/>
                <Route exact path={"/"} render={()=>{return(
                    <Redirect to={"/app"}/>
                )}}/>
            </ApplicationProvider>
        </Router>

    );
}

export default App;
