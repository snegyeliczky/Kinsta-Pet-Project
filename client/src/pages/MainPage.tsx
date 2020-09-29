import React, {useContext} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";

const MainPage = () => {

    const appContext =  useContext(ApplicationContext);

    return (
        <div>
            Hello {appContext.username}
            <button onClick={event => {
                localStorage.removeItem("username")
            }}>rm user</button>
        </div>
    );
};

export default MainPage;