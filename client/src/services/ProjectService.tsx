import {Project} from "../interfaces/Project";

let projectList:Project[] = [];

let project1 = {
    id:1,
    companyId:1,
    name:"New Bank Accont system",
    participants:["d448b8bb-3df5-4683-9507-3648e6d98b67","6f0050a8-f799-49ad-b71d-9372744ce063","b581a269-5e24-4079-82a6-16a5854a9bdc"]
};
projectList.push(project1);

let project2 = {
    id:2,
    companyId:1,
    name:"Bank analise system ",
    participants:["b581a269-5e24-4079-82a6-16a5854a9bdc","d448b8bb-3df5-4683-9507-3648e6d98b67"]
};
projectList.push(project2);

let project3 = {
    id:3,
    companyId:2,
    name:"New cash machine frontend",
    participants:["d448b8bb-3df5-4683-9507-3648e6d98b67"]
};
projectList.push(project3);

let project4 = {
    id:4,
    companyId:1,
    name:"Hr management system",
    participants:["d448b8bb-3df5-4683-9507-3648e6d98b67"]
};
projectList.push(project4);



export default {

    getProject:(projectId:number):Project=>{

      let projectInList = projectList.filter((project)=>{
          return project.id===projectId;
      });
      return projectInList[0];

    },

    getProjectForCompany:(companyId:number):Project[]=>{

        return projectList.filter((project)=>{
            return project.companyId===companyId;
        })

    },

    saveNewProject:(name:string,companyId:number,creatorId:string):Project[]=>{
        let newProject:Project = {
            id:projectList.length+1,
            companyId:companyId,
            name:name,
            participants:[creatorId]
        };
        projectList.push(newProject);
        return projectList.filter((project)=>{
            return project.companyId===companyId;
        }) ;
    }

};

