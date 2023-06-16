const express = require("express");
const Product = require("../Models/Product.model");

const router = express.Router();

// Obtener todos los productos
router.get("/", (req, res) => {
  Product.find()
    .then((allProducts) => res.json(allProducts))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los productos" });
    });
});

// Obtener un producto por su ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el producto" });
    });
});

// Crear un nuevo producto
router.post("/newProduct", (req, res) => {
  const { name, category, price, imageURL, outstanding } = req.body;

  const newProduct = new Product({
    name,
    category,
    price,
    imageURL,
    outstanding,
  });

  newProduct
    .save()
    .then((createdProduct) => res.status(201).json(createdProduct))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al crear el producto" });
    });
});

// Actualizar un producto existente
router.put("/updateProduct/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, imageURL, outstanding } = req.body;

  Product.findByIdAndUpdate(
    id,
    { name, category, price, imageURL, outstanding },
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(updatedProduct);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    });
});

// Eliminar un producto existente
router.delete("/deleteProduct/:id", (req, res) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto eliminado exitosamente" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    });
});

module.exports = router;
