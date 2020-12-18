import React, {createContext} from 'react';

type projectContextProps = {
}

export const ProjectContext = createContext<projectContextProps>(
    {
        /*
        here comes the props
         exp.:participants: [],

         */
    });


export const ProjectProvider = (props: any) => {


    return (
        <ProjectContext.Provider
            value={{
                // propsname:real fnc
            }}>
            {props.children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
