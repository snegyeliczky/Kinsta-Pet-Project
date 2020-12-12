import React, {useContext, useState} from 'react';
import {Button, Input, Modal, message, Form} from "antd";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import UserDropdown from "../userDropdown";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useMutation, useQuery} from "@apollo/client";
import {addNewTask} from "../../queries/taskQueries";
import {getUserById} from "../../queries/userQueries";
import {useParams} from "react-router";
import {getProjectParticipants, getUserStories} from "../../queries/projectQueries";

type Props = {
    UserStoryId: number
}

const NewTaskModal: React.FC<Props> = ({UserStoryId}) => {

    const appContext = useContext(ApplicationContext);
    const [visible, setVisible] = useState(false);
    const [addNewTaskMutation] = useMutation(addNewTask);
    const {id} = useParams();

    const {loading: participants_loading, data: participants_data,}
        = useQuery(getProjectParticipants, {
        variables: {
            id: parseInt(id)
        }
    });
    const {data, loading} = useQuery(getUserById, {variables: {id: appContext.getUserIdAsNumber()}});

    function showModal(event: React.MouseEvent<HTMLElement>) {
        setVisible(true)
    }

    function saveNewTask(taskTitle: string, taskDescription: string, ownerId: number, time: string) {
        addNewTaskMutation({
            variables: {
                userStoryId: UserStoryId,
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                ownerId: ownerId,
                time: time
            },
            refetchQueries: [
                //refactor to subscription ?!
                {query: getUserStories, variables: {id}}
            ]
        })

    }


    function handleCancel(e: React.MouseEvent<HTMLElement>) {
        setVisible(false);
    }


    const formFinish = (values: { taskTitle: string, taskDescription: string, ownerId: number, time: string }) => {
        if (values.taskTitle.length > 2) {
            saveNewTask(values.taskTitle, values.taskDescription, values.ownerId, values.time);
            setVisible(false);
        } else message.error("Task title must be minimum 3 character long!", 5)
    };


    if (loading) return (<div>Loading...</div>);
    if (participants_loading) return (<div>loading participants..</div>);
    return (
        <div>
            <ModalContainer onClick={event => {
                event.stopPropagation()
            }} style={{}}>
                <Button shape={"round"} icon={<PlusOutlined/>} type={"primary"} onClick={event => {
                    showModal(event)
                }}>
                    Add new Task
                </Button>
                <Modal
                    title="Add new Task"
                    visible={visible}
                    onCancel={e => {
                        handleCancel(e)
                    }}
                    footer={null}
                >

                    <Form
                        onFinish={formFinish}
                    >
                        <Form.Item
                            name={"taskTitle"}
                            rules={[
                                {
                                    required: true,
                                    message:"Add task title!"
                                },
                                () => ({
                                    validator(rule, value: string) {
                                        if (value)
                                        return value.length > 2 ?
                                            Promise.resolve()
                                            : Promise.reject(" Title must be minimum 3 character long!");
                                        return Promise.reject()
                                    }
                                })
                            ]}
                        >
                            <Input placeholder={"Task title"} prefix={<ProjectOutlined/>} type={"string"}/>
                        </Form.Item>
                        <Form.Item
                            name={"taskDescription"}
                        >
                            <Input.TextArea placeholder={"Task Description"}/>
                        </Form.Item>
                        <Form.Item
                            name={"ownerId"}
                            initialValue={appContext.getUserIdAsNumber()}
                        >
                            <UserDropdown userData={participants_data.project.participants} onChange={() => {
                            }}
                                          base={data.user.firstName}/>
                        </Form.Item>
                        <Form.Item
                            name={"time"}
                            initialValue={"00:00"}
                        >
                            <Input type={"time"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={"submit"} type={"primary"} style={{margin: "10px"}}>
                                Save Task
                            </Button>
                            <Button danger onClick={handleCancel}>
                                close
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </ModalContainer>
        </div>
    );
};

export default NewTaskModal;

/*
 rules={[
                                {
                                    required: true,
                                    message: 'Add task title!',
                                },
                                () => ({
                                    validator(rule, value: string) {
                                        return value.length > 2 ?
                                            Promise.resolve()
                                            : Promise.reject(" Title must be minimum 3 character long!")
                                    }
                                })
                            ]}
 */