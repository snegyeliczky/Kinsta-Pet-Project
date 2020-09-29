import React, {ComponentType} from 'react';

interface thingsToAddComponent {
    //if necessary here we can define extra properties to the incoming component
}

export function addHeaderAndFooter<T extends thingsToAddComponent>(Component:ComponentType<T>){


    return(props:T)=>(
        <>
            <div>
                HEADER
            </div>
            <Component {...props} />
            <div>
                FOOTER
            </div>
        </>
    )
}