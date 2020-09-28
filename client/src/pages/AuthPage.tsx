import React from 'react';
import Login from "../components/authComp/Login";
import Registration from "../components/authComp/Registration";
import { Switch } from 'antd';

const AuthPage = () => {

    return (
        <div>

            Hello Auth
            <Switch checkedChildren="Login" unCheckedChildren="Registration" defaultChecked onChange={e=>{
                console.log(e)
            }}/>

            <Login/>
            <Registration/>
        </div>
    );
};

export default AuthPage;