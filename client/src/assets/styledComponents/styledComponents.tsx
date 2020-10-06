import styled from '@emotion/styled'

type H1Props = {
    color: string
    size: number
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

