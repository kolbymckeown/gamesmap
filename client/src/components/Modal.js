import React from 'react'
import styled from 'styled-components'

const Modal = ({ userGames }) => {
    return (
        <Wrapper>
            {console.log(userGames, 'Modal')}
        </Wrapper>
    )
}

export default Modal;

const Wrapper = styled.div`
    border: 1px solid red;
    height: 650px;
    width: 350px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

