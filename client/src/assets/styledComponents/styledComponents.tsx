import styled from '@emotion/styled'

export const CenterDiv = styled("div")(
    {
        margin: "10px auto",
        width: "fit-content"
    }
);

export const NewCompanyContainer = styled("div")(
    {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridAutoRows: "minmax(50px,auto)",
        "> h1": {
            gridColumn: "2/4",
            justifySelf: "center",
            color: "white"
        },
        "> #new-company-form": {
            gridColumn: "2/4",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gridGap: "10px",
            marginTop: "10%"
        },
        "> #new-company-form > .company-name-input": {
            gridColumn: "2/4",

        },
        "> #new-company-form > #submit": {
            gridColumn: " 2/4",
            justifySelf: "center"
        }
    }
);


export const CompanyPageProject = styled("div")(
    {
        backgroundColor: "rgba(83, 51, 237, 0.9)",
        width: "80%",
        minHeight: "40px",
        margin: "10px auto",
        border: "1px solid rgb(44, 212, 217)",
        borderRadius: "20px",
        boxShadow: "7px -6px 5px 1px rgba(55, 58, 85, 0.7)",
        cursor: "pointer",
        transition: "all .3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ":hover": {
            backgroundColor: "#3e8e41",
            transform: "scale(1.03)"
        },
        "> div": {
            color: "white"
        }
    },
);


export const ModalContainer = styled("div")(
    {
        width: "fit-content",
        margin: "0 auto"
    }
);


type StyledCompanyHeaderProps = {
    rotate: boolean
};

export const StyledCompanyHeader = styled("div")<StyledCompanyHeaderProps>(
    {
        color: "white",
        fontWeight: "bold",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        alignItems: "center",
        backgroundColor: "rgba(48, 197, 219, 0.5)",
        margin: "0 auto",
        minHeight: "40px",
        borderRadius: "20px",
        boxShadow: " 3px 6px 3px 0px rgba(55, 58, 85, 0.7)",
        "> .arrow": {
            transition: "all .3s ease-in-out",
            justifySelf: "center"

        },
        "> div": {
            gridColumn: "2/4",
            justifySelf: "center"
        }
    },
    props => ({
        "> .arrow": {
            transform: props.rotate ? "rotate(90deg)" : ""
        }
    })
);

type userStoryProps = {
    hover: boolean
}

export const UserStoryStyleComponent = styled("div")<userStoryProps>(
    {
        display: "grid",
        gridTemplateColumns: "repeat(8,1fr)",
        gridAutoRows: "minmax(100px,auto)",
        borderBottom: "1px solid white",
        fontSize: "15px",
        fontWeight: "bold",
        transition: "all .3s ease-in-out",
        "> .UserStory-part": {
            color: "white",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            padding: "8px"
        },
        "> .UserStory-part .userStory-edit": {
            marginRight: "15px"
        },
        "> .userStory-userStory": {
            gridColumn: "2/5",

        },
        "> .userStory-title": {
            justifySelf: "center"
        },
        "> .userStory-estimation": {
            color: "black",
            justifyContent: "center"
        },
        "> .userStory-businessValue-title": {
            cursor: "pointer",
            transition: "all .2s ease-in-out",
        },
        "> .userStory-businessValue-title:hover": {
            color: "green",
            fontSize: "15px",
            fontWeight: "bold"
        },
        "@media screen and (max-width: 600px)": {
            gridTemplateColumns: "repeat(2,1fr)",
            gridAutoRows: "minmax(10px,auto)",
            gridGap: "0px",
            justifyItems: "center",
            "> .userStory-userStory": {
                gridColumn: "auto"

            }, "> .userStory-estimation": {
                color: "white",
            }
        }
    },
    props => ({
        ":hover": {
            transform: props.hover ? "scale(1.03)" : ""
        },
    })
);


export const ProjectTitleContainer = styled("div")(
    {
        gridColumn: "2/4",
        justifySelf: "center",
        alignSelf: "center",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(10px,auto)",
        "> h2": {
            gridColumn: "1/4",
            color: "white"
        },
        "> h3": {
            gridRow: "2/3",
            gridColumn: "1/2",
            justifySelf: "end",
            alignSelf: "center",
            color: "white"
        },
        "> .alert_modal": {
            gridRow: "2/3",
            gridColumn: "3/4"
        }
    }
);

type TaskProps = {
    ready?: boolean,
};

export const TaskStyledComponent = styled("div")<TaskProps>(
    {
        display: "grid",
        gridGap: "10px",
        width: "85%",
        margin: "0 auto",
        gridTemplateColumns: "8vw 15vw 20vw 7vw 5vw 5vw 5vw",
        gridAutoRows: "minmax(70px,auto)",
        borderBottom: "1px solid green",
        color: "white",
        transition: "all .3s ease-in-out",
        "> div": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8px"
        },
        "@media screen and (max-width: 600px)": {
            gridTemplateColumns: "repeat(1,1fr)",
            gridAutoRows: "minmax(10px,auto)",
            gridGap: "0px",
        },
        ":hover": {
            transform: "scale(1.03)"
        }


    },
    props => ({
        backgroundColor: props.ready ? "green" : ""
    })
);

const TaskHeaderStyledComponent = styled("div")(
    {
        border: "2px solid green",
        marginTop: "15px",
        width: "87%",
        backgroundColor: "rgba(138, 43, 226,0.4)",
        borderRadius: "20px",
        ":hover": {
            transform: "scale(1.00)"
        }
    }
);

export const TaskHeaderTitleStyledComponent = TaskHeaderStyledComponent.withComponent(TaskStyledComponent);


export const EstimationUsersStyledComponent = styled("div")(
    {
        display: "grid",
        gridGap: "10px",
        gridTemplateColumns: "repeat(2,1fr)",
        justifyItems: "center",
    }
);

export const InviteComponent = styled("div")(
    {
        color: "white",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        justifyItems: "center",
        alignItems: "center",
        gridAutoRows: " minmax(100px,auto)",
    }
)
