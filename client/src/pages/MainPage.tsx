import React, {useContext} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";

const MainPage = () => {

    const appContext =  useContext(ApplicationContext);

    return (
        <div>
            Hello {appContext.username}
        </div>
    );
};

export default MainPage;