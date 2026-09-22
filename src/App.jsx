import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgetPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
import Main from "./pages/Main";
import useAuth from "./store/useAuth";

function App() {
  const token = useAuth((state) => state.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/main"
          element={token ? <Main /> : <Navigate to="/login" replace />}
        />

        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={<Navigate to={token ? "/main" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;