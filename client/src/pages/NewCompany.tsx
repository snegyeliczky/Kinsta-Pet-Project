import React, {useContext, useState} from 'react';
import {Button, Input, message} from "antd";
import {ShopOutlined, CheckOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import "../assets/CreatNewCompanyStyle.css"
import {ApplicationContext} from "../context/ApplicationContext";
import {NewCompanyContainer} from "../assets/styledComponents/styledComponents"
import {useMutation} from "@apollo/client";
import {createNewCompany} from "../queries/companyQueries";
import {getUsersCompanies} from "../queries/userQueries";

const NewCompany = () => {

    const appContext = useContext(ApplicationContext);
    let userId: number = appContext.getUserIdAsNumber();
    const [newCompName, setNewCompName] = useState<string>("");
    const [saveNewCompany] = useMutation(createNewCompany)
    const history = useHistory();

    const handleCreatCompany = async () => {
        if (newCompName.length > 2) {
            await saveNewCompany({
                variables: {
                    userId: userId,
                    CompanyName: newCompName
                },
                refetchQueries:[{query:getUsersCompanies,variables:{id:userId}}]
            });
            history.push("/app")
        } else {
            message.warning("Company name must be minimum 3 character!")
        }

    };


    return (
        <NewCompanyContainer>
            <h1> Create new company </h1>
            <div id={"new-company-form"}>
                <Input className={"company-name-input"} placeholder={"Company Name"} prefix={<ShopOutlined/>}
                       type={"string"}
                       onChange={event => {
                           setNewCompName(event.target.value)
                       }}
                />
                <Button id={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"}
                        onClick={event => {
                            handleCreatCompany()
                        }}>Create</Button>
            </div>
        </NewCompanyContainer>
    );
};

export default NewCompany;