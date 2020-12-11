import React from 'react';
import {Input, Button, message, Form} from 'antd';
import {MailOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {useMutation} from "@apollo/client";
import {registerUser} from "../../queries/userQueries";

interface Props {
    login: (username: string, password: string) => void;
}


const Registration: React.FC<Props> = ({login}) => {

    const [addNewUser] = useMutation(registerUser);

    const registration = async (newFirstName: string, newLastName: string, newEmail: string, newPassword: string) => {
        try {
            await addNewUser({
                variables: {
                    FirstName: newFirstName,
                    LastName: newLastName,
                    Email: newEmail,
                    Password: newPassword
                }
            });
            message.success("successfully registered!");
            login(newEmail, newPassword)
        } catch (e) {
            message.error(" Invalid registration! This E-mail already belongs to a user!")
        }
    };

    const formRegistration = async (values: { firstName: string, lastName: string, email: string, password: string }) => {
        await registration(values.firstName, values.lastName, values.email, values.password)
    };

    return (
        <div className={"auth-component"}>
            <h3>Registration</h3>
            <Form
                onFinish={formRegistration}>
                <Form.Item
                    name={"firstName"}
                    rules={[{required: true, message: 'Please input your First Name!'}]}
                >
                    <Input placeholder={"First name"} prefix={<UserOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name={"lastName"}
                    rules={[{required: true, message: 'Please input your Last Name!'}]}
                >
                    <Input placeholder={"Last name"} prefix={<UserOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name={"email"}
                    rules={[{required: true, message: 'Please input your E-mail!'}]}
                >
                    <Input placeholder={"E-mail"} prefix={<MailOutlined/>}/>
                </Form.Item>
                <Form.Item
                    name={"password"}
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input.Password placeholder={"Password"}
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType={"submit"} className={"submit"} shape={"round"} icon={<CheckOutlined/>}
                            type={"primary"}
                    >Registration</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;