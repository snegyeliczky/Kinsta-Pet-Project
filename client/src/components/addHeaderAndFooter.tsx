import React, {ComponentType} from 'react';
import NavBar from "../parts/NavBar";
import Footer from "../parts/Footer";

interface thingsToAddComponent {
    //if necessary here we can define extra properties to the incoming component
}

export function addHeaderAndFooter<T extends thingsToAddComponent>(Component: ComponentType<T>) {

    const style = {
        justifyContent: "center",
        width: "100%",
        gridTemplateColumns: "10% 80% 10%",
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 47%, rgba(0,212,255,1) 100%)",
        height: "contentBox",
        minHeight: "100vh",
        paddingTop: "11Vh",
        paddingBottom: "11vh"
    };


    return (props: T) => (
        <>
            <NavBar/>
            <div id={"main-content-container"} style={style}>
                <Component {...props} />
            </div>
            <Footer/>
        </>

    )
}