import React, { useEffect, useState } from "react";
import "./ProductosDestacados.css";
import Card from "../ListaProductos/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductosDestacados() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const allProducts = await response.json();
        setProductos(allProducts);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h3 className="tituloPD">Productos Destacados</h3>
      <div className="contenedorPD">
        <Slider {...settings}>
          {productos
            .filter((producto) => producto.outstanding === true)
            .map((productoFiltrado) => (
              <Card
                key={productoFiltrado._id}
                id={productoFiltrado._id}
                imagen={productoFiltrado.imageURL}
                nombre={productoFiltrado.name}
                precio={productoFiltrado.price}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductosDestacados;
