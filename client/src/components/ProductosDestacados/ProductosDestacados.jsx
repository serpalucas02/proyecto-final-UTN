import React, { useEffect, useState } from "react";
import "./ProductosDestacados.css";
import Card from "../ListaProductos/Card";
import Carousel from "react-elastic-carousel";

function ProductosDestacados() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

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
        <Carousel breakPoints={breakPoints}>
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
        </Carousel>
      </div>
    </div>
  );
}

export default ProductosDestacados;
