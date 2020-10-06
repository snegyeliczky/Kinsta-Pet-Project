import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Company} from "../interfaces/Company";
import CompanyService from "../services/CompanyService";
import {useHistory} from "react-router-dom";




interface applicationContextProps{
    username:string,
    setUserName:Dispatch<SetStateAction<string>>,
    getCompanies:(employeeId:number)=>void,
    companies:Company[],
    getUserId: ()=>number;
}

export const ApplicationContext = createContext({} as applicationContextProps);


export const ApplicationProvider = (props:any) => {


    const history = useHistory();
    const [username,setUserName] = useState<string>("");
    const [companies,setCompanies] = useState<Company[]>([]);



    const fetchCompanies = (employeeId:number):Company[]=>{
        let companies = CompanyService.getMyCompanies(employeeId);
        return companies;
    };

    const getCompanies = (employeeId:number) =>{
        let MyCompanies:Company[] = fetchCompanies(employeeId);
        setCompanies(MyCompanies)
    };

    const getUserId=():number=>{
        let userId = localStorage.getItem("userId");
        if (userId) return parseInt(userId);
        history.push("/auth");
        return 0;
    };




    const sampleAppContext: applicationContextProps ={
        username:username,
        setUserName:setUserName,
        companies:companies,
        getCompanies:getCompanies,
        getUserId:getUserId
    };

    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


