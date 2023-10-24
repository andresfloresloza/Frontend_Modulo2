import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryModal = ({ show, handleClose, handleAddCategory, usuarioId }) => {
  const [nombre, setNombre] = useState("");

  const handleSave = () => {
    if (nombre) {
      const newCategory = {
        usuarioId: usuarioId,
        nombre: nombre,
      };
      handleAddCategory(newCategory);
      setNombre("");
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre de la Categoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la categoria..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
