import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import {addHeaderAndFooter} from "./components/addHeaderAndFooter";
import ProjectPage from "./pages/ProjectPage";


function App() {



    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route exact path={"/"} component={addHeaderAndFooter(MainPage)}/>
                <Route exact path={"/project/:id"} component={addHeaderAndFooter(ProjectPage)}/>
            </ApplicationProvider>
        </Router>

    );
}

export default App;
