import React, { useContext } from "react";
import "./Card.css";
import { CartContext } from "../CartContext/CartContext";

function Card({ id, imagen, nombre, precio }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = {
      id: id,
      imagen: imagen,
      nombre: nombre,
      precio: precio,
    };
    addToCart(product);
  };

  return (
    <div className="contenedor">
      <div className="carta">
        <div className="image">
          <img src={imagen} alt="producto" className="imgCard" />
        </div>
        <p>{nombre}</p>
        <p className="precio">${precio.toLocaleString()}</p>
      </div>
      <button
        id="agregarProducto"
        className="botonAgregar"
        onClick={handleAddToCart}
      >
        Agregar
      </button>
    </div>
  );
}

export default Card;
