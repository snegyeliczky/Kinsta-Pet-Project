import React from 'react';
import { Menu, Dropdown,Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {UserModel} from "../interfaces/UserModel";

type props = {
    userData:UserModel[]
}

const UserDropdown:React.FC<props> = ({userData}) => {

    const onClick = (key:string) => {
        message.info(`Click on item ${key}`);
    };

    const menu = (
        <Menu >
            {userData.map( user =>{
                return <Menu.Item key={user.id} onClick={(e)=>onClick(user.id)}> {user.firstName}</Menu.Item>
                })
            }

        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Change Owner <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default UserDropdown;