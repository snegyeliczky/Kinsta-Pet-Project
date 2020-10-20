import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {Button, Input, Modal} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {UserStoryModel} from "../../interfaces/UserStoryModel";
import TaskService from "../../services/UserStoryService";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {UserModel} from "../../interfaces/UserModel";
import UserDropdown from "../UserDropdown";
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
        }else alert("Project name must be 3 character long!")

    };

    const handleCancel = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };

    /*
     <Button shape={"round"} icon={<PlusOutlined />} type={"primary"} onClick={event => {
                showModal(event)
            }}>
                Add new task
            </Button>
     */


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