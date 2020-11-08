import React from "react";
import styled from 'styled-components'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image1 from "../public/twoGamers.jpg"
import Image2 from "../public/keyboard.jpg";
import Image3 from "../public/ps4Remote.jpg";

export default function CarouselComponent() {
    return (
        <Div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div>
                    <Img src={Image1} />
                </div>
                <div>
                    <Img src={Image2} />
                </div>
                <div>
                    <Img src={Image3} />
                </div>
            </Carousel>
        </Div>
    );
}

const Img = styled.img`
    max-height: 400px;
    max-width: 600px;
`;

const Div = styled.div`
    height: 500px;
    width: 600px;
`;

