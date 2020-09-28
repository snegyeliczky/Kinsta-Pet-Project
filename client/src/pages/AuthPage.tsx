import React, {useState} from 'react';
import Login from "../components/authComp/Login";
import Registration from "../components/authComp/Registration";
import { Switch } from 'antd';

const AuthPage = () => {

    const [isReg, setReg] = useState<boolean>(true);

    return (
        <div>
            Hello Auth
            <Switch checkedChildren="Login" unCheckedChildren="Registration" defaultChecked onChange={e=>{
                setReg(e)
            }}/>
            {isReg?<Login/>:<Registration/>}

        </div>
    );
};

export default AuthPage;