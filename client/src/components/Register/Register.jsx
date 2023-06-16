import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

function Register() {
  const [error, setError] = useState(null);

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirm_password.value;

    if (!username || !email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const formJSON = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJSON),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Usuario registrado con éxito!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Error interno del servidor");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-login">
        <div className="login-wrap">
          <form onSubmit={handleSubmitRegister}>
            <h1>Registrate</h1>
            <div className="login-group">
              <label htmlFor="user">Usuario</label>
              <input id="user" type="text" name="username" />
            </div>
            <div className="login-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" />
            </div>
            <div className="login-group">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" name="password" />
            </div>
            <div className="login-group">
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <input
                id="confirm-password"
                type="password"
                name="confirm_password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit">Registrarme</button>
          </form>
        </div>

        <div className="footer-inicioSesion">
          <p>
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
