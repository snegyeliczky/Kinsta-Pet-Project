import React, {useState} from 'react';
import {Company} from "../interfaces/Company";
import {StyledCompanyHeader} from "../assets/styledComponents/styledComponents";
import {CaretRightOutlined} from '@ant-design/icons';

type Props = {
    company: Company
}


const CompanyHeader: React.FC<Props> = ({company}) => {

    const [isActive, setActive] = useState(false);


    return (
        <StyledCompanyHeader  onClick={event => {
            setActive(!isActive)
        }} rotate={isActive}>
            <CaretRightOutlined  className={"arrow"} />
            <div id={"title"}>{company.name}</div>
        </StyledCompanyHeader>
    );
};

export default CompanyHeader;