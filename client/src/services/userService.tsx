import {UserModel} from "../interfaces/UserModel";


const UserList:UserModel[] = [];

let user1:UserModel = {
    id:"d448b8bb-3df5-4683-9507-3648e6d98b67",
    firstName:"Sándi",
    lastName:"Negyó",
    email:"sandor.negyeliczky@gmail.com",
    password:"salata",
};
UserList.push(user1);

let user2:UserModel = {
    id:"6f0050a8-f799-49ad-b71d-9372744ce063",
    firstName:"Béla",
    lastName:"Kovács",
    email:"b.k@gmail.com",
    password:"1234",
};
UserList.push(user2);

let user3:UserModel = {
    id:"b581a269-5e24-4079-82a6-16a5854a9bdc",
    firstName:"Mari",
    lastName:"Faragó",
    email:"f.m@gmail.com",
    password:"1234",
};
UserList.push(user3);

export default {

    getUserById:(id:string):UserModel=>{
        return UserList.filter(u=>{
            return u.id===id;
        })[0]
    }
}