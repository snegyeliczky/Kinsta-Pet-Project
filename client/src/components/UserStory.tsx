import React, {useContext, useState} from 'react';
import {UserStoryModel} from "../Types/UserStoryModel";
import {CenterDiv, UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {SettingOutlined, CheckSquareFilled} from '@ant-design/icons';
import EditUserStory from "./EditUserStory";
import {ApplicationContext} from "../context/ApplicationContext";


interface Props {
    UserStory: UserStoryModel,
    removeUserStory: Function,
}


const UserStory: React.FC<Props> = ({UserStory, removeUserStory}) => {


    const [edit, setEdit] = useState(false);
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
        let estimatedUsers = UserStory.estimatedUsers;
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
                edit ? <EditUserStory userStory={UserStory} edit={edit} setEdit={setEdit}
                                      removeUserStory={removeUserStory}/>
                    : <UserStoryStyleComponent key={UserStory.id} className={"userStory-component"} hover={true}>
                        <div className={"userStory-id UserStory-part"}>{UserStory.id}</div>
                        <div className={"userStory-userStory UserStory-part"}>{UserStory.userStory}</div>
                        <div className={"userStory-businessValue UserStory-part"}>{UserStory.businessValue}</div>
                        <div
                            className={"userStory-ownerId UserStory-part"}>{UserStory.owner ? UserStory.owner.firstName : "_ _ _"}</div>
                        <div className={"userStory-estimation UserStory-part"}>
                            {checkEstimation() ? getEstimatedAverage() + "-SP" : "Please Estimate"}</div>
                        <div className={"UserStory-part"} onClick={e => handleChangeToEdit(e)}>
                            <SettingOutlined spin={edit} style={{fontSize: "20px"}}/>
                            {UserStory.status
                                ?
                                <CenterDiv>
                                    <CheckSquareFilled style={{background: "green", fontSize: "20px"}}/>
                                </CenterDiv>
                                :
                                ""
                            }

                        </div>

                    </UserStoryStyleComponent>
            }
        </>
    );
};

export default UserStory;