import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import {ApplicationProvider} from "./context/ApplicationContext";
import {addHeaderAndFooter} from "./components/addHeaderAndFooter";
import ProjectPage from "./pages/ProjectPage";
import NewCompany from "./pages/NewCompany";
import {useHistory} from "react-router-dom";


function App() {

 const history = useHistory();
 console.log(history)

    return (
        <Router>
            <ApplicationProvider>
                <Route exact path={"/auth"} component={AuthPage}/>
                <Route exact path={"/"} component={addHeaderAndFooter(MainPage)}/>
                <Route exact path={"/project/:id"} component={addHeaderAndFooter(ProjectPage)}/>
                <Route exact path={"/new-company"} component={addHeaderAndFooter(NewCompany)}/>
            </ApplicationProvider>
        </Router>

    );
}

export default App;
