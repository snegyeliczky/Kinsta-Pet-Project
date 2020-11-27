import React, {useState} from 'react';
import { Menu, Dropdown,Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {UserModel} from "../interfaces/UserModel";


type props = {
    userData:UserModel[],
    onChange:Function,
    base:string|undefined
}


const UserDropdown:React.FC<props> = ({userData,onChange,base}) => {

    const [OwnerUser,setUser]= useState(base);


    const onClick = (key:string|null, name:string) => {
        setUser(name);
        message.info(`Owner changed to ${name}`);
        onChange(key)
    };
    const menu = (
        <Menu >
            <Menu.Item key={"0"} onClick={(e)=>onClick(null,"no owner")}>---</Menu.Item>
            {userData.map( user =>{
                return <Menu.Item key={user.id} onClick={(e)=>onClick(user.id,user.firstName)}> {user.firstName}</Menu.Item>
                })
            }

        </Menu>
    );


    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {OwnerUser} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default UserDropdown;