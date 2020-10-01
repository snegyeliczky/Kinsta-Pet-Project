import React from 'react';

const Footer = () => {

    const footerStyle:Object = {
        position: "fixed",
        left:0,
        bottom: 0,
        width: "100%",
        height:"10vh",
        textAlign: "center",
        borderTop:"1px solid black",
        backgroundColor:"#282c34",
    };


    return (
        <div className={"component"} id={"footer"} style={footerStyle}>
            <h2 style={{ color:"#fff"}}>Created by: Sándi</h2>
        </div>
    );
};

export default Footer;