import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Company} from "../interfaces/Company";
import CompanyService from "../services/CompanyService";




interface applicationContextProps{
    username:string,
    setUserName:Dispatch<SetStateAction<string>>,
    getCompanies:(employeeId:number)=>void,
    companies:Company[],
}

export const ApplicationContext = createContext({} as applicationContextProps);


export const ApplicationProvider = (props:any) => {


    const [username,setUserName] = useState<string>("");
    const [companies,setCompanies] = useState<Company[]>([]);



    const fetchCompanies = (employeeId:number):Company[]=>{
        let companies = CompanyService.getMyCompanies(employeeId);
        console.log(companies);
        return companies;
    };

    const getCompanies = (employeeId:number) =>{
        let MyCompanies:Company[] = fetchCompanies(employeeId);
        setCompanies(MyCompanies)
    };




    const sampleAppContext: applicationContextProps ={
        username:username,
        setUserName:setUserName,
        companies:companies,
        getCompanies:getCompanies
    };

    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


