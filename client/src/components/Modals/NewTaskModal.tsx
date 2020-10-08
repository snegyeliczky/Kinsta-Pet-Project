import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Input, Modal} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {Task} from "../../interfaces/Task";
import TaskService from "../../services/TaskService";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";


interface Props {
    projectId:number,
    setTasks:Dispatch<SetStateAction<Task[]>>
}

const NewTaskModal:React.FC<Props>= ({projectId,setTasks}) => {

    const [visible, setVisible] = useState(false);
    const[UserStory, setUserStory ] = useState("");
    const[BusinessValue, setBusinessValue ] = useState(0);
    const[OwnerId, setOwnerId ] = useState<number|null>(null);
    const[Estimation, setEstimation] = useState(0);


    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const createTask = ():Task =>{
        return {
            id: 0,
            projectId: projectId,
            userStory: UserStory,
            businessValue: BusinessValue,
            ownerId: OwnerId,
            estimation: Estimation,
            status: false
        };
    };

    const handleSave = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (UserStory.length>2){
            let newTask = createTask();
            let tasks = TaskService.saveNewTask(newTask);
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
                <PlusOutlined /> Add new task
            </Button>
            <Modal
                title="Create new Task"
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
                    <Input placeholder={"Owner"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setOwnerId(event.target.valueAsNumber)}}
                    />
                    <Input placeholder={"Estimation"} prefix={<ProjectOutlined />}  type={"number"}
                           onChange={event => {setEstimation(event.target.valueAsNumber)}}
                    />
                </div>

            </Modal>
        </ModalContainer>
    )
};

export default NewTaskModal;