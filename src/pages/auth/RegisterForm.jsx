import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useState } from "react";
import "../../styles/RegisterForm.css";
import { ROUTER_INITIAL } from "../../config/Constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister} from "../../services/UsuarioService";

const RegisterForm = () => {
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const validatePassword = () => {
    let isValid = true;

    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        toast.error("Las contraseñas no coinciden");
      }
    }
    return isValid;
  };

  const registerNewUser = () => {
    if (validatePassword()) {
      postRegister({
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response);
          history(ROUTER_INITIAL);
        })
        .catch((error) => {
          if (error.response === 400) {
            toast.error(
              "Error al enviar enviar datos, verifique e intente nuevamente"
            );
          }
        });
    }
  };

  const SubmitData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    registerNewUser();
  };

  return (
    <>
      <div className="register_container">
        <Row>
          <Col>
            <Image
              src="./img/fondo.jpg"
              thumbnail
              style={{ width: "90%", marginLeft: "10%", marginTop: "8%" }}
            />
          </Col>
          <Col>
            <div className="register_form">
              <Form onSubmit={SubmitData}>
                <h1>REGISTRO</h1>
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre..."
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido..."
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Correo Electronico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span onClick={toggleShowPassword}>
                    {showPassword ? (
                      <img
                        style={{
                          width: "5%",
                          marginLeft: "640px",
                          marginTop: "-108px",
                        }}
                        src="./img/eye_off.png"
                        thumbnail
                        alt="Ocultar Contraseña"
                      />
                    ) : (
                      <img
                        style={{
                          width: "5%",
                          marginLeft: "640px",
                          marginTop: "-108px",
                        }}
                        src="./img/eye.png"
                        thumbnail
                        alt="Mostrar Contraseña"
                      />
                    )}
                  </span>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirmar Contraseña:</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirmar Contraseña..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span onClick={toggleShowPassword}>
                    {showPassword ? (
                      <img
                        style={{
                          width: "5%",
                          marginLeft: "640px",
                          marginTop: "-108px",
                        }}
                        src="./img/eye_off.png"
                        thumbnail
                        alt="Ocultar Contraseña"
                      />
                    ) : (
                      <img
                        style={{
                          width: "5%",
                          marginLeft: "640px",
                          marginTop: "-108px",
                        }}
                        src="./img/eye.png"
                        thumbnail
                        alt="Mostrar Contraseña"
                      />
                    )}
                  </span>
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Registrar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default RegisterForm;
