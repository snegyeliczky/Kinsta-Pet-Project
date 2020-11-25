import {Project} from "../interfaces/Project";

let projectList:Project[] = [];




export default {

    getProject:(projectId:number):Project=>{

      let projectInList = projectList.filter((project)=>{
          return project.id===projectId;
      });
      return projectInList[0];

    },

    getProjectForCompany:(companyId:number):Project[]=>{

        return projectList.filter((project)=>{
            return project.id===companyId;
        })

    },

    saveNewProject:(name:string,companyId:number,creatorId:string):Project[]=>{
        let newProject = {
            id:projectList.length+1,

            name:name,

        };
        projectList.push();
        return projectList.filter((project)=>{
            return project.id===companyId;
        }) ;
    }

};

