import React, {useContext} from 'react';
import {CenterDiv, InviteComponent} from "../assets/styledComponents/styledComponents";
import {useQuery} from "@apollo/client";
import {getUserInvites} from "../queries/userQueries";
import {ApplicationContext} from "../context/ApplicationContext";
import {Invite} from "../Types/Invite";
import {newParticipationInviteSubscription} from "../queries/subscriptions";
import {Button} from "antd";
import AlertModal from "../components/Modals/AlertModal";

const ProfilePage = () => {

    const appContext = useContext(ApplicationContext);
    const {error, loading, data, subscribeToMore} = useQuery(getUserInvites, {
        variables: {
            id: appContext.getUserIdAsNumber()
        }
    });

    subscribeToMore(
        {
            document: newParticipationInviteSubscription,
            variables: {receiverId: appContext.getUserIdAsNumber()},
            updateQuery: (previousQueryResult, {subscriptionData}) => {
                if (!subscriptionData.data) return previousQueryResult;
                console.log("Run");
                // how to prevent multiple run ??
                let prevList = Array.from(subscriptionData.data.newParticipantInvite);
                let invList = new Set(prevList);
                invList.add(subscriptionData.data.newParticipantInvite);
                return {user: {invites: invList}}
            },
        }
    );

    const ButtonContainerStyle = {
        gridTemplateColumns: "50% 50%",
        gridGap: "10px",
        display: "grid"
}

    const loadInvites = () => {
        if (error) return (<div>Error... ${error}</div>);
        if (loading) return (<div>Loading...</div>);
        return (
            <div className={"invites"}>
                {data.user.invites.map((inv: Invite) => {
                    return (
                        <InviteComponent key={inv.id}>
                            <div>{inv.id}</div>
                            <div>{inv.project.name}</div>
                            <div>{inv.project.company.name}</div>
                            <div style={ButtonContainerStyle}>
                                <AlertModal text={"Yehh c-mon let's start working!!"} buttonText={"Confirm"} success={true}/>
                                <AlertModal text={"Are you sure to deny invitation?"} buttonText={"Deny"} />
                            </div>
                        </InviteComponent>
                    )
                })}
            </div>
        )
    };

    return (
        <div>
            <CenterDiv>
                <h2 style={{color: "white"}}>Profile</h2>
            </CenterDiv>
            <InviteComponent>
                <div>Invite Id</div>
                <div>Project name</div>
                <div>Company</div>
                <div>Options</div>
            </InviteComponent>
            {loadInvites()}

        </div>

    );
};

export default ProfilePage;