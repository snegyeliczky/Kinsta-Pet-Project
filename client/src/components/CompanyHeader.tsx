import React from 'react';
import {Company} from "../interfaces/Company";
import {StyledCompanyHeader} from "../assets/styledComponents/styledComponents";
import {CaretRightOutlined} from '@ant-design/icons';

type Props = {
    company: Company
    activeKey:string[]|string
}


const CompanyHeader: React.FC<Props> = ({company,activeKey}) => {

    return (
        <StyledCompanyHeader
         rotate={activeKey.includes(company.id.toString())}>
            <CaretRightOutlined  className={"arrow"} />
            <div id={"title"}>{company.name}</div>
        </StyledCompanyHeader>
    );
};

export default CompanyHeader;