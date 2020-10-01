import {Project} from "../interfaces/Project";

let projectList:Project[] = [];

let project1 = {
    id:1,
    companyId:1,
    name:"New Bank Accont system",
};
projectList.push(project1);

let project2 = {
    id:2,
    companyId:1,
    name:"Bank analise system ",
};
projectList.push(project2);

let project3 = {
    id:3,
    companyId:2,
    name:"New cash machine frontend",
};
projectList.push(project3);

let project4 = {
    id:4,
    companyId:1,
    name:"Hr management system",
};
projectList.push(project4);



export default {

    getProject:(projectId:number):Project=>{

        console.log(projectId)
      let projectInList = projectList.filter((project)=>{
          return project.id===projectId;
      });
      console.log(projectList.filter((project)=>{
          return project.id===projectId;
      }));
      return projectInList[0];

    },

    getProjectForCompany:(companyId:number):Project[]=>{

        return projectList.filter((project)=>{
            return project.companyId===companyId;
        })

    }

};

