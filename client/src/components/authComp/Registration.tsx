import React, {useRef} from 'react';
import {Input, Button, message} from 'antd';
import {MailOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {useMutation} from "@apollo/client";
import {registerUser} from "../../queries/userQueries";

interface Props {
    login: (username: string, password: string) => void;
}


const Registration: React.FC<Props> = ({login}) => {

    const [addNewUser] = useMutation(registerUser);

    let firstName = useRef<Input>(null);
    let lastName = useRef<Input>(null);
    let email = useRef<Input>(null);
    let password = useRef<Input>(null);


    const registration = async (newFirstName: string, newLastName: string, newEmail: string, newPassword: string) => {
        try {
            let newUser = await addNewUser({variables:{
                    FirstName:newFirstName,
                    LastName:newLastName,
                    Email:newEmail,
                    Password:newPassword
                }
            });
            console.log(newUser);
            login(newEmail, newPassword)
        } catch (e) {
            message.error(" Invalid registration! This E-mail already belongs to a user!")
        }
    };

    const handleRegistration = (): void => {
        let newFirstName = firstName.current ? firstName.current.state.value : undefined;
        let newLastName = lastName.current ? lastName.current.state.value : undefined;
        let newEmail = email.current ? email.current.state.value : undefined;
        let newPassword = password.current ? password.current.state.value : undefined;

        newFirstName && newLastName && newEmail && newPassword ?
            registration(newFirstName, newLastName, newEmail, newPassword)
            : message.error("missing parameter!");
    };

    return (
        <div className={"auth-component"}>
            <h3>Registration</h3>
            <Input placeholder={"First name"} prefix={<UserOutlined/>} ref={firstName}/>
            <Input placeholder={"Last name"} prefix={<UserOutlined/>} ref={lastName}/>
            <Input placeholder={"E-mail"} prefix={<MailOutlined/>} ref={email}/>
            <Input.Password ref={password} placeholder={"Password"}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
            <Button className={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"}
                    onClick={handleRegistration}>Registration</Button>
        </div>
    );
};

export default Registration;