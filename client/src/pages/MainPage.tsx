import React from 'react';

const MainPage = () => {
    return (
        <div>
            Hello {localStorage.getItem("username")}
        </div>
    );
};

export default MainPage;