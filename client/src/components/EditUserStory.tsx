import React from 'react';
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {UserStoryModel} from "../interfaces/UserStoryModel";

interface Props {
    userStory:UserStoryModel
}

const EditUserStory:React.FC<Props>= ({userStory}) => {

    return (
        <UserStoryStyleComponent key={userStory.id} className={"userStory-component"}>
            <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
            <div className={"userStory-userStory UserStory-part"} ><input defaultValue={userStory.userStory}/></div>
            <div className={"userStory-businessValue UserStory-part"}><input defaultValue={userStory.businessValue}/></div>
            <div className={"userStory-ownerId UserStory-part"}><input defaultValue={userStory.ownerId?userStory.ownerId:''}/></div>
            <div className={"userStory-estimation UserStory-part"}><input defaultValue={userStory.estimation+"h"}/></div>
        </UserStoryStyleComponent>
    );
};

export default EditUserStory;