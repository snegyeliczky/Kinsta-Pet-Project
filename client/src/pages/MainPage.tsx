import React, {useContext, useState} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompanyComponent from "../components/CompanyComponent";
import "../../src/assets/MainStyle.css"
import {Collapse} from 'antd';
import CompanyHeader from "../components/CompanyHeader";
import {useQuery} from "@apollo/client";
import {getUsersCompanies} from "../queries/userQueries";
import {Company} from "../interfaces/Company";


const MainPage = () => {

    const appContext = useContext(ApplicationContext);
    let userId = appContext.getUserIdAsNumber();
    const [open,setOpen] = useState<string[]|string>([]);
    const {error,loading,data} = useQuery(getUsersCompanies,{variables:{id:userId}});

    function callback(key: string | string[]) {
        setOpen(key);
    }

    const {Panel} = Collapse;

    if (error) return <div>Error!!! {error}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div className={"company-container"}>
        <Collapse defaultActiveKey={open} onChange={callback} >
            {
                data.user.companies.map((company:Company) => {
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