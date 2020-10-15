import React, {useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {SettingOutlined} from '@ant-design/icons';
import EditUserStory from "./EditUserStory";


interface Props {
    UserStory: UserStoryModel,
    removeUserStory:Function
}

const UserStory: React.FC<Props> = ({UserStory, removeUserStory}) => {

    const [edit, setEdit] = useState(false);
    const [userStory,setUserStory] =useState(UserStory);


    function handleChangeToEdit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setEdit(!edit);

    }

    function getUserID() {
        return parseInt(localStorage.getItem("userId")!)
    }

    function checkEstimation():boolean {
        if(userStory.estimatedUsers[getUserID()]!==undefined){
            return true
        }
        return false
    }

    function getEstimatedAverage() {
        let estimatedUsers = userStory.estimatedUsers;
        let reduce = Object.values(estimatedUsers).reduce((re, e)=> {
            re.sum+=e;
            re.length+=1;
            return re
        },{sum:0,length:0} );
        return (reduce.sum/reduce.length).toFixed(1)
    }


    return (
        <>
        {
            edit? <EditUserStory userStory={userStory} edit={edit} setEdit={setEdit}
                                 setUserStory={setUserStory} removeUserStory={removeUserStory}/>
                : <UserStoryStyleComponent key={userStory.id} className={"userStory-component"}>
                    <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
                    <div className={"userStory-userStory UserStory-part"}>{userStory.userStory}</div>
                    <div className={"userStory-businessValue UserStory-part"}>{userStory.businessValue}</div>
                    <div className={"userStory-ownerId UserStory-part"}>{userStory.ownerId}</div>
                    <div className={"userStory-estimation UserStory-part"}>
                        {checkEstimation()?getEstimatedAverage()+"-SP":"not estimated yet"}</div>
                    <div className={"UserStory-part"} onClick={e => handleChangeToEdit(e)}><SettingOutlined
                        spin={edit}/></div>
                </UserStoryStyleComponent>
        }
        </>
    );
};

export default UserStory;