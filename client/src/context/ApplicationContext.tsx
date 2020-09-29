import React, {createContext, Dispatch, SetStateAction, useState} from 'react';




interface applicationContextProps{
    username:string,
    setUserName:Dispatch<SetStateAction<string>>
    getMyAge:(age:number)=>number
}

export const ApplicationContext = createContext({} as applicationContextProps);


export const ApplicationProvider = (props:any) => {


    const [username,setUserName] = useState<string>("");

    const getMyAge=(age:number):number =>{
        return age;
    };




    const sampleAppContext: applicationContextProps ={
        username:username,
        setUserName:setUserName,
        getMyAge:getMyAge
    };

    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


