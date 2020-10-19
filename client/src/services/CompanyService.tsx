import {Company} from "../interfaces/Company";



let companyList: Company[] = [];

let comp1: Company = {
    id: 1,
    name: "Erst and Young",
    employees: ["d448b8bb-3df5-4683-9507-3648e6d98b67", "6f0050a8-f799-49ad-b71d-9372744ce063"]
};
companyList.push(comp1);

let comp2: Company = {
    id: 2,
    name: "Morgen Stanly",
    employees: ["d448b8bb-3df5-4683-9507-3648e6d98b67", "b581a269-5e24-4079-82a6-16a5854a9bdc"]
};
companyList.push(comp2);

let comp3: Company = {
    id: 3,
    name: "JP Morgen 2",
    employees: ["6f0050a8-f799-49ad-b71d-9372744ce063", "b581a269-5e24-4079-82a6-16a5854a9bdc"]
};
companyList.push(comp3);

let comp4: Company = {
    id: 3,
    name: "JP Morgen",
    employees: ["b581a269-5e24-4079-82a6-16a5854a9bdc", "6f0050a8-f799-49ad-b71d-9372744ce063","d448b8bb-3df5-4683-9507-3648e6d98b67"]
};
companyList.push(comp4);


export default {

    addNewCompany:(name:string,employeeId:string):void =>{
        let newCompany:Company = {
            id:companyList.length+1,
            name:name,
            employees:[employeeId]
        };
        companyList.push(newCompany)
    },

    getMyCompanies: (employeeId: string) => {
        return companyList.filter((company) => {
            let contain: string[] = company.employees.filter(id => {
                return id === employeeId;
            });
            return contain.length > 0;

        })
    }
}