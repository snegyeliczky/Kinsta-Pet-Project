import React, {useState} from 'react';
import {Button, Input} from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export const handleLogin=(username:string,password:string|number)=> {

};

const Login = () => {

    const [username,setUsername] = useState<string>();
    const [password,setPassword] = useState<string|number>()


    return (
        <div className={"authComp"}>
            <h3>Login</h3>
            <Input placeholder={"Username"} prefix={<UserOutlined />}/>
            <Input.Password placeholder={"PassWord"} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            <Button shape={"round"} icon={<CheckOutlined/>} type={"primary"} onClick={event => {
                username&&password?handleLogin(username,password):alert("missing parameter")}
            }>Login</Button>
        </div>
    );
};

export default Login;