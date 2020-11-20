import {Company} from "../interfaces/Company";



let companyList: Company[] = [];

let comp1: Company = {
    id: 1,
    name: "Erst and Young",
    employees: ["1", "2"]
};
companyList.push(comp1);

let comp2: Company = {
    id: 2,
    name: "Morgen Stanly",
    employees: ["1","2"]
};
companyList.push(comp2);

let comp3: Company = {
    id: 3,
    name: "JP Morgen 2",
    employees: ["2", "3"]
};
companyList.push(comp3);

let comp4: Company = {
    id: 3,
    name: "JP Morgen",
    employees: ["1", "2","3"]
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