import {gql} from "@apollo/client";

const subscribeNewTask = gql`
    subscription{
        tasksForUserStory{
            id,
            title,
            description,
            owner{
                id,
                firstName
            },
            time,
            ready,
            userStory{
                id
            }
        }
    }
`;

export {subscribeNewTask}