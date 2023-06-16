import React from 'react';
import Footer from '../Footer/Footer';
import ListaProductos from '../ListaProductos/ListaProductos';
import Navbar from '../Navbar/Navbar';

function Productos() {
    return (
        <>
            <Navbar/>
            <ListaProductos/>
            <Footer/>
        </>
    );
}

export default Productos;