import React, {useContext} from 'react';
import {ApplicationContext} from "../context/ApplicationContext";

const MainPage = () => {

    const appContext =  useContext(ApplicationContext);

    return (
        <div>
            {appContext?.name}
            Hello {localStorage.getItem("username")}
            <input type="text" onChange={event => {
                appContext.setName(event.target.value)
            }} />
            {appContext.getMyAge(27)}
        </div>
    );
};

export default MainPage;