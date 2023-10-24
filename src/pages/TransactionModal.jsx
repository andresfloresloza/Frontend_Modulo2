import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getListsCuentasByUsuarioId } from "../services/CuentaService";
import { getListsCategoriasByUsuarioId } from "../services/CategoriaService";

const TransactionModal = ({
  show,
  handleClose,
  handleAddTransaction,
  type,
  Token,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState(0.0);
  const [objetoCuentaOrigen, setObjetoCuentaOrigen] = useState("");
  const [objetoCuentaDestino, setObjetoCuentaDestino] = useState("");
  const [objetoCategoria, setObjetoCategoria] = useState("");
  const [listaCuentas, setListaCuentas] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    getCuentas();
    getCategorias();
  }, []);

  /* LISTA DE CUENTAS */
  const getCuentas = () => {
    getListsCuentasByUsuarioId(Token.token, Token.usuarioId)
      .then((response) => {
        setListaCuentas(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  /* LISTA DE CATEGORIAS */
  const getCategorias = () => {
    getListsCategoriasByUsuarioId(Token.token, Token.usuarioId)
      .then((response) => {
        setListaCategorias(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const handleSave = () => {
    const newTransaction = {
      cuentaId: objetoCuentaOrigen,
      categoriaId: objetoCategoria,
      descripcion: descripcion,
      tipo: type,
      saldo: monto,
    };
    handleAddTransaction(newTransaction);
    setObjetoCuentaOrigen("");
    setObjetoCategoria("");
    setDescripcion("");
    setMonto(0.0);
    handleClose();
  };

  const modalTitle =
    type === "ingreso"
      ? "Registrar Ingreso"
      : type === "egreso"
      ? "Registrar Egreso"
      : "Registrar Transferencia";

  return (
    <>
      {type === "ingreso" || type === "egreso" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="seleccionObjeto">
                <Form.Label>Cuenta:</Form.Label>
                <Form.Control
                  as="select"
                  value={objetoCuentaOrigen}
                  onChange={(e) => setObjetoCuentaOrigen(e.target.value)}
                >
                  <option value="">Selecciona una Cuenta...</option>
                  {listaCuentas.map((objeto, index) => (
                    <option key={index} value={objeto.id}>
                      {objeto.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="seleccionObjeto">
                <Form.Label>Categoria:</Form.Label>
                <Form.Control
                  as="select"
                  value={objetoCategoria}
                  onChange={(e) => setObjetoCategoria(e.target.value)}
                >
                  <option value="">Selecciona una Categoria...</option>
                  {listaCategorias.map((objeto, index) => (
                    <option key={index} value={objeto.id}>
                      {objeto.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="descripcion">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción de la transacción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="monto">
                <Form.Label>Monto:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Monto de la transacción"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
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
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="seleccionObjeto">
                <Form.Label>Cuenta Origen:</Form.Label>
                <Form.Control
                  as="select"
                  value={objetoCuentaOrigen}
                  onChange={(e) => setObjetoCuentaOrigen(e.target.value)}
                >
                  <option value="">Selecciona una Cuenta...</option>
                  {listaCuentas.map((objeto, index) => (
                    <option key={index} value={objeto.id}>
                      {objeto.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="seleccionObjeto">
                <Form.Label>Cuenta Destino:</Form.Label>
                <Form.Control
                  as="select"
                  value={objetoCuentaDestino}
                  onChange={(e) => setObjetoCuentaDestino(e.target.value)}
                >
                  <option value="">Selecciona una Cuenta...</option>
                  {listaCuentas.map((objeto, index) => (
                    <option key={index} value={objeto.id}>
                      {objeto.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="descripcion">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción de la transacción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="monto">
                <Form.Label>Monto:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Monto de la transacción"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
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
      )}
    </>
  );
};

export default TransactionModal;
