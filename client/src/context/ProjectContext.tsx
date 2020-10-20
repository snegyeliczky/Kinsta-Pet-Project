import React, {createContext, useState} from 'react';
import ProjectService from "../services/ProjectService";
import {UserModel} from "../interfaces/UserModel";
import UserService from "../services/userService";

type projectContextProps = {
    participants:UserModel[]
    loadParticipantUsersById:Function
    getUserName:(userId:string|undefined|null)=>string
}

export const ProjectContext = createContext<projectContextProps>(
    {
        participants:[],
        loadParticipantUsersById:Function,
        getUserName:(userId):string=>"username"
    });

export const ProjectProvider = (props:any) => {

    const [participants,setParticipants] = useState<UserModel[]>([]);

    const loadParticipantUsersById= (id:string)=> {
        let project = ProjectService.getProject(parseInt(id));
        let participantList: UserModel[] = [];
        project.participants.forEach(id => {
            participantList.push(UserService.getUserById(id))
        });
        setParticipants(participantList)
    };

    const getUser = (userId: string): UserModel | undefined => {

        let user = participants.find(user =>{
            return user.id===userId
        });
        if(user)return user;
        let otherUser = UserService.getUserById(userId);
        participants.push(otherUser);
        return otherUser;
    };

    const getUserName = (userId:string|undefined|null):string =>{
        if(!userId) return "no Owner";
        let user = getUser(userId);
        return user? user.firstName:"user not found"
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