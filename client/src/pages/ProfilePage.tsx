import React, {useContext} from 'react';
import {CenterDiv, InviteComponent} from "../assets/styledComponents/styledComponents";
import {useQuery} from "@apollo/client";
import {getUserInvites} from "../queries/userQueries";
import {ApplicationContext} from "../context/ApplicationContext";
import {Invite} from "../Types/Invite";
import {newParticipationInviteSubscription} from "../queries/subscriptions";

import InvitationComponent from "../components/InvitationComponent";

const ProfilePage = () => {

    const appContext = useContext(ApplicationContext);
    const {error, loading, data, subscribeToMore, refetch} = useQuery(getUserInvites, {
        variables: {
            id: appContext.getUserIdAsNumber()
        },
        onCompleted:()=>{subscribeToInvites()}
    });

    const subscribeToInvites =()=> subscribeToMore(
        {
            document: newParticipationInviteSubscription,
            variables: {receiverId: appContext.getUserIdAsNumber()},
            updateQuery: (previousQueryResult, {subscriptionData}) => {
                if (!subscriptionData.data) return previousQueryResult;
                console.log("Run", subscriptionData.data);
                // how to prevent multiple run ??
                let prevList = Array.from(subscriptionData.data.newParticipantInvite);
                let invList = new Set(prevList);
                invList.add(subscriptionData.data.newParticipantInvite);
                subscriptionData.data = null;
                return {user: {invites: invList}}
            },
        }
    );

    const loadInvites = () => {
        return (
            <div className={"invites"}>
                {data.user.invites.map((inv: Invite) => {
                    return (
                        <InvitationComponent inv={inv} key={inv.id} refetchList={refetch}/>
                    )
                })}
            </div>
        )
    };


    if (error) return (<div>Error... {error?.message}</div>);
    if (loading) return (<div>Load invites</div>);
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