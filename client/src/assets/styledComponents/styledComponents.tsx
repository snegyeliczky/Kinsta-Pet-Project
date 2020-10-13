import styled from '@emotion/styled'


type H1Props = {
    color: string
    size: number
};


type CustomButtonProps = {
    primary?: boolean
};


export const H1 = styled('h1')<H1Props>(
    {
        gridColumn: 1 / 3,
    },
    props => ({
        fontSize: props.size,
        color: props.color
    })
);


export const CustomButton = styled("button")<CustomButtonProps>(
    props => ({
        color: props.primary ? "white" : "red",
        borderRadius: props.primary ? "20px" : "0",
        backgroundColor: props.primary ? "#7629ce" : "29ce3c",
        ":hover": {
            color: "red",
        }
    })
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
        width: "90%",
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


export const UserStoryStyleComponent = styled("div")(
    {
        display: "grid",
        gridTemplateColumns: "repeat(6,1fr)",
        gridAutoRows: "minmax(100px,auto)",
        borderBottom: "1px solid white",
        "> .UserStory-part": {
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8px"
        },
        "> .userStory-userStory": {
            gridColumn: "2/4",
        },
        "> .userStory-estimation": {
            color: "black",
            fontWeight: "bold"
        }

    }
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
            gridColumn: "1/3",
            color: "white"
        },
        "> h3": {
            gridRow: "2/3",
            gridColumn: "3/4",
            justifySelf: "end",
            alignSelf: "center",
            color: "white"
        }
    }
);

export const TaskStyledComponent = styled("div")(
    {
        display: "grid",
        gridGap: "10px",
        width:"85%",
        margin:"0 auto",
        gridTemplateColumns: "10% 20% 50% 10% 10%",
        gridAutoRows: "minmax(100px,auto)",
        borderBottom: "1px solid green",
        color: "white",
        "> div": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "8px"
        },
        "@media screen and (max-width: 600px)" :{
            gridTemplateColumns: "repeat(1,1fr)",
            gridAutoRows:"minmax(10px,auto)",
            gridGap: "0px",
        }


    }
);

