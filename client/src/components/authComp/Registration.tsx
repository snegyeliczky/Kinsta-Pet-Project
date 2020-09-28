import React, {useRef} from 'react';
import {Input,Button} from 'antd';
import { MailOutlined,UserOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

interface Props {
    login:(username:string,password:string|number)=>void;
}


const Registration:React.FC<Props> = ({login}) => {

    let username = useRef<Input>(null);
    let email = useRef<Input>(null);
    let password = useRef<Input>(null);


    const registration =(newUsername:string,newEmail:string,newPassword:string|number):boolean=>{
        try {
            //backEnd registration comes here
            console.log(newUsername,newPassword,newEmail);
            return true;
        }catch (e) {
            return false;
        }
    };

    const handleRegistration= ():void => {
        let newUsername = username.current?username.current.state.value:undefined;
        let newEmail = email.current?email.current.state.value:undefined;
        let newPassword = password.current?password.current.state.value:undefined;
        newUsername && newEmail && newPassword ?
            registration(newUsername,newEmail,newPassword) ?
            login(newUsername,newPassword) :
                alert("registration failed")
            : alert("missing parameter");

    };

    return (
        <div className={"auth-component"}>
            <h3>Registration</h3>
            <Input  placeholder={"Username"} prefix={<UserOutlined />} ref={username}/>
            <Input placeholder={"E-mail"} prefix={<MailOutlined />} ref={email}/>
            <Input.Password ref={password} placeholder={"PassWord"} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            <Button className={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"} onClick={handleRegistration}>Registration</Button>
        </div>
    );
};

export default Registration;