import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contacto from "./components/Contacto/Contacto";
import Login from "./components/Login/Login";
import Inicio from "./components/Inicio/Inicio";
import Productos from "./components/Productos/Productos";
import Register from "./components/Register/Register";
import ProductosAdmin from "./components/ProductosAdmin/ProductosAdmin";
import { CartProvider } from "./components/CartContext/CartContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

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

        if (response.status === 200) {
          try {
            const responseRole = await fetch(
              "http://localhost:5000/user/get-role",
              {
                method: "GET",
                credentials: "include",
              }
            );

            const data = await responseRole.json();

            if (responseRole.status === 200) {
              setIsAdmin(data.role.includes("admin"));
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={isAdmin ? <ProductosAdmin /> : <Productos />}
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
