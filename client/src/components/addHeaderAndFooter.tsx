import React, {ComponentType} from 'react';
import NavBar from "../parts/NavBar";
import Footer from "../parts/Footer";

interface thingsToAddComponent {
    //if necessary here we can define extra properties to the incoming component
}

export function addHeaderAndFooter<T extends thingsToAddComponent>(Component: ComponentType<T>) {


    return (props: T) => (
        <>
            <NavBar/>
            <div id={"main-content-container"} style={{paddingTop: "10Vh"}}>
                <Component {...props} />
            </div>
            <Footer/>
        </>

    )
}