import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {Button, Input, Modal,message} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {UserStoryModel} from "../../interfaces/UserStoryModel";
import TaskService from "../../localServices/UserStoryService";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {UserModel} from "../../interfaces/UserModel";
import UserDropdown from "../userDropdown";
import {ApplicationContext} from "../../context/ApplicationContext";


interface Props {
    projectId:number,
    setTasks:Dispatch<SetStateAction<UserStoryModel[]>>,
    participants:UserModel[]
}

const NewUserStoryModal:React.FC<Props>= ({projectId,setTasks,participants}) => {

    const appContext = useContext(ApplicationContext);
    const [visible, setVisible] = useState(false);
    const[UserStory, setUserStory ] = useState("");
    const[BusinessValue, setBusinessValue ] = useState(0);
    const[OwnerId, setOwnerId ] = useState<string|null>(appContext.getUserId());
    const[Estimation, setEstimation] = useState(0);


    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const createTask = ():UserStoryModel =>{
        return {
            id: 0,
            projectId: projectId,
            userStory: UserStory,
            businessValue: BusinessValue,
            ownerId: OwnerId,
            estimation: Estimation,
            status: false,
            estimatedUsers:{}
        };
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (UserStory.length>2){
            let newTask = createTask();
            let tasks = TaskService.saveNewUserStory(newTask);
            setTasks(tasks);
            setVisible(!visible);
        }else message.error("User story must be minimum 3 character long!",5)
    };

    const handleCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };


    return (
        <ModalContainer onClick={event => {event.stopPropagation()}} style={{}}>
            <Button shape={"round"} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                <PlusOutlined /> Add new User Story
            </Button>
            <Modal
                title="Create new UserStoryModel"
                visible={visible}
                onOk={e => {handleSave(e)}}
                onCancel={e => handleCancel(e)}

            >
                <div className={"newProjectForm"}>
                    <Input.TextArea placeholder={"User Story"}
                           onChange={event => {setUserStory(event.target.value)}}
                    />
                    <Input placeholder={"Business value"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setBusinessValue(event.target.valueAsNumber)}}
                    />
                    <UserDropdown base={appContext.getLoggedInUserName()} onChange={setOwnerId} userData={participants}/>
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setEstimation(event.target.valueAsNumber)}}
                    />
                </div>

            </Modal>
        </ModalContainer>
    )
};

export default NewUserStoryModal;