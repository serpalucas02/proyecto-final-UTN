const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const contactRoutes = require("./routes/contact");
const cors = require("cors");

require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos", error);
  });

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/contact", contactRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log("SERVIDOR LEVANTADO");
});
