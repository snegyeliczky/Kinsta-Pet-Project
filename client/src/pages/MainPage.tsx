import React, {useContext, useEffect} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";
import CompaniComponent from "../components/CompaniComponent";
import "../../src/assets/MainStyle.css"
import "../assets/ProjectAnimation.css"
import {Collapse} from 'antd';
import NewProjectModal from "../components/Modals/NewProjectModal";

const MainPage = () => {

    const appContext = useContext(ApplicationContext);
    let userId: number = appContext.getUserId();


    useEffect(() => {
        appContext.getCompanies(userId);
    }, [userId]);

    function callback(key: string | string[]) {
        console.log(key);
    }

    const {Panel} = Collapse;


    return (
        <Collapse defaultActiveKey={['1']} onChange={callback} className={"company-container"}>
            {
                appContext.companies.map(company => {
                    return (
                        <Panel key={company.id} header={company.name} >
                            <CompaniComponent company={company}/>
                        </Panel>
                    )
                })
            }
        </Collapse>
    );

};

export default MainPage;