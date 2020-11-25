import React, {createContext, useState} from 'react';
import {UserModel} from "../interfaces/UserModel";
import {useQuery} from "@apollo/client";
import {getProjectParticipants} from "../queries/projectQueries";

type projectContextProps = {
    participants: UserModel[]
    loadParticipantUsersById: Function
    getUserName: (userId: string | undefined | null) => string
}

export const ProjectContext = createContext<projectContextProps>(
    {
        participants: [],
        loadParticipantUsersById: Function,
        getUserName: (userId): string => "username"
    });


export const ProjectProvider = (props: any) => {


    const [participants, setParticipants] = useState<UserModel[]>([]);
    const {refetch} = useQuery(getProjectParticipants, {variables: {id: 0}})


    const loadParticipantUsersById = async (id: string) => {
        let {data} = await refetch({id: parseInt(id)});
        setParticipants(data.project.participants);
    };

    const getUser = (userId: string): UserModel | undefined => {
        let user = participants.find(user => {
            return user.id === userId
        });
        if (user) return user;

    };

    const getUserName = (userId: string | undefined | null): string => {
        if (!userId) return "---";
        let user = getUser(userId);
        return user ? user.firstName : "user not found"
    };


    return (
        <ProjectContext.Provider
            value={{
                participants,
                loadParticipantUsersById,
                getUserName
            }}>
            {props.children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
