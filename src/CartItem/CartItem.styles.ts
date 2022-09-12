import styled from "styled-components";

export const Wrapper = styled.div`
    max-hegiht: 30px;
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px

    div{
        flex: 1;
    }

    .information, .buttons{
        display: flex;
        justify-content: space-between;
    }

    img{
        max-width: 35%;
        object-fit: cover;
        margin-left: 40px;
    }
`

export const RemoveWrapper = styled.div`
    button{
        max-width: 30px;
        max-height: 30px;
        background-color: red;
    }

`