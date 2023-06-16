import React, { useEffect, useState } from "react";
import "./ListaProductos.css";
import Card from "./Card";

function ListaProductos() {
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
    <div className="contenedor1">
      <h3>Procesadores</h3>
      <div className="procesadores">
        {productos
          .filter((producto) => producto.category === "procesador")
          .map((productoFiltrado) => (
            <Card
              key={productoFiltrado._id}
              id={productoFiltrado._id}
              imagen={productoFiltrado.imageURL}
              nombre={productoFiltrado.name}
              precio={productoFiltrado.price}
            />
          ))}
      </div>

      <h3>Tarjetas de Video</h3>
      <div className="tarjetasGraficas">
        {productos
          .filter((producto) => producto.category === "grafica")
          .map((productoFiltrado) => (
            <Card
              key={productoFiltrado._id}
              id={productoFiltrado._id}
              imagen={productoFiltrado.imageURL}
              nombre={productoFiltrado.name}
              precio={productoFiltrado.price}
            />
          ))}
      </div>
    </div>
  );
}

export default ListaProductos;
