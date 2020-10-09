import React from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";


interface Props {
    userStory:UserStoryModel
}

const UserStory:React.FC<Props> = ({userStory}) => {
    return (
        <UserStoryStyleComponent key={userStory.id} className={"userStory-component"}>
            <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
            <div className={"userStory-userStory UserStory-part"} >{userStory.userStory}</div>
            <div className={"userStory-businessValue UserStory-part"}>{userStory.businessValue}</div>
            <div className={"userStory-ownerId UserStory-part"}>{userStory.ownerId}</div>
            <div className={"userStory-estimation UserStory-part"}>{userStory.estimation}h</div>
        </UserStoryStyleComponent>
    );
};

export default UserStory;