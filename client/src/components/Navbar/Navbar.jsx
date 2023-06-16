import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import burguerIcon from "../../img/burguerIcon.png";
import Swal from "sweetalert2";
import { Badge, Modal } from "react-bootstrap";
import { CartContext } from "../CartContext/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [state, setState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const {
    cartItems,
    removeFromCart,
    calculateTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const [viewCart, setCartShow] = useState(false);

  const handleCartShow = () => {
    setCartShow(true);
  };

  const handleCartClose = () => {
    setCartShow(false);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const toggle = () => {
    setState(!state);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/user/check-authentication",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        setLoggedIn(false);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLoggedIn(false);
        Swal.fire({
          title: "Cierre de sesión exitoso!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error al cerrar sesión");
    }
  };

  const productCount = cartItems.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <>
      <nav>
        <ul id="menu" className={state ? "menu active" : "menu"}>
          <li className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li className="item">
            <Link to="/productos">Productos</Link>
          </li>
          <li className="item">
            <Link to="/contacto">Contacto</Link>
          </li>
          {loggedIn ? (
            <li className="item button">
              <div className="logout-icon-text">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                <p onClick={handleLogout} className="logout">
                  Cerrar Sesión
                </p>
              </div>
            </li>
          ) : (
            <li className="item button">
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                <p>Iniciar Sesión</p>
              </Link>
            </li>
          )}
          <li className="item carrito">
            <FontAwesomeIcon
              onClick={handleCartShow}
              icon={faCartShopping}
              className="carrito"
            />
            <Badge bg="danger" className="cart-badge" pill>
              {productCount}
            </Badge>
            <p onClick={handleCartShow} className="text-carrito">
              Mi carrito
            </p>
          </li>
          <li className="toggle" onClick={toggle}>
            <img src={burguerIcon} alt="burguerIcon" />
          </li>
        </ul>
      </nav>
      <div className="rgbar"></div>

      {/* Modal para el Carrito */}
      <div className="model-box-view">
        <Modal
          show={viewCart}
          onHide={handleCartClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Carrito de compras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-carrito">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td className="td-btn">
                        <div className="btn-more-less">
                          <button onClick={() => increaseQuantity(item)}>
                            +
                          </button>
                          <button onClick={() => decreaseQuantity(item)}>
                            -
                          </button>
                        </div>
                        <button
                          className="btn-eliminar"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Eliminar
                        </button>
                      </td>
                      <td>${item.precio.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>Total: ${calculateTotal().toLocaleString()}</h4>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Navbar;
