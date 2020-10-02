import React, {useState} from 'react';
import {Button, Input} from "antd";
import {ShopOutlined, CheckOutlined} from '@ant-design/icons';
import CompanyService from "../services/CompanyService";
import {useHistory} from "react-router-dom";
import "../assets/CreatNewCompanyStyle.css"

const NewCompany = () => {

    let userId: number = 1;
    const [newCompName, setNewCompName] = useState<string>("");
    const history = useHistory();

    const handleCreatCompany = (): void => {
        if (newCompName.length > 2) {
            CompanyService.addNewCompany(newCompName, userId);
            history.push("/")
        } else {
            alert("Company name must be minimum 3 character!")
        }

    };


    return (
        <div id={"new-company-container"}>
            <h1> Create new company </h1>
            <div id={"new-company-form"}>
                <Input className={"company-name-input"} placeholder={"Company Name"} prefix={<ShopOutlined/>} type={"string"}
                       onChange={event => {
                           setNewCompName(event.target.value)
                       }}
                />
                <Button id={"submit"} shape={"round"} icon={<CheckOutlined/>} type={"primary"}
                        onClick={event => {
                            handleCreatCompany()
                        }}>Create</Button>
            </div>
        </div>
    );
};

export default NewCompany;