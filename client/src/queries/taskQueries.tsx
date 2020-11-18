import { gql } from '@apollo/client';

const getTaskForUserStory = gql`
    query($id:ID!){
        userStory(id:$id){tasks{id,title,description,owner{id,firstName},time,ready}}
    }
`

export {getTaskForUserStory}