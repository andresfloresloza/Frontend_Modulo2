import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Badge,
  Form,
} from "react-bootstrap";
import AccountModal from "./AccountModal";
import TransactionModal from "./TransactionModal";
import CategoryModal from "./CategoryModal";
import "../styles/Dashboard.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/loginSlice";
import { ROUTER_INITIAL } from "../config/Constant";
import {
  getListsCuentasByUsuarioId,
  postAccount,
} from "../services/CuentaService";
import {
  getListsCategoriasByUsuarioId,
  postCategory,
} from "../services/CategoriaService";
import { getByUsuarioId } from "../services/UsuarioService";
import {
  actualizarMovimiento,
  deleteMovimiento,
  getMovimientoCategoriaId,
  getMovimientoCuentaId,
  postMovimiento,
} from "../services/MovimientoService";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  deleteTransferencia,
  getTransferenciaCuentaId,
  postTransferencia,
} from "../services/TransferenciaService";

const Dashboard = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [user, setUser] = useState({});
  const [objectSelected, setObjectSelected] = useState(null);
  const [cuentaId, setCuentaId] = useState(null);
  const [categoriaId, setCategoriaId] = useState(null);
  const [listaCuentas, setListaCuentas] = useState([]);
  const [listaTransferenciaCuentas, setListaTransferenciaCuentas] = useState(
    []
  );
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaMovimientosCuentas, setListaMovimientosCuentas] = useState([]);
  const [listaMovimientosCategorias, setListaMovimientosCategorias] = useState(
    []
  );
  const datosMostrar = cuentaId
    ? listaMovimientosCuentas
    : categoriaId
    ? listaMovimientosCategorias
    : [];
  const saldoTotal = listaCuentas.reduce(
    (total, cuenta) => total + cuenta.saldo,
    0
  );

  useEffect(() => {
    getUsuario();
    getCuentas();
    getCategorias();
  }, []);

  const handleAddAccount = (newAccount) => {
    registerNewAccount(newAccount);
    setAccounts([...accounts, newAccount]);
  };

  const handleAddCategory = (newCategory) => {
    registerNewCategory(newCategory);
    setCategories([...categories, newCategory]);
  };

  const handleAddTransaction = (newTransaction) => {
    registerMovimiento(newTransaction);
    setTransactions([...transactions, newTransaction]);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    updateMovimiento(updatedTransaction);
    setTransactions([...transactions, updatedTransaction]);
  };

  /* INFORMACION USUARIO */
  const getUsuario = () => {
    getByUsuarioId(Token.token, Token.usuarioId)
      .then((response) => {
        setUser(response.data[0]);
        console.log(user);
      })
      .catch((error) => {});
  };

  /* INSERTAR CUENTA */
  const registerNewAccount = (newAccount) => {
    postAccount(Token.token, newAccount)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          getCuentas();
        }, 1000);
      })
      .catch((error) => {});
  };

  /* INSERTAR CATEGORIA */
  const registerNewCategory = (newCategory) => {
    postCategory(Token.token, newCategory)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          getCategorias();
        }, 1000);
      })
      .catch((error) => {});
  };

  /* INSERTAR MOVIMIENTO */
  const registerMovimiento = (newTransaction) => {
    if (newTransaction.tipo === "ingreso" || newTransaction.tipo === "egreso") {
      postMovimiento(Token.token, newTransaction)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            getCuentas();
            getMovimientosCuentas(cuentaId);
            getMovimientosCategorias(categoriaId);
          }, 1000);
        })
        .catch((error) => {});
    }
    postTransferencia(Token.token, newTransaction)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          getCuentas();
        }, 1000);
      })
      .catch((error) => {});
  };

  /* INSERTAR MOVIMIENTO */
  const updateMovimiento = (updatedTransaction) => {
    if (
      updatedTransaction.tipo === "ingreso" ||
      updatedTransaction.tipo === "egreso"
    ) {
      actualizarMovimiento(Token.token, updatedTransaction)
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            getCuentas();
            getMovimientosCuentas(cuentaId);
            getMovimientosCategorias(categoriaId);
          }, 1000);
        })
        .catch((error) => {});
    }
  };

  /* ELIMINAR MOVIMIENTO */
  const handleDeleteMovimiento = (id) => {
    deleteMovimiento(Token.token, id)
      .then((response) => {
        console.log(response);
        if (cuentaId) {
          getMovimientosCuentas(cuentaId);
          setTimeout(() => {
            getCuentas();
            getUsuario();
          }, 1000);
        } else if (categoriaId) {
          getMovimientosCategorias(categoriaId);
          setTimeout(() => {
            getCuentas();
            getUsuario();
          }, 1000);
        }
      })
      .catch((error) => {});
  };

  /* ELIMINAR Transferencia */
  const handleDeleteTransferencia = (id) => {
    deleteTransferencia(Token.token, id)
      .then((response) => {
        console.log(response);
        getMovimientosCuentas(cuentaId);
        setTimeout(() => {
          getCuentas();
          getUsuario();
        }, 1000);
      })
      .catch((error) => {});
  };

  /* LISTA DE CUENTAS */
  const getCuentas = () => {
    getListsCuentasByUsuarioId(Token.token, Token.usuarioId)
      .then((response) => {
        setListaCuentas(response.data);
        console.log(response.data);
        getUsuario();
      })
      .catch((error) => {});
  };

  /* LISTA DE CATEGORIAS */
  const getCategorias = () => {
    getListsCategoriasByUsuarioId(Token.token, Token.usuarioId)
      .then((response) => {
        setListaCategorias(response.data);
        console.log(response.data);
        getUsuario();
      })
      .catch((error) => {});
  };

  /* LISTA DE MOVIMIENTOS POR CATEGORIAS */
  const getMovimientosCategorias = (id) => {
    getMovimientoCategoriaId(Token.token, id)
      .then((response) => {
        setListaMovimientosCategorias(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  };

  /* LISTA DE MOVIMIENTOS POR CUENTAS */
  const getMovimientosCuentas = (id) => {
    getMovimientoCuentaId(Token.token, id)
      .then((response) => {
        setListaMovimientosCuentas(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
    getTransferenciaCuentaId(Token.token, id)
      .then((response) => {
        setListaTransferenciaCuentas(response.data);
      })
      .catch((error) => {});
  };

  const handleCuentaChange = (id) => {
    setCuentaId(id);
    setCategoriaId("");

    if (id !== "") {
      getMovimientosCuentas(id);
    }
  };

  const handleCategoriaChange = (id) => {
    setCategoriaId(id);
    setCuentaId("");

    if (id !== "") {
      getMovimientosCategorias(id);
    }
  };

  const cerrar_sesion = () => {
    dispatch(userLogout(Token));
    history(ROUTER_INITIAL);
  };

  return (
    <>
      <Container style={{ paddingBottom: "30px", overflowX: "auto" }}>
        <Row className="mt-4">
          <Button variant="danger" onClick={cerrar_sesion}>
            Salir
          </Button>

          <Col md={8}>
            <br />
            <section
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <h1>Dashboard - {user.firstName + " " + user.lastName}</h1>
              <h1>Monto Total: {user.montoTotal} Bs.</h1>
            </section>
            <br />
            <section
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <h1>Historial de Movimientos</h1>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Form>
                  <Form.Group controlId="seleccionObjeto">
                    <Form.Control
                      value={cuentaId}
                      as="select"
                      onChange={(e) => {
                        handleCuentaChange(e.target.value);
                      }}
                    >
                      <option value="">Selecciona una Cuenta...</option>
                      {listaCuentas.map((objeto, index) => (
                        <option key={index} value={objeto.id}>
                          {objeto.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group controlId="seleccionObjeto">
                    <Form.Control
                      as="select"
                      value={categoriaId}
                      onChange={(e) => {
                        handleCategoriaChange(e.target.value);
                      }}
                    >
                      <option value="">Selecciona una Categoria...</option>
                      {listaCategorias.map((objeto, index) => (
                        <option key={index} value={objeto.id}>
                          {objeto.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <h4>Ingreso</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="table-header">Cuenta</th>
                      <th className="table-header">Categoria</th>
                      <th className="table-header">Descripcion</th>
                      <th className="table-header">Tipo</th>
                      <th className="table-header">Monto</th>
                      <th className="table-header"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMostrar
                      .filter(
                        (dato) =>
                          dato.tipo === "Ingreso" || dato.tipo === "ingreso"
                      )
                      .map((dato, index) => (
                        <tr key={index}>
                          <td className="table-cell">{dato.cuenta}</td>
                          <td className="table-cell">{dato.categoria}</td>
                          <td className="table-cell">{dato.descripcion}</td>
                          <td className="table-cell">{dato.tipo}</td>
                          <td className="table-cell">+{dato.saldo} Bs.</td>
                          <td className="table-cell">
                            <Button
                              variant="warning"
                              onClick={() => {
                                setShowIncomeModal(true);
                                setObjectSelected(dato);
                              }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              style={{ marginLeft: "5px" }}
                              onClick={() => handleDeleteMovimiento(dato.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <br /> <h4>Egreso</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="table-header">Cuenta</th>
                      <th className="table-header">Categoria</th>
                      <th className="table-header">Descripcion</th>
                      <th className="table-header">Tipo</th>
                      <th className="table-header">Monto</th>{" "}
                      <th className="table-header"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMostrar
                      .filter(
                        (dato) =>
                          dato.tipo === "Egreso" || dato.tipo === "egreso"
                      )
                      .map((dato, index) => (
                        <tr key={index}>
                          <td className="table-cell">{dato.cuenta}</td>
                          <td className="table-cell">{dato.categoria}</td>
                          <td className="table-cell">{dato.descripcion}</td>
                          <td className="table-cell">{dato.tipo}</td>
                          <td className="table-cell">-{dato.saldo} Bs.</td>
                          <td className="table-cell">
                            <Button
                              variant="warning"
                              onClick={() => {
                                setShowExpenseModal(true);
                                setObjectSelected(dato);
                              }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              style={{ marginLeft: "5px" }}
                              onClick={() => handleDeleteMovimiento(dato.id)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </section>
            <br />
            <section
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <h1>Historial de Transferencias</h1>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Form>
                  <Form.Group controlId="seleccionObjeto">
                    <Form.Control
                      value={cuentaId}
                      as="select"
                      onChange={(e) => {
                        handleCuentaChange(e.target.value);
                      }}
                    >
                      <option value="">Selecciona una Cuenta...</option>
                      {listaCuentas.map((objeto, index) => (
                        <option key={index} value={objeto.id}>
                          {objeto.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="table-header">Cuenta Origen</th>
                    <th className="table-header">Monto</th>
                    <th className="table-header">Cuenta Destino</th>
                    <th className="table-header">Monto</th>
                    <th className="table-header"></th>
                  </tr>
                </thead>
                <tbody>
                  {listaTransferenciaCuentas.map((dato, index) => (
                    <tr key={index}>
                      <td className="table-cell">{dato.cuentaOrigen}</td>
                      <td className="table-cell">-{dato.saldo} Bs.</td>
                      <td className="table-cell">{dato.cuentaDestino}</td>
                      <td className="table-cell">+{dato.saldo} Bs.</td>
                      <td className="table-cell">
                        <Button
                          variant="danger"
                          style={{ marginLeft: "5px" }}
                          onClick={() => handleDeleteTransferencia(dato.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </section>
          </Col>

          <Col md={4}>
            <br />
            <section style={{ backgroundColor: "white", padding: "10px" }}>
              <div>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={() => setShowAccountModal(true)}
                >
                  Agregar Cuenta
                </Button>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={() => setShowCategoryModal(true)}
                >
                  Agregar Categoría
                </Button>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={() => {
                    setShowIncomeModal(true);
                    setObjectSelected(null);
                  }}
                >
                  Registrar Ingreso
                </Button>
                <Button
                  style={{ marginBottom: "15px" }}
                  onClick={() => {
                    setShowExpenseModal(true);
                    setObjectSelected(null);
                  }}
                >
                  Registrar Egreso
                </Button>
                <Button
                  onClick={() => {
                    setShowTransactionModal(true);
                    setObjectSelected(null);
                  }}
                >
                  Registrar Transferencia
                </Button>
              </div>
            </section>
            <section
              style={{
                backgroundColor: "white",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <h1>Lista de Cuentas:</h1>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="table-header">Nombre</th>
                    <th className="table-header">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {listaCuentas.map((cuenta, index) => (
                    <tr key={index}>
                      <td className="table-cell">{cuenta.nombre}</td>
                      <td className="table-cell">{cuenta.saldo} Bs.</td>
                    </tr>
                  ))}
                  <br />
                  <tr>
                    <td className="table-total">Total</td>
                    <td className="table-total">{saldoTotal} Bs.</td>
                  </tr>
                </tbody>
              </Table>
            </section>

            <section
              style={{
                backgroundColor: "white",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <h1>Lista de Categorías:</h1>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <div className="category-badge">
                        {listaCategorias.map((categoria, index) => (
                          <Badge
                            key={index}
                            variant="info"
                            className="account-badge-item"
                          >
                            {categoria.nombre}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </section>
          </Col>
        </Row>
        <CategoryModal
          show={showCategoryModal}
          handleClose={() => setShowCategoryModal(false)}
          handleAddCategory={handleAddCategory}
          usuarioId={Token.usuarioId}
        />

        <AccountModal
          show={showAccountModal}
          handleClose={() => setShowAccountModal(false)}
          handleAddAccount={handleAddAccount}
          usuarioId={Token.usuarioId}
        />

        <TransactionModal
          show={showIncomeModal}
          handleClose={() => setShowIncomeModal(false)}
          handleAddTransaction={handleAddTransaction}
          handleUpdateTransaction={handleUpdateTransaction}
          type="ingreso"
          Token={Token}
          object={objectSelected}
        />

        <TransactionModal
          show={showExpenseModal}
          handleClose={() => setShowExpenseModal(false)}
          handleAddTransaction={handleAddTransaction}
          handleUpdateTransaction={handleUpdateTransaction}
          type="egreso"
          Token={Token}
          object={objectSelected}
        />

        <TransactionModal
          show={showTransactionModal}
          handleClose={() => setShowTransactionModal(false)}
          handleAddTransaction={handleAddTransaction}
          handleUpdateTransaction={handleUpdateTransaction}
          type="transferencia"
          Token={Token}
          object={objectSelected}
        />
      </Container>
    </>
  );
};

export default Dashboard;
