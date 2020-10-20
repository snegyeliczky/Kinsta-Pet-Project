import React, {useContext, useState} from 'react';
import Login from "../components/authComp/Login";
import Registration from "../components/authComp/Registration";
import { Switch } from 'antd';
import {useHistory} from "react-router-dom";
import "../assets/AuthStyle.css"
import {ApplicationContext} from "../context/ApplicationContext";

const AuthPage = () => {

    const [isReg, setReg] = useState<boolean>(true);
    const history= useHistory();
    const appContext = useContext(ApplicationContext);

    const login=(username:string,password:string|number)=> {
        try {
            //here comes the backend login
            console.log(username,password);
            localStorage.setItem("username",username);
            localStorage.setItem("userId","d448b8bb-3df5-4683-9507-3648e6d98b67");
            appContext.setUserName(username);
            history.push("/app")
        }catch (e) {
            console.log(e);
            alert(e.message)
        }
    };

    return (
        <div className={"auth-page"}>
            <h2 className={"welcome-text"}>Welcome</h2>
            <Switch className={"switch"} checkedChildren="Registration" unCheckedChildren="Login" defaultChecked onChange={e=>{
                setReg(e)
            }}/>
            <div className={"auth-component-container"}>
            {isReg?<Login login={login}/>:<Registration login={login}/>}
            </div>

        </div>
    );
};

export default AuthPage;