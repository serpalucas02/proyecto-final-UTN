import React, { useState } from "react";
import "./Contacto.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formJSON = {
        nombre,
        email,
        mensaje
    }

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJSON),
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Mensaje enviado",
          text: "Pronto le responderemos!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setNombre("");
          setEmail("");
          setMensaje("");
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Error al enviar el mensaje",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-form">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <h1>Contacto</h1>
            <div className="form-group">
              <label htmlFor="nombre">Nombre y Apellido</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contacto;
