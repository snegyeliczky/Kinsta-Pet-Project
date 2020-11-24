import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {SettingOutlined, DeleteOutlined} from '@ant-design/icons';
import {Input} from "antd";
import AlertModal from "./Modals/AlertModal";
import EstimationModal from "./Modals/EstimationModal";
import UserDropdown from "./userDropdown";
import ProjectContext from "../context/ProjectContext";
import {useMutation, useQuery} from "@apollo/client";
import {
    editUserStoryQuery,
    estimateUserStory,
    estimationsForUserStory,
    updateUserStoryUser
} from "../queries/userStoryQueries";
import {ApplicationContext} from "../context/ApplicationContext";

type Props = {
    userStory: UserStoryModel,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    setUserStory: Dispatch<SetStateAction<UserStoryModel>>,
    removeUserStory: Function,
}


const EditUserStory: React.FC<Props> = ({userStory, edit, setEdit, setUserStory, removeUserStory}) => {

    const projectContext = useContext(ProjectContext);
    const appContext = useContext(ApplicationContext);
    const editedUserStory = {...userStory};
    const[estimations, setEstimations] = useState(userStory.estimatedUsers);
    const [mutateUserStory] = useMutation(editUserStoryQuery);
    const [mutateUser] = useMutation(updateUserStoryUser);
    const [estimate] = useMutation(estimateUserStory);
    const {refetch} = useQuery(estimationsForUserStory,{variables:{id:userStory.id}});


    const EditUserStory = (story: string) => {
        editedUserStory.userStory = story;
    };

    const EditUserStoryValue = (value: number) => {
        editedUserStory.businessValue = value;
    };

    const EditUserStoryOwner = async (owner: string) => {
        let fetchResult = await mutateUser({
            variables:{
                userStoryId: userStory.id,
                userId: owner
            }
        });
        editedUserStory.owner = fetchResult.data.addOwnerToUserStory;
    };

    const EditUserStoryEstimation = async (point: number) => {
        await estimate({
            variables:{
                userId:appContext.getUserIdAsNumber(),
                userStoryId:userStory.id,
                estimation:point
            }
        });
        let estimations = await refetch();
        setEstimations(estimations.data.userStory.estimatedUsers);
    };

    const saveUserStoryToDb = async () =>{
        let editedUSFromDb =  await mutateUserStory({variables:{
                userStoryId:editedUserStory.id,
                businessValue:editedUserStory.businessValue,
                userStory:editedUserStory.userStory
            }});
        return editedUSFromDb.data.updateUserStory
    };

    async function handleKeyBoard(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let updatedUS = await saveUserStoryToDb();
            setUserStory(updatedUS);
            setEdit(false);
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            setEdit(false);
        }
    }

    async function handleStopEditing() {
        let updatedUS = await saveUserStoryToDb();
        setUserStory(updatedUS);
        setEdit(false)
    }


    return (
        <UserStoryStyleComponent onClick={event => event.stopPropagation()} onKeyDown={event => handleKeyBoard(event)}
                                 hover={true}>
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
                <UserDropdown userData={projectContext.participants} onChange={EditUserStoryOwner}
                              base={userStory.owner.firstName}/>
            </div>
            <div className={"userStory-estimation UserStory-part"}>
                <EstimationModal editUserStoryEstimation={EditUserStoryEstimation}
                                 estimatedUsers={estimations}/>
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