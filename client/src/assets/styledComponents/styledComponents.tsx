import styled from '@emotion/styled'

type H1Props = {
    color: string
    size: number
}

type CustomButtonProps = {
    primary?:boolean
}

export const H1 = styled('h1')<H1Props>(
    {
        gridColumn: 1/3,
    },
    props => ({
        fontSize: props.size,
        color:props.color
    })
);

export const CustomButton = styled("button")<CustomButtonProps>(
    props=>({
        color:props.primary?"white":"red",
        borderRadius:props.primary?"20px":"0",
        backgroundColor:props.primary?"#7629ce":"29ce3c",
        ":hover":{
            color:"red",
        }
    })
);

export const  CompanyPageProject = styled("div")(
    {
        backgroundColor: "rgba(83, 51, 237, 0.9)",
        width: "80%",
        minHeight: "40px",
        margin: "10px auto",
        border: "1px solid rgb(44, 212, 217)",
        borderRadius: "20px",
        boxShadow: "7px -6px 5px 1px rgba(55, 58, 85, 0.7)",
       "> h3":{
            color: "white"
        }
    },
);