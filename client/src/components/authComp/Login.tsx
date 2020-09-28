import React from 'react';
import {Input} from 'antd';
import { MailOutlined,UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Login = () => {
    return (
        <div className={"authComp"}>
            <h3>Login</h3>
            <Input placeholder={"Username"} prefix={<UserOutlined />}/>
            <Input.Password placeholder={"PassWord"} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </div>
    );
};

export default Login;