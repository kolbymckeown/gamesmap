import React from 'react'
import image from '../public/Something.png'
import painter from '../public/Painted.png'
import styled from 'styled-components'

const FourOhFour = () => {
	return (
		<Div>
			<Img src={painter} />
			<Img2 src={image} />
			
		</Div>
	)
}

export default FourOhFour;

const Div = styled.div`
	height: 700px;
	width: 1000px;
`;

const Img2 = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	position: fixed;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);

`;

const Img = styled.img`
	height: 350px;
	width: 350px;
	position: fixed;
	top: 45%;
	left: 47%;
	transform: translate(-50%, -50%);
	
`;