import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AccountModal = ({ show, handleClose, handleAddAccount, usuarioId }) => {
  const [nombre, setNombre] = useState("");

  const handleSave = () => {
    if (nombre) {
      const newAccount = {
        usuarioId: usuarioId,
        nombre: nombre,
      };
      handleAddAccount(newAccount);
      setNombre("");
      handleClose();
    }
  };

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre de la Cuenta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la cuenta"
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
    </>
  );
};

export default AccountModal;
