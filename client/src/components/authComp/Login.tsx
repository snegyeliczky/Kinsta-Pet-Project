import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone,CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



interface Props {
    login:(username:string,password:string)=>void;
}

const Login:React.FC<Props> = ({login, }) => {


    const formFinish = (values:{username:string, password: string}) =>{
        try {
            login(values.username,values.password);
        }catch (e) {
            console.log(e);
            message.error("problem with login")
        }
    };

    return (
        <div className={"auth-component"}>
            <h3>Login</h3>
            <Form
                onFinish={formFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder={"E-mail"} prefix={<UserOutlined />}  type={"string"}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder={"PassWord"}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>

                </Form.Item>
                <Form.Item>

                </Form.Item>
                <Form.Item>
                    <Button htmlType={"submit"} className={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"} >Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;