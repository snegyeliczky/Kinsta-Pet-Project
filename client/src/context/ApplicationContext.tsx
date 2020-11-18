import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {useHistory} from "react-router-dom";
import {UserModel} from "../interfaces/UserModel";
import UserService from "../localServices/userService";


interface applicationContextProps{
    username:string,
    setUserName:Dispatch<SetStateAction<string>>,
    getUserId: ()=>string;
    getLoggedInUser: ()=>UserModel;
    getLoggedInUserName: ()=>string;
}


export const ApplicationContext = createContext({username:""} as applicationContextProps);


export const ApplicationProvider = (props:any) => {

    const history = useHistory();
    const [username,setUserName] = useState<string>("");


    const getUserId=():string=>{
        let userId = localStorage.getItem("userId");
        if (userId) return userId;
        history.push("/auth");
        return "";
    };

    const getLoggedInUser = ():UserModel =>{
        return UserService.getUserById(getUserId())
    };

    const getLoggedInUserName = ():string =>{
        return getLoggedInUser().firstName;
    };

    const sampleAppContext: applicationContextProps ={
        username:username,
        setUserName:setUserName,
        getUserId:getUserId,
        getLoggedInUser:getLoggedInUser,
        getLoggedInUserName:getLoggedInUserName
    };


    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


