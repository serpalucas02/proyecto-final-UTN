import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import aorusCarousel from '../../img/aorus-carousel.png';
import corsairCarousel from '../../img/corsair-carousel.png';
import asusCarousel from '../../img/asus-carousel.png';

function CarouselComponent() {
    return (
        <div>
            <Carousel>
                <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100 imgCarousel"
                    src={aorusCarousel}
                    alt="First slide"
                />
                </Carousel.Item>
                
                <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100 imgCarousel"
                    src={corsairCarousel}
                    alt="Second slide"
                />
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100 imgCarousel"
                    src={asusCarousel}
                    alt="Third slide"
                />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default CarouselComponent;