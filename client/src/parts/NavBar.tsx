import React from 'react';
import {Menu} from 'antd';
import {} from '@ant-design/icons';
import {useHistory} from "react-router";

const NavBar = () => {

    const history = useHistory();

    const handleLogOut = (): void => {
        localStorage.clear();
        history.push("/auth")
    };

    const handleHome = (): void => {
        history.push("/app")
    };

    const handleNewCompany = (): void => {
        history.push("/app/new-company")
    };

    const handleProfile=() =>{
        history.push("/app/profile")
    };

    const menuStyle: Object = {
        textAlign: "center",
        position: "fixed",
        zIndex: 100,
        width: "100%",
        height: "10vh",
        backgroundImage: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 47%, rgba(0,212,255,1) 100%)",
        color: "#fff"
    };


    return (
        <Menu mode={"horizontal"} style={menuStyle}>
            <Menu.Item onClick={handleHome}>Home</Menu.Item>
            <Menu.Item onClick={handleNewCompany}>Creat new company</Menu.Item>
            <Menu.Item onClick={handleProfile}>Profile</Menu.Item>
            <Menu.Item onClick={handleLogOut}>Log out</Menu.Item>
        </Menu>
    );
};

export default NavBar;