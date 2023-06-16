import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

function Login() {
  const [error, setError] = useState(null);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const formJSON = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    };

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJSON),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Inicio de sesión exitoso!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-login">
        <div className="login-wrap">
          <form onSubmit={handleSubmitLogin}>
            <h1>Iniciá sesión</h1>
            <div className="login-group">
              <label htmlFor="user">Usuario</label>
              <input id="user" type="text" name="username" required/>
            </div>
            <div className="login-group">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" name="password" required/>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>

        <div className="footer-inicioSesion">
          <p>
            ¿Aún no tenés cuenta?<Link to="/register"> Registrate</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
