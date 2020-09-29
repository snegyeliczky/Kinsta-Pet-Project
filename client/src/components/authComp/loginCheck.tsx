import React, {ComponentType} from 'react';
import { useHistory } from "react-router-dom";




export  function AuthCheck<T>(OriginalComponent: ComponentType<T>, isPrivate: boolean) {
    const user = localStorage.getItem("username");
    const history = useHistory();

    if (isPrivate && user === null) {
        console.log("LOG IN MAN");
        history.push("/login");
    }
    return(props:T) =>(<OriginalComponent {...props} />)
}
/*

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


