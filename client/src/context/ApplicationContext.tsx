import React, {createContext, useState} from 'react';




interface applicationContextProps{
    name:string
    setName:any
}

export const ApplicationContext = createContext<applicationContextProps|null>(null);


export const ApplicationProvider = (props:any) => {

    const [name,setName] = useState<string>("béla");

    const sampleAppContext: applicationContextProps ={
        name:name,
        setName:setName
    };


    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


