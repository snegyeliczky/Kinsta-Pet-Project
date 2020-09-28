import React, {useState} from 'react';
import {Button, Input} from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



interface Props {
    login:(username:string,password:string|number)=>void;
}

const Login:React.FC<Props> = ({login}) => {



    const [username,setUsername] = useState<string>();
    const [password,setPassword] = useState<string|number>();



    const handleLogin= (username: string, password: string | number)=> {
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
            <Input placeholder={"Username"} prefix={<UserOutlined />}  type={"string"}
                   onChange={event => {setUsername(event.target.value)}}
            />
            <Input.Password placeholder={"PassWord"}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={event => {setPassword(event.target.value)}}
            />
            <Button className={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"} onClick={event => {
                username&&password?handleLogin(username, password):alert("missing parameter")}
            }>Login</Button>
        </div>
    );
};

export default Login;