import React, {useState} from 'react';
import {Button, Input, Modal, message, Form} from 'antd';
import {PlusOutlined, ProjectOutlined} from '@ant-design/icons';
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import UserDropdown from "../userDropdown";

import {useMutation, useQuery} from "@apollo/client";
import {addNewUserStoryMutation} from "../../queries/userStoryQueries";
import {getProjectParticipants} from "../../queries/projectQueries";


interface Props {
    projectId: number,
}

const NewUserStoryModal: React.FC<Props> = ({projectId}) => {

    const [visible, setVisible] = useState(false);
    const [addNewUserStory] = useMutation(addNewUserStoryMutation);
    const {loading: participants_loading, data: participants_data,}
        = useQuery(getProjectParticipants, {
        variables: {
            id: projectId
        }
    });

    const showModal = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setVisible(!visible);
    };

    const saveUserStory = (UserStory:string,BusinessValue:string,OwnerId:number) => {
        addNewUserStory({
            variables: {
                userId: OwnerId,
                projectId: projectId,
                userStory: UserStory,
                businessValue: parseInt(BusinessValue)
            },
        })
    };

    const saveForm = (values: {UserStory: string, BusinessValue: string, User: number}) => {
        if (values.UserStory.length > 2) {
            saveUserStory( values.UserStory,values.BusinessValue,values.User);
            setVisible(!visible);
        } else message.error("User story must be minimum 3 character long!", 5)
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setVisible(false);
    };


    if (participants_loading) return (<div>Loading participants...</div>);
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
                footer={null}

            >
                <div className={"newProjectForm"}>
                    <Form
                        onFinish={saveForm}>
                        <Form.Item name={"UserStory"}
                                   rules={[{required: true, message: 'Please add user story!'}]}>
                            <Input.TextArea placeholder={"User Story"}/>
                        </Form.Item>
                        <Form.Item name={"BusinessValue"}
                        >
                            <Input placeholder={"Business value"} prefix={<ProjectOutlined/>} type={"number"}/>
                        </Form.Item>
                        <Form.Item
                            name={"User"}
                            rules={[{required: true, message: 'Please choose owner!'}]}>
                            <UserDropdown base={"---"} onChange={()=>{}}
                                          userData={participants_data.project.participants}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={"submit"} type={"primary"} style={{margin:"10px"}}>
                                Save user story
                            </Button>
                            <Button danger onClick={handleCancel}>
                                close
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </Modal>
        </ModalContainer>
    )
};

export default NewUserStoryModal;