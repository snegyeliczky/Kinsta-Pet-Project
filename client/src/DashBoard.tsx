import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import ProjectPage from "./pages/ProjectPage";
import NewCompany from "./pages/NewCompany";

import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";

const DashBoard = () => {

    let {url, path} = useRouteMatch();

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
        <>
            <NavBar/>
            <div id={"main-content-container"} style={style}>
                <Route exact path={`/app`} component={MainPage}/>
                <Route  path={`/app/project/:id`} component={ProjectPage}/>
                <Route  path={`/app/new-company`} component={NewCompany}/>
            </div>
            <Footer/>
        </>
    );
};

export default DashBoard;
