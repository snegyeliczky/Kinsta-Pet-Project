import React from 'react';
import { Menu } from 'antd';
import { } from '@ant-design/icons';
import {useHistory} from "react-router";

const NavBar = () => {

    const history = useHistory();

   const handleLogOut = ():void=>{
       localStorage.clear();
       history.push("/auth")
   };

   const handleHome = ():void =>{
       history.push("/")
   };

   const handleNewCompany = ():void =>{
       history.push("/new-company")
   };

   const menuStyle:Object = {
       textAlign:"center",
       position:"fixed",
       width:"100%",
       height:"10vh"
   };



    return (
        <Menu mode={"horizontal"} style={menuStyle}>
            <Menu.Item onClick={handleHome}>Home</Menu.Item>
            <Menu.Item onClick={handleNewCompany}>Creat new company</Menu.Item>
            <Menu.Item onClick={handleLogOut}>Log out</Menu.Item>
        </Menu>
    );
};

export default NavBar;