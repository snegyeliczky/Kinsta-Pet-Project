import React from 'react';
import {Input} from 'antd';
import { MailOutlined,UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Registration = () => {
    return (
        <div>
            <h3>Registration</h3>
            <Input placeholder={"Username"} prefix={<UserOutlined />}/>
            <Input placeholder={"E-mail"} prefix={<MailOutlined />}/>
            <Input.Password placeholder={"PassWord"} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            
        </div>
    );
};

export default Registration;