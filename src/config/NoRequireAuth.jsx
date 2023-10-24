import { Navigate } from "react-router-dom";
import { ROUTER_HOME } from "./Constant";

const NoRequireAuth = ({ Token, children }) => {
  if (Token) {
      return <Navigate to={ROUTER_HOME} />;
    }
    return children;
  }

export default NoRequireAuth;
