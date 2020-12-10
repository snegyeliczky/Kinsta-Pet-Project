import React, {useContext, useState} from 'react';
import {Modal, Button, Form, AutoComplete, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {CenterDiv, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {getProjectParticipants} from "../../queries/projectQueries";
import {UserModel} from "../../Types/UserModel";
import {getUsersByEmail, inviteUserToCollaborate} from "../../queries/userQueries";
import {newParticipantJoined} from "../../queries/subscriptions";


interface Props {
    projectId: number
}

const InviteModal: React.FC<Props> = ({projectId}) => {

        const [visible, setVisible] = useState(false);
        const appContext = useContext(ApplicationContext);
        const [getUsers, {data}] = useLazyQuery(getUsersByEmail);
        const {Option} = AutoComplete;
        const [inviteUser] = useMutation(inviteUserToCollaborate);
        const {error: participants_error, loading: participants_loading, data: participants_data, subscribeToMore}
        = useQuery(getProjectParticipants, {
            variables: {
                id: projectId
            },
            onCompleted: () => {
                subscribeToNewUser()
            }
        });

        const subscribeToNewUser = () => subscribeToMore({
                document: newParticipantJoined,
                variables: {
                    projectId: projectId
                },
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    console.log("new participant joined");
                    let prevList = Array.from(prev.project.participants);
                    let prevSet = new Set(prevList);
                    prevSet.add(subscriptionData.data.joinParticipation);
                    return {
                        project: {
                            participants: prevSet
                        }
                    }
                }
            }
        );


        const showModal = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            setVisible(!visible);
        };

        const sendInvite = async (e: { email: string }) => {
            try {
                let userData = data.getUserByEmail.reduce((re: number, u: UserModel) => {
                    if (u.email === e.email) re = parseInt(u.id);
                    return re;
                });
                let receiverId = userData.id;
                let senderId = appContext.getUserIdAsNumber();
                let fetchResult = await inviteUser({
                    variables: {
                        senderId: senderId,
                        receiverId: receiverId,
                        projectId: projectId
                    }
                });
                subscribeToNewUser();
                message.info(fetchResult.data.sendParticipateInviteToUser)
            } catch (e) {
                message.warning(e.message)
            }


        };


        const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
            setVisible(false);
        };

        const loadParticipants = () => {
            if (participants_error) return <h2>...error {participants_error?.message}</h2>;
            return (
                participants_data.project.participants.map((user: UserModel) => {
                    return (
                        <CenterDiv key={user.id}>
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


        if (participants_loading) return <h2>Loading participants</h2>;
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
                                onChange={(input) => {
                                    fetchUsersByEmail(input)
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