import React, {useContext, useState} from 'react';
import {Modal, Button } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {ModalContainer} from "../../assets/styledComponents/styledComponents";
import {ApplicationContext} from "../../context/ApplicationContext";


interface Props {
    projectId: number
}

const InviteModal: React.FC<Props> = ({projectId}) => {

        const [visible, setVisible] = useState(false);
        const history = useHistory();
        const appContext = useContext(ApplicationContext);
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
                }}> invite </Button>
                <Modal
                    title="Invite Participant"
                    visible={visible}
                    onCancel={e => {
                        handleCancel(e)
                    }}
                    footer={footer}

                >
                    <div className={"InviteForm"}>

                    </div>

                </Modal>
            </ModalContainer>
        )
    }
;

export default InviteModal;