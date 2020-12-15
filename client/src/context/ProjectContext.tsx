import React, {createContext, useState} from 'react';
import {UserModel} from "../Types/UserModel";

type projectContextProps = {
    participants: UserModel[]

    getUserName: (userId: string | undefined | null) => string
}

export const ProjectContext = createContext<projectContextProps>(
    {
        participants: [],
        getUserName: (userId): string => "username"
    });


export const ProjectProvider = (props: any) => {


    const [participants, setParticipants] = useState<UserModel[]>([]);


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
                getUserName
            }}>
            {props.children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
