import React from 'react';
import AlertModal from "./Modals/AlertModal";
import {InviteComponent} from "../assets/styledComponents/styledComponents";
import {Invite} from "../Types/Invite";
import {useMutation} from "@apollo/client";
import {acceptParticipationInvite} from "../queries/userQueries";
import {message} from "antd";

type props = {
    inv:Invite
}


const InvitationComponent:React.FC<props> = ({inv}) => {

    const [acceptParticipationMutation] = useMutation(acceptParticipationInvite);

    const acceptParticipation = async () =>{
        let result = await acceptParticipationMutation({
            variables:{
                invitationId:inv.id
            }
        });
        message.info(result.data.acceptParticipationInvite);
    };

    const ButtonContainerStyle = {
        gridTemplateColumns: "50% 50%",
        gridGap: "10px",
        display: "grid"
    };

    return (
        <InviteComponent>
            <div>{inv.id}</div>
            <div>{inv.project.name}</div>
            <div>{inv.project.company.name}</div>
            <div style={ButtonContainerStyle}>
                <AlertModal text={"Yehh c-mon let's start working!!"}
                            buttonText={"Confirm"} success={true} OkFunction={acceptParticipation}/>
                <AlertModal text={"Are you sure to deny invitation?"} buttonText={"Deny"} />
            </div>
        </InviteComponent>
    );
};

export default InvitationComponent;