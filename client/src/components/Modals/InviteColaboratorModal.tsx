import React, {useContext, useState} from 'react';
import {Modal, Button, Form, AutoComplete} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {CenterDiv, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useLazyQuery, useQuery} from "@apollo/client";
import {getProjectParticipants} from "../../queries/projectQueries";
import {UserModel} from "../../interfaces/UserModel";
import {getUsersByEmail} from "../../queries/userQueries";


interface Props {
    projectId: number
}

const InviteModal: React.FC<Props> = ({projectId}) => {


        const [visible, setVisible] = useState(false);
        const appContext = useContext(ApplicationContext);
        const {error: participants_error, loading: participants_loading, data: participants_data} = useQuery(getProjectParticipants, {
            variables: {
                id: projectId
            }
        });
        const [getUsers, {data}] = useLazyQuery(getUsersByEmail);
        const {Option} = AutoComplete;


        const showModal = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            setVisible(!visible);
        };

        const sendInvite = (e:{email:string}) => {
            let email = e.email;
            //invite business logic
            console.log(email)
        };


        const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
            setVisible(false);
        };

        const loadParticipants = () => {
            if (participants_loading) return <h2>... Loading</h2>;
            if (participants_error) return <h2>...error {participants_error?.message}</h2>;
            return (
                participants_data.project.participants.map((user: UserModel) => {
                    return (
                        <CenterDiv>
                            <UserOutlined/>
                            {` ${user.firstName}`}
                        </CenterDiv>
                    )
                })
            )
        };

        const fetchUsersByEmail = (email: String) => {
            if (email.length > 2)
                getUsers({
                    variables: {
                        email: email
                    }
                });
        };

        const loadOptions = () => {
            if (data)
                return data.getUserByEmail.map((user: UserModel) => {
                    return (
                        <Option key={user.email} value={user.email} title={user.firstName}
                                style={{borderBottom: "1px solid"}}>
                            <p>{user.firstName}</p>
                            <p>{user.email}</p>
                        </Option>
                    )
                });
        };

        const footer = (<div>
            <Button type={"primary"} onClick={e => {
                setVisible(false)
            }}>Close</Button>
        </div>);


        return (
            <ModalContainer onClick={event => {
                event.stopPropagation()
            }} style={{}}>
                <Button shape={"round"} icon={<UserOutlined/>} type={"primary"} onClick={event => {
                    showModal(event)
                }}> Participants </Button>
                <Modal
                    title="Participants"
                    visible={visible}
                    onCancel={e => {
                        handleCancel(e)
                    }}
                    footer={footer}

                >
                    <div style={{paddingBottom: "20px"}}>
                        {loadParticipants()}
                    </div>
                    <h3 style={{paddingBottom: "20px"}}>Invite Participants</h3>
                    <Form name="dynamic_form_nest_item" onFinish={(e) => {
                        sendInvite(e);
                    }} autoComplete="off">
                        <Form.Item name="email" label="E-mail:" rules={[{required: true, message: 'Missing area'}]}>
                            <AutoComplete
                                style={{width: 300}}
                                placeholder="Typ user email"
                                onChange={(inputValue) => {
                                    fetchUsersByEmail(inputValue)
                                }}
                            >
                                {loadOptions()}
                            </AutoComplete>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Invite
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </ModalContainer>
        )
    }
;

export default InviteModal;