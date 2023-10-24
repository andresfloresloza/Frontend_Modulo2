import { Route, Routes } from "react-router-dom";
import { ROUTER_INITIAL, ROUTER_HOME, ROUTER_REGISTER } from "./Constant";
import LoginForm from "../pages/auth/LoginForm";
import Dashboard from "../pages/Dashboard";
import RegisterForm from "../pages/auth/RegisterForm";
import RequireAuth from "./RequireAuth";
import NoRequireAuth from "./NoRequireAuth";

const RouterConfig = ({ Token }) => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTER_INITIAL}
          element={
            <NoRequireAuth Token={Token}>
              <LoginForm />
            </NoRequireAuth>
          }
        />
        <Route
          path={ROUTER_HOME}
          element={
            <RequireAuth Token={Token}>
              <Dashboard Token={Token}/>
            </RequireAuth>
          }
        />
        <Route
          path={ROUTER_REGISTER}
          element={
            <NoRequireAuth Token={Token}>
              <RegisterForm />
            </NoRequireAuth>
          }
        />
      </Routes>
    </>
  );
};
export default RouterConfig;
