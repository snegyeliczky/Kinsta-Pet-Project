import React, {useContext, useState} from 'react';
import Login from "../components/authComp/Login";
import Registration from "../components/authComp/Registration";
import {message, Switch} from 'antd';
import {useHistory} from "react-router-dom";
import "../assets/AuthStyle.css"
import {ApplicationContext} from "../context/ApplicationContext";
import {useLazyQuery} from "@apollo/client";
import {loginUser} from "../queries/userQueries";

const AuthPage = () => {

    const [isReg, setReg] = useState<boolean>(true);
    const history = useHistory();
    const appContext = useContext(ApplicationContext);
    const [getLogin, {data}] =
        useLazyQuery(loginUser, {
            onError: (e) => {
                message.error(e.message)
            }
        });


    if (data) {
        if (data.login) {
            localStorage.setItem("username", data.login.firstName);
            localStorage.setItem("userId", data.login.id);
            appContext.setUserName(data.login.firstName);
            history.push("/app")
        }
    }

    const login = async (username: string, password: string) => {
        try {
            await getLogin({
                variables: {
                    email: username,
                    password: password
                },
            });
        } catch (e) {
            console.log(e);
            alert(e.message)
        }
    };

    return (
        <div className={"auth-page"}>
            <h2 className={"welcome-text"}>Welcome</h2>
            <Switch className={"switch"} checkedChildren="Registration" unCheckedChildren="Login" defaultChecked
                    onChange={e => {
                        setReg(e)
                    }}/>
            <div className={"auth-component-container"}>
                {isReg ? <Login login={login}/> : <Registration login={login}/>}
            </div>

        </div>
    );
};

export default AuthPage;