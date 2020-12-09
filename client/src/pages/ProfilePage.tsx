import React, {useContext} from 'react';
import {CenterDiv, InviteComponent} from "../assets/styledComponents/styledComponents";
import { useQuery} from "@apollo/client";
import { getUserInvites} from "../queries/userQueries";
import {ApplicationContext} from "../context/ApplicationContext";
import {Invite} from "../Types/Invite";
import {newParticipationInviteSubscription} from "../queries/subscriptions";

import InvitationComponent from "../components/InvitationComponent";

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

    const loadInvites = () => {
        if (error) return (<div>Error... ${error}</div>);
        if (loading) return (<div>Loading...</div>);
        return (
            <div className={"invites"}>
                {data.user.invites.map((inv: Invite) => {
                    return (
                        <InvitationComponent inv={inv} key={inv.id}/>
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