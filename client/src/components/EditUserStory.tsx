import React, {Dispatch, SetStateAction, useContext} from 'react';
import { UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {SettingOutlined, DeleteOutlined} from '@ant-design/icons';
import {Input} from "antd";
import UserStoryService from "../services/UserStoryService";
import AlertModal from "./Modals/AlertModal";
import EstimationModal from "./Modals/EstimationModal";
import {ApplicationContext} from "../context/ApplicationContext";
import UserDropdown from "./userDropdown";
import ProjectContext from "../context/ProjectContext";

type Props = {
    userStory: UserStoryModel,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    setUserStory: Dispatch<SetStateAction<UserStoryModel>>,
    removeUserStory: Function,
}


const EditUserStory: React.FC<Props> = ({userStory, edit, setEdit, setUserStory, removeUserStory}) => {

    const appContext = useContext(ApplicationContext);
    const projectContext = useContext(ProjectContext);
    const editedUserStory = {...userStory};


    const EditUserStory = (story: string) => {
        editedUserStory.userStory = story;

    };

    const EditUserStoryValue = (value: number) => {
        editedUserStory.businessValue = value;

    };

    const EditUserStoryOwner = (owner: string) => {
        editedUserStory.ownerId = owner;

    };

    const EditUserStoryEstimation = (point: number) => {
        let userId = appContext.getUserId();
        userStory.estimatedUsers[userId]=point;
        setUserStory(userStory);
    };

    function handleKeyBoard(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUserStory(editedUserStory);
            UserStoryService.updateUserStory(userStory);
            setEdit(false);
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            setEdit(false);
        }
    }

    function handleStopEditing() {
        UserStoryService.updateUserStory(editedUserStory);
        setUserStory(editedUserStory);
        setEdit(false)
    }


    return (
        <UserStoryStyleComponent onClick={event => event.stopPropagation()} onKeyDown={event => handleKeyBoard(event)} hover={true}>
            <div className={"userStory-id UserStory-part"}>
                {userStory.id}
            </div>
            <div className={"userStory-userStory UserStory-part"}>
                <Input.TextArea defaultValue={userStory.userStory} onChange={e => {
                    EditUserStory(e.target.value)
                }}/>
            </div>
            <div className={"userStory-businessValue UserStory-part"}>
                <Input type={"number"} defaultValue={userStory.businessValue}
                       onChange={e => {
                           EditUserStoryValue(e.target.valueAsNumber)
                       }}/>
            </div>
            <div className={"userStory-ownerId UserStory-part"}>
               <UserDropdown userData={projectContext.participants} onChange={EditUserStoryOwner} base={projectContext.getUserName(userStory.ownerId)}/>
            </div>
            <div className={"userStory-estimation UserStory-part"}>
                <EstimationModal editUserStoryEstimation={EditUserStoryEstimation}
                                 estimatedUsers={userStory.estimatedUsers} />
            </div>
            <div className={"UserStory-part"}>

                <SettingOutlined spin={edit} onClick={handleStopEditing} className={"userStory-edit"}/>
                <AlertModal text={"Are you sure you want to remove this User Story ?"}
                            buttonText={<DeleteOutlined/>} OkFunction={() => removeUserStory(userStory.id)}/>
            </div>

        </UserStoryStyleComponent>
    );
};

export default EditUserStory;