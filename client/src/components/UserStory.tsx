import React, {useContext, useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {SettingOutlined} from '@ant-design/icons';
import EditUserStory from "./EditUserStory";
import {ApplicationContext} from "../context/ApplicationContext";


interface Props {
    UserStory: UserStoryModel,
    removeUserStory: Function,
}


const UserStory: React.FC<Props> = ({UserStory, removeUserStory}) => {

    const [edit, setEdit] = useState(false);
    const [userStory, setUserStory] = useState(UserStory);
    const appContext = useContext(ApplicationContext);

    function handleChangeToEdit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setEdit(!edit);
    }

    function checkEstimation(): boolean {
        if (UserStory.estimatedUsers)
            return UserStory.estimatedUsers?.some((estimation) => {
                return parseInt(estimation.owner.id) === appContext.getUserIdAsNumber()
            });
        return false
    }

    function getEstimatedAverage() {
        let estimatedUsers = userStory.estimatedUsers;
        if (!estimatedUsers) return 0;
        let reduce = estimatedUsers?.reduce((re, e) => {
            re.sum += e.estimation;
            re.length++;
            return re
        }, {sum: 0, length: 0});
        return (reduce.sum / reduce.length).toFixed(1);
    }


    return (
        <>

            {
                edit ? <EditUserStory userStory={userStory} edit={edit} setEdit={setEdit}
                                      setUserStory={setUserStory} removeUserStory={removeUserStory}/>
                    : <UserStoryStyleComponent key={userStory.id} className={"userStory-component"} hover={true}>
                        <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
                        <div className={"userStory-userStory UserStory-part"}>{userStory.userStory}</div>
                        <div className={"userStory-businessValue UserStory-part"}>{userStory.businessValue}</div>
                        <div className={"userStory-ownerId UserStory-part"}>{userStory.owner.firstName}</div>
                        <div className={"userStory-estimation UserStory-part"}>
                            {checkEstimation() ? getEstimatedAverage() + "-SP" : "Please Estimate"}</div>
                        <div className={"UserStory-part"} onClick={e => handleChangeToEdit(e)}><SettingOutlined
                            spin={edit}/></div>
                    </UserStoryStyleComponent>
            }
        </>
    );
};

export default UserStory;