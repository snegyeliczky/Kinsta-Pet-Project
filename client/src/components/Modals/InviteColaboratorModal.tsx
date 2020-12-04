import React, {useContext, useState} from 'react';
import {Modal, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {CenterDiv, ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";
import {useQuery} from "@apollo/client";
import {getProjectParticipants} from "../../queries/projectQueries";
import {UserModel} from "../../interfaces/UserModel";


interface Props {
    projectId: number
}

const InviteModal: React.FC<Props> = ({projectId}) => {

        const [visible, setVisible] = useState(false);
        const history = useHistory();
        const appContext = useContext(ApplicationContext);
        const {error,loading,data} =useQuery(getProjectParticipants, {variables:{
            id:projectId
            }});
        //const [] = useMutation();

        const showModal = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            setVisible(!visible);
        };

        const sendInvite = async (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            setVisible(!visible);
        };


        const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            setVisible(false);
        };

        const loadParticipants = ()=>{
            if (loading) return <h2>... Loading</h2>;
            if(error) return <h2>...error {error?.message}</h2>;
            return (
                data.project.participants.map((user:UserModel)=>{
                    return <div>{user.firstName}</div>
                })
            )
        };

        const footer = (<div>
            <Button type={"primary"} danger onClick={e => handleCancel(e)}>cancel</Button>
            <Button type={"primary"} onClick={e => {
                return sendInvite(e)
            }}>Invite</Button>
        </div>);

        return (
            <ModalContainer onClick={event => {
                event.stopPropagation()
            }} style={{}}>
                <Button shape={"round"} icon={<UserOutlined/>} type={"primary"} onClick={event => {
                    showModal(event)
                }}> Participants </Button>
                <Modal
                    title="Invite Participant"
                    visible={visible}
                    onCancel={e => {
                        handleCancel(e)
                    }}
                    footer={footer}

                >
                    <CenterDiv>
                        {loadParticipants()}
                    </CenterDiv>

                </Modal>
            </ModalContainer>
        )
    }
;

export default InviteModal;