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

        /*
        render() {

            const loginErrorMessage = (
                <div>
                    Please <a href="/auth">login</a> in order to view this part of the application.
                </div>
            );

            return (
                <div>
                    { this.isAuthenticated() === true ? <Component {...this.props} /> : loginErrorMessage }
                </div>
            );
        }

         */

    };
}

export default requireAuthentication;