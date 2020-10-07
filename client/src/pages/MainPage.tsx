import React, {useContext, useEffect, useState} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompanyComponent from "../components/CompanyComponent";
import "../../src/assets/MainStyle.css"
import "../assets/ProjectAnimation.css"
import {Collapse} from 'antd';


const MainPage = () => {

    const appContext = useContext(ApplicationContext);
    let userId: number = appContext.getUserId();
    const [open,setOpen] = useState<string[]|string>();


    useEffect(() => {
        appContext.getCompanies(userId);
    }, [userId]);

    function callback(key: string | string[]) {
        setOpen(key)
    }

    const {Panel} = Collapse;


    return (
        <Collapse defaultActiveKey={open} onChange={callback} className={"company-container"}>
            {
                appContext.companies.map(company => {
                    return (
                        <Panel key={company.id} header={company.name} >
                            <CompanyComponent company={company}/>
                        </Panel>
                    )
                })
            }
        </Collapse>
    );

};

export default MainPage;