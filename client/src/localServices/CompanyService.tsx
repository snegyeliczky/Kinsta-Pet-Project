import {Company} from "../interfaces/Company";



let companyList: Company[] = [];

let comp1: Company = {
    id: 1,
    name: "Erst and Young",
    users:[]
};
companyList.push(comp1);

let comp2: Company = {
    id: 2,
    name: "Morgen Stanly",
    users:[]
};
companyList.push(comp2);

let comp3: Company = {
    id: 3,
    name: "JP Morgen 2",

    users:[]
};
companyList.push(comp3);

let comp4: Company = {
    id: 3,
    name: "JP Morgen",

    users:[]
};
companyList.push(comp4);


export default {

    addNewCompany:(name:string,employeeId:string):void =>{
        let newCompany:Company = {
            id:companyList.length+1,
            name:name,
            users:[]
        };
        companyList.push(newCompany)
    },

}