import React from 'react'
import styled from 'styled-components'

const Homepage = ({ user }) => {
    if (!user) {
        return (
            <Wrapper>
                <p>Please Log In!</p>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <p>Homepage</p>
            {console.log(user)}
            <p>{user.displayName}</p>
			    {/* <p><a href="http://localhost:8000/auth/steam">Login</a></p>
			    <p><a href="http://localhost:8000/logout">Logout</a></p> */}


        </Wrapper>
    )
}

export default Homepage

const Wrapper = styled.div``;