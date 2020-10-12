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

                    <NavBar/>
                    <div id={"main-content-container"} style={style}>
                        <Switch>
                            <Route exact path={"/"} component={MainPage}/>
                            <Route exact path={"/project/:id"} component={ProjectPage}/>
                            <Route exact path={"/new-company"} component={NewCompany}/>
                        </Switch>
                    </div>
                    <Footer/>

            </ApplicationProvider>
        </Router>

    );
}

export default App;
