import React, {useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import { SettingOutlined } from '@ant-design/icons';



interface Props {
    userStory:UserStoryModel
}

const UserStory:React.FC<Props> = ({userStory}) => {

    const[edit,setEdit] = useState(false)

    function handleChangeToEdit(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setEdit(!edit);

    }

    return (
        <UserStoryStyleComponent key={userStory.id} className={"userStory-component"}>
            <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
            {edit
                ?<div className={"userStory-userStory UserStory-part"} ><input defaultValue={userStory.userStory}/></div>
                :<div className={"userStory-userStory UserStory-part"} >{userStory.userStory}</div>
            }
            <div className={"userStory-businessValue UserStory-part"}>{userStory.businessValue}</div>
            <div className={"userStory-ownerId UserStory-part"}>{userStory.ownerId}</div>
            <div className={"userStory-estimation UserStory-part"}>{userStory.estimation}h</div>
            <div className={"UserStory-part"} onClick={e => handleChangeToEdit(e)}><SettingOutlined spin={edit} /></div>
        </UserStoryStyleComponent>
    );
};

export default UserStory;