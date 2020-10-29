import React from 'react'
import styled from 'styled-components'

const Modal = ({ game }) => {
    return (
        <Wrapper>
            {console.log(game, 'Modal')}
        </Wrapper>
    )
}

export default Modal;

const Wrapper = styled.div`
    border: 1px solid red;
    height: 450px;
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
`;

