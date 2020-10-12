import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import ProjectPage from "./pages/ProjectPage";
import NewCompany from "./pages/NewCompany";

import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import DashBoard from "./DashBoard";


function App() {

    const style = {
        justifyContent: "center",
        width: "100%",
        gridTemplateColumns: "10% 80% 10%",
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 47%, rgba(0,212,255,1) 100%)",
        height: "contentBox",
        minHeight: "100vh",
        paddingTop: "11Vh",
        paddingBottom: "11vh"
    };


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
