import React, {useState} from 'react';
import {Company} from "../interfaces/Company";

interface Props {
    company:Company
}



const CompaniComponent:React.FC<Props> = ({company}) => {

    const[displayProject,setDisplayProject]= useState(false);

    function getProjects(){
        if (displayProject)return(
            <div className={"company-projects"}>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>Hello event</h4>
                <h4>jjjjj event</h4>
            </div>
        );
        else return null;


    }

    return (
        <div className={"company-details"} onClick={event => setDisplayProject(!displayProject)}>
            <div className={"company-name"} >
                <h3>{company.name}</h3>
            </div>
            {getProjects()}
        </div>
    );
};

export default CompaniComponent;