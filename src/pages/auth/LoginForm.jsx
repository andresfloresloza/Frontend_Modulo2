import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useState } from "react";
import "../../styles/LoginForm.css";
import { ROUTER_HOME } from "../../config/Constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/loginSlice";
import { postLogin } from "../../services/UsuarioService";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    postLogin({
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.token);
        dispatch(userLogin(response.token));
        history(ROUTER_HOME);        
      })
      .catch((error) => {});
  };
  return (
    <>
      <div className="login_container">
        <Row>
          <Col>
            <Image
              src="./img/fondo.jpg"
              thumbnail
              style={{ width: "90%", marginLeft: "10%" }}
            />
          </Col>
          <Col>
            <div className="login_form">
              <Form onSubmit={handleSubmit}>
                <h1>INICIAR SESION</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo Electronico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo Electrónico..."
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña..."
                    value={password}
                    onChange={handlePasswordChange}
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
                  Ingresar
                </Button>
                <Form.Group className="text-center">
                  <br />
                  <span>
                    No tienes una cuenta? <a href="register">Registrate Aqui</a>
                  </span>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default LoginForm;
