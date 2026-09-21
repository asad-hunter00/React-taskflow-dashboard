import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgetPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword"

function Main() {
  return (
    <div>
      <h1>Taskflow Main</h1>
      <p>Login muvaffaqiyatli!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/forget" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
         <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;