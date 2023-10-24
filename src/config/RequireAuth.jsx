import { Navigate } from "react-router-dom";
import { ROUTER_INITIAL } from "./Constant";

const RequireAuth = ({ Token, children }) => {
  if (!Token) {
    return <Navigate to={ROUTER_INITIAL} />;
  }

  return children;
};
export default RequireAuth;