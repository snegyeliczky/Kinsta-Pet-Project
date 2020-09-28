import React, {useRef} from 'react';
import {Input,Button} from 'antd';
import { MailOutlined,UserOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Registration = () => {

    let username = useRef<Input>(null);
    let email = useRef<Input>(null);
    let password = useRef<Input>(null);

    const handleRegistration= ():void => {
        let newUsername = username.current?username.current.state.value:undefined;
        let newEmail = email.current?email.current.state.value:undefined;
        let newPassword = password.current?password.current.state.value:undefined;
        console.log(newUsername,newEmail,newPassword)
    };

    return (
        <div>
            <h3>Registration</h3>
            <Input placeholder={"Username"} prefix={<UserOutlined />} ref={username}/>
            <Input placeholder={"E-mail"} prefix={<MailOutlined />} ref={email}/>
            <Input.Password ref={password} placeholder={"PassWord"} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            <Button shape={"round"} icon={<CheckOutlined/>} type={"primary"} onClick={handleRegistration}>Submit</Button>
        </div>
    );
};

export default Registration;