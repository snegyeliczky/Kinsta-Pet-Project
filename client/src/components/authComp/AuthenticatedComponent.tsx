import React from "react";


export function requireAuthentication(Component:React.FC,history:any,appContext:any) {

    return class AuthenticatedComponent extends React.Component {


        isAuthenticated() {
            return !!appContext.getUserId();
        }

        render() {

            if (!this.isAuthenticated()){
                    history.push("/auth")
            }


            return (
                    <Component {...this.props} />
            );
        }

    };
}

export default requireAuthentication;