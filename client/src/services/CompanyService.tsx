import {Company} from "../interfaces/Company";



let companyList: Company[] = [];

let comp1: Company = {
    id: 1,
    name: "Erst and Young",
    employees: [1, 2]
};
companyList.push(comp1);

let comp2: Company = {
    id: 2,
    name: "Morgen Stanly",
    employees: [1, 3]
};
companyList.push(comp2);

let comp3: Company = {
    id: 3,
    name: "JP Morgen",
    employees: [3, 2]
};
companyList.push(comp3);

let comp4: Company = {
    id: 3,
    name: "JP Morgen",
    employees: [3, 2,1]
};
companyList.push(comp4);


export default {

    getMyCompanies: (employeeId: number) => {
        return companyList.filter((company) => {
            let contain: number[] = company.employees.filter(id => {
                return id === employeeId;
            });
            return contain.length > 0

        })
    }
}