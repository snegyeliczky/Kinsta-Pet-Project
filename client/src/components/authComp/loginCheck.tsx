import React, {ComponentType} from 'react';

export function isLoggedIn<T>(Component: ComponentType<T>, isPrivate: boolean) {

    return (props: T) => (
        <div>
            <h2>After auth check</h2>
            <Component {...props}/>
        </div>


    )
}