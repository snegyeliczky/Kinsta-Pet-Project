import React, {useContext, useEffect} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompaniComponent from "../components/CompaniComponent";
import "../../src/assets/MainStyle.css"

const MainPage = () => {

    const appContext =  useContext(ApplicationContext);
    let userId:number = appContext.getUserId();



    useEffect(()=>{
        appContext.getCompanies(userId);
    },[userId]);


    return (
        <div id={"company-container"}>
            {
                appContext.companies.map(company=>{
                    return <CompaniComponent key={company.id} company={company}/>
                })
            }

        </div>
    );
};

export default MainPage;