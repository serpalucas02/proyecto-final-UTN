import React from 'react';
import './Inicio.css';
import Navbar from '../Navbar/Navbar';
import CarouselComponent from '../Carousel/Carousel';
import Footer from '../Footer/Footer';
import ProductosDestacados from '../ProductosDestacados/ProductosDestacados';



function Inicio() {
    return (
        <>
            <Navbar/>
            <CarouselComponent/>
            <ProductosDestacados/>
            <Footer/>
        </>
    );
}

export default Inicio;