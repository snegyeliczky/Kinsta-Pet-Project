import React, {useContext, useState} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompanyComponent from "../components/CompanyComponent";
import "../../src/assets/MainStyle.css"
import "../assets/ProjectAnimation.css"
import {Collapse} from 'antd';
import CompanyService from "../services/CompanyService";


const MainPage = () => {

    const appContext = useContext(ApplicationContext);
    let userId: number = appContext.getUserId();
    const [open,setOpen] = useState<string[]|string>();
    const companies = CompanyService.getMyCompanies(userId);

    function callback(key: string | string[]) {
        setOpen(key)
    }

    const {Panel} = Collapse;


    return (
        <Collapse defaultActiveKey={open} onChange={callback} className={"company-container"}>
            {
                companies.map(company => {
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