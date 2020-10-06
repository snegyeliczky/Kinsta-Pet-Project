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
        backgroundColor:props.primary?"#7629ce":"29ce3c"
    })
);

