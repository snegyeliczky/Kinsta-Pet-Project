import React, {ComponentType} from 'react';
import { useHistory } from "react-router-dom";




export function AuthCheck<T>(OriginalComponent: ComponentType<T>, isPrivate: boolean, ) {
    const history=useHistory();
    const user = localStorage.getItem("username");
    console.log("history",history);


    if (isPrivate && user === null) {
        history.push("/auth");
    }

    return(props:T) =>(<OriginalComponent {...props} />)
}



/*
const LoginCheck = (OriginalComponent: ComponentType, isPrivate: boolean) => {

    const history = useHistory();

    const f=()=> {
        const user = localStorage.getItem("username");

        if (user===null){
            history.push("/auth");
        }
    };



    return() =>(
        <OriginalComponent />
    );
};

export default LoginCheck;


export default function<T> (OriginalComponent: ComponentType<T>, isPrivate: boolean) {

   function AuthCheck (){
       const user = localStorage.getItem("username");
       const history = useHistory();

       if (!isPrivate && user !== null) {
           console.log("you are already logged in");
           history.push('/');
       }

       if (isPrivate && user === null) {
           console.log("LOG IN MAN");
           history.push("/login");
       }
       return(props:T) =>(<OriginalComponent {...props} />)
   }

   return AuthCheck;
}





*/