import React, {useState} from 'react';
import Login from "../components/authComp/Login";
import Registration from "../components/authComp/Registration";
import { Switch } from 'antd';
import {useHistory} from "react-router-dom";

const AuthPage = () => {

    const [isReg, setReg] = useState<boolean>(true);
    const history= useHistory();

    const login=(username:string,password:string|number)=> {
        try {
            //here comes the backend login
            console.log(username,password);
            localStorage.setItem("username",username);
            history.push("/")
        }catch (e) {
            console.log(e);
            alert(e.message)
        }
    };

    return (
        <div>
            Hello Auth
            <Switch checkedChildren="Login" unCheckedChildren="Registration" defaultChecked onChange={e=>{
                setReg(e)
            }}/>
            {isReg?<Login login={login}/>:<Registration login={login}/>}

        </div>
    );
};

export default AuthPage;