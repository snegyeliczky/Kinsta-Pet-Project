import React, {useContext} from 'react';
import './App.css';
import {Route, useHistory} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import NewCompany from "./pages/NewCompany";
import NavBar from "./parts/NavBar";
import Footer from "./parts/Footer";
import requireAuthentication from "./components/authComp/AuthenticatedComponent";
import {ApplicationContext} from "./context/ApplicationContext";
import {ProjectProvider} from "./context/ProjectContext";
import ProfilePage from "./pages/ProfilePage";


const DashBoard = () => {

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

    const history = useHistory();
    const appContext = useContext(ApplicationContext);

    return (
        <>
            <NavBar/>
            <div id={"main-content-container"} style={style}>
                <Route exact path={`/app`} component={requireAuthentication(MainPage, history, appContext)}/>
                <ProjectProvider>
                    <Route exact path={`/app/project/:id`}
                           component={requireAuthentication(ProjectPage, history, appContext)}/>
                </ProjectProvider>
                <Route exact path={`/app/new-company`}
                       component={requireAuthentication(NewCompany, history, appContext)}/>
                <Route exact path={`/app/profile`}
                       component={requireAuthentication(ProfilePage, history, appContext)}/>
            </div>
            <Footer/>
        </>
    );
};

export default DashBoard;
