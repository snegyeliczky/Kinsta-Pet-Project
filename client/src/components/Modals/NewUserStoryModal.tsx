import React, {useContext, useState} from 'react';
import {Button, Input, Modal, message} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {UserModel} from "../../Types/UserModel";
import UserDropdown from "../userDropdown";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useMutation, useQuery} from "@apollo/client";
import {getUserById} from "../../queries/userQueries";
import {addNewUserStoryMutation} from "../../queries/userStoryQueries";
import {getUserStories} from "../../queries/projectQueries";


interface Props {
    projectId: number,
    participants: UserModel[]
}

const NewUserStoryModal: React.FC<Props> = ({projectId, participants}) => {

    const appContext = useContext(ApplicationContext);
    const [visible, setVisible] = useState(false);
    const [UserStory, setUserStory] = useState("");
    const [BusinessValue, setBusinessValue] = useState(0);
    const [OwnerId, setOwnerId] = useState<number | null>(appContext.getUserIdAsNumber());
    const [addNewUserStory] = useMutation(addNewUserStoryMutation);

    const {loading, data} = useQuery(getUserById, {variables: {id: appContext.getUserIdAsNumber()}});

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const saveUserStory = () => {
        addNewUserStory({
            variables:{
                userId:OwnerId,
                projectId:projectId,
                userStory:UserStory,
                businessValue:BusinessValue
            },
            refetchQueries:[{query:getUserStories, variables:{id:projectId}}]
        })
    };

    const handleSave = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (UserStory.length > 2) {
            saveUserStory();
            setVisible(!visible);
        } else message.error("User story must be minimum 3 character long!", 5)
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };


    return (
        <ModalContainer onClick={event => {
            event.stopPropagation()
        }} style={{}}>
            <Button shape={"round"} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                <PlusOutlined/> Add new User Story
            </Button>
            <Modal
                title="Create new UserStoryModel"
                visible={visible}
                onOk={e => {
                    handleSave(e)
                }}
                onCancel={e => handleCancel(e)}

            >
                <div className={"newProjectForm"}>
                    <Input.TextArea placeholder={"User Story"}
                                    onChange={event => {
                                        setUserStory(event.target.value)
                                    }}
                    />
                    <Input placeholder={"Business value"} prefix={<ProjectOutlined/>} type={"number"}
                           onChange={event => {
                               setBusinessValue(event.target.valueAsNumber)
                           }}
                    />
                    {
                        loading ?
                            <div></div>
                            :
                            <UserDropdown base={data.user.firstName} onChange={setOwnerId}
                                          userData={participants}/>
                    }
                </div>

            </Modal>
        </ModalContainer>
    )
};

export default NewUserStoryModal;