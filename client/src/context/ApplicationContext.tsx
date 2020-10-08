import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {useHistory} from "react-router-dom";


interface applicationContextProps{
    username:string,
    setUserName:Dispatch<SetStateAction<string>>,
    getUserId: ()=>number;
}


export const ApplicationContext = createContext({username:""} as applicationContextProps);


export const ApplicationProvider = (props:any) => {

    const history = useHistory();
    const [username,setUserName] = useState<string>("");


    const getUserId=():number=>{
        let userId = localStorage.getItem("userId");
        if (userId) return parseInt(userId);
        history.push("/auth");
        return 0;
    };


    const sampleAppContext: applicationContextProps ={
        username:username,
        setUserName:setUserName,
        getUserId:getUserId
    };


    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


