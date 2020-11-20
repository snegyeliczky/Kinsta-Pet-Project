import {UserModel} from "../interfaces/UserModel";


const UserList:UserModel[] = [];

let user1:UserModel = {
    id:"1",
    firstName:"Sándi",
    lastName:"Negyó",
    email:"sandor.negyeliczky@gmail.com",
    password:"salata",
};
UserList.push(user1);

let user2:UserModel = {
    id:"2",
    firstName:"Béla",
    lastName:"Kovács",
    email:"b.k@gmail.com",
    password:"1234",
};
UserList.push(user2);

let user3:UserModel = {
    id:"3",
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