import React, {useState} from 'react';
import {Button, Input} from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



interface Props {
    login:(username:string,password:string)=>void;
}

const Login:React.FC<Props> = ({login}) => {



    const [email,setEmail] = useState<string>();
    const [password,setPassword] = useState<string>();



    const handleLogin= async (username: string, password: string )=> {
        try {
            login(username,password);
        }catch (e) {
            console.log(e);
            alert("problem with login")
        }
    };

    return (
        <div className={"auth-component"}>
            <h3>Login</h3>
            <Input placeholder={"E-mail"} prefix={<UserOutlined />}  type={"string"}
                   onChange={event => {setEmail(event.target.value)}}
            />
            <Input.Password placeholder={"PassWord"}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={event => {setPassword(event.target.value)}}
            />
            <Button className={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"} onClick={event => {
                email&&password?handleLogin(email, password):alert("missing parameter")}
            }>Login</Button>
        </div>
    );
};

export default Login;