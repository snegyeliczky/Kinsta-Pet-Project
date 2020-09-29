import React, {createContext, Dispatch, SetStateAction, useState} from 'react';




interface applicationContextProps{
    name:string,
    setName:Dispatch<SetStateAction<string>>
    getMyAge:(age:number)=>number
}

export const ApplicationContext = createContext({} as applicationContextProps);


export const ApplicationProvider = (props:any) => {

    const [name,setName] = useState<string>("béla");

    const getMyAge=(age:number):number =>{
        return age;
    };

    const sampleAppContext: applicationContextProps ={
        name:name,
        setName:setName,
        getMyAge:getMyAge
    };


    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


