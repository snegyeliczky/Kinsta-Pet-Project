import React, {useContext, useState} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompanyComponent from "../components/CompanyComponent";
import "../../src/assets/MainStyle.css"
import {Collapse} from 'antd';
import CompanyService from "../services/CompanyService";
import CompanyHeader from "../components/CompanyHeader";


const MainPage = () => {

    const appContext = useContext(ApplicationContext);
    let userId:string = appContext.getUserId();

    const [open,setOpen] = useState<string[]|string>([]);
    const companies = CompanyService.getMyCompanies(userId);

    function callback(key: string | string[]) {
        setOpen(key);
    }

    const {Panel} = Collapse;


    return (
        <div className={"company-container"}>
        <Collapse defaultActiveKey={open} onChange={callback} >
            {
                companies.map(company => {
                    return (
                        <Panel key={company.id} header={<CompanyHeader key={company.id} company={company} activeKey={open}/>} showArrow={false}>
                            <CompanyComponent company={company}/>
                        </Panel>
                    )
                })
            }
        </Collapse>
        </div>
    );

};

export default MainPage;