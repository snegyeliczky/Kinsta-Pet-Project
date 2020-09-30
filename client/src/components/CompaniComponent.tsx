import React from 'react';
import {Company} from "../interfaces/Company";

interface Props {
    company:Company
}


const CompaniComponent:React.FC<Props> = ({company}) => {
    return (
        <div className={"company-details"}>
            <div className={"company-name"}>
                <h3>{company.name}</h3>
            </div>
            <div className={"company-projects"}>

            </div>
        </div>
    );
};

export default CompaniComponent;