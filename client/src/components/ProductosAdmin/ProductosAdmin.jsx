import React, { useEffect, useState } from "react";
import "./ProductosAdmin.css";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";

function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [viewCreate, setCreateShow] = useState(false);
  const [viewEdit, setEditShow] = useState(false);
  const [viewDelete, setDeleteShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState("");

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

  const handleCreateShow = () => {
    setCreateShow(true);
  };

  const handleCreateClose = () => {
    setCreateShow(false);
  };

  const handleEditShow = (product) => {
    setSelectedProduct(product);
    setId(product._id);
    setEditShow(true);
  };

  const handleEditClose = () => {
    setEditShow(false);
  };

  const handleDeleteShow = (product) => {
    setSelectedProduct(product);
    setId(product._id);
    setDeleteShow(true);
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    const formJSON = {
      name: event.target.elements.name.value,
      category: event.target.elements.category.value,
      price: event.target.elements.price.value,
      imageURL: event.target.elements.imageURL.value,
      outstanding: event.target.elements.outstanding.value,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/newProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJSON),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Producto creado con éxito!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error al crear el producto",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const formJSON = {
      name: event.target.elements.name.value,
      category: event.target.elements.category.value,
      price: event.target.elements.price.value,
      imageURL: event.target.elements.imageURL.value,
      outstanding: event.target.elements.outstanding.value,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/updateProduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJSON),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Producto actualizado con éxito!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error al actualizar el producto",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/deleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Producto eliminado con éxito!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error al eliminar el producto",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="row">
        <div id="table-row" className="table-responsive">
          <div className="title-admin">
            <h1>Productos</h1>
            <Button className="btn-add btn-success" onClick={handleCreateShow}>
              <i className="fa fa-plu"></i>
              Agregar Producto
            </Button>
          </div>

          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>URL de la Imagen</th>
                <th>Destacado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto.name}</td>
                  <td>{producto.category}</td>
                  <td>${producto.price.toLocaleString()}</td>
                  <td>{producto.imageURL}</td>
                  <td>{producto.outstanding ? "SI" : "NO"}</td>
                  <td id="btn-modals">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEditShow(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteShow(producto)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para CREATE */}
      <div className="model-box-view">
        <Modal
          show={viewCreate}
          onHide={handleCreateClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitCreate}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" className="form-control" name="name" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="category" className="label-select">
                  Categoría:
                </label>
                <select name="category">
                  <option value="procesador">procesador</option>
                  <option value="grafica">grafica</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="price">Precio:</label>
                <input type="text" className="form-control" name="price" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="imageURL">URL Imagen:</label>
                <input type="text" className="form-control" name="imageURL" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="outstanding" className="label-select">
                  Producto Destacado:
                </label>
                <select name="outstanding">
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </select>
              </div>
              <Button type="submit" className="btn btn-success mt-4">
                Agregar Producto
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Modal para UPDATE */}
      <div className="model-box-view">
        <Modal
          show={viewEdit}
          onHide={handleEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  defaultValue={selectedProduct?.name}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="category" className="label-select">
                  Categoría:
                </label>
                <select
                  name="category"
                  defaultValue={selectedProduct?.category}
                >
                  <option value="procesador">procesador</option>
                  <option value="grafica">grafica</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="price">Precio:</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  defaultValue={selectedProduct?.price}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="imageURL">URL Imagen:</label>
                <input
                  type="text"
                  className="form-control"
                  name="imageURL"
                  defaultValue={selectedProduct?.imageURL}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="outstanding" className="label-select">
                  Producto Destacado:
                </label>
                <select
                  name="outstanding"
                  defaultValue={selectedProduct?.outstanding}
                >
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </select>
              </div>
              <Button type="submit" className="btn btn-warning mt-4">
                Editar Producto
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Modal para DELETE */}
      <div className="model-box-view">
        <Modal
          show={viewDelete}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="delete">
                ¿Seguro que quieres eliminar este producto?
              </label>
            </div>
            <div className="buttons-confirm">
              <Button
                type="submit"
                className="btn btn-success mt-4 btn-si-no"
                onClick={handleDelete}
              >
                SI
              </Button>
              <Button
                type="submit"
                className="btn btn-danger mt-4 btn-si-no"
                onClick={handleDeleteClose}
              >
                NO
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default ProductosAdmin;
