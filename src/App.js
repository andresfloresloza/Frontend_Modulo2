import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RouterConfig from "./config/RouterConfig";
import { useSelector } from "react-redux";

function App() {
  const Token = useSelector((state) => state.login.token);
  return (
      <BrowserRouter>
        <RouterConfig Token={Token} />
      </BrowserRouter>
  );
}

export default App;
