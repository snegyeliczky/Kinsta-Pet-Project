import React, {useContext} from 'react';
import {CenterDiv} from "../assets/styledComponents/styledComponents";
import {useQuery} from "@apollo/client";
import {getUserInvites} from "../queries/userQueries";
import {ApplicationContext} from "../context/ApplicationContext";

const ProfilePage = () => {

    const appContext = useContext(ApplicationContext)
    const {error, loading, data} = useQuery(getUserInvites, {
        variables:{
            id:appContext.getUserIdAsNumber()
        }
    });

    return (
        <div>
            <CenterDiv>
                <h2 style={{color: "white"}}>Profile</h2>
            </CenterDiv>
            <div className={"invites"}>

            </div>

        </div>
    );
};

export default ProfilePage;