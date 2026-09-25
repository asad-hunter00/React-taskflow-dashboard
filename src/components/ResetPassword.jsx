import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ArrowLeft, Lock } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import API_URL from "../store/api";
import taskflowLogo from "../img/taskflow.png";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-start;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 1360px;
  min-height: 800px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    min-height: auto;
    grid-template-columns: 1fr;
    border-radius: 0;
    box-shadow: none;
  }
`;

const ImageSide = styled.div`
  min-height: 800px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    height: 300px;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    height: 240px;
    min-height: 240px;
  }
`;

const FormSide = styled.div`
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 40px 35px;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 80px;
  font-family: sans-serif;

  img {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 40px;
  }
`;

const Content = styled.div`
  max-width: 430px;
  width: 100%;
  margin: 0 auto;
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  padding: 0;
  color: #777;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 24px;
  font-family: sans-serif;

  &:hover {
    color: #222;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
  font-family: sans-serif;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0 0 32px;
  font-family: sans-serif;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  font-family: sans-serif;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 18px;

  > svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 48px 12px 38px;
  border: 1px solid
    ${({ error }) => (error ? "#e0433a" : "#e2e2e2")};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ error }) =>
    error ? "#e0433a" : "#ff6b1a"};
  }
`;

const ErrorText = styled.p`
  color: #e0433a;
  font-size: 12px;
  margin: -12px 0 14px;
  font-family: sans-serif;
`;

const ServerError = styled.p`
  text-align: center;
  font-size: 13px;
  color: #e0433a;
  margin: 10px 0 0;
  font-family: sans-serif;
`;

const SuccessText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #16a34a;
  margin: 10px 0 0;
  font-family: sans-serif;
`;

const Button = styled.button`
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #ff6b1a;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: sans-serif;

  &:hover {
    background: #e85f13;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-top: 32px;
  font-family: sans-serif;

  a {
    color: #999;
    text-decoration: none;
    margin-left: 16px;
  }

  @media (max-width: 480px) {
    font-size: 11px;

    a {
      margin-left: 10px;
    }
  }
`;

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const from = location.state?.from || "";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    setMessage("");
    setSuccess("");

    if (!email || !otp) {
      setMessage("Email yoki OTP topilmadi. Iltimos, jarayonni qaytadan boshlang.");
      return;
    }

    console.log({
      email,
      otp,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Reset password failed");
        return;
      }

      setSuccess("Password changed successfully!");

      setTimeout(() => {
        if (from === "profile") {
          navigate("/profile");
        } else {
          navigate("/login");
        }
      }, 1200);
    } catch {
      setMessage("Server bilan bog'lanishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <ImageSide>
          <img
            src="https://i.pinimg.com/736x/41/74/7e/41747e78e01b6cde9c6201cd8ad8546d.jpg"
            alt="Taskflow"
          />
        </ImageSide>

        <FormSide>
          <div>
            <Logo>
              <img src={taskflowLogo} alt="Taskflow" />
              Taskflow
            </Logo>

            <Content>
              {from !== "profile" && (
                <Back
                  onClick={() =>
                    navigate("/verify-otp", {
                      state: {
                        email,
                        from,
                      },
                    })
                  }
                >
                  <ArrowLeft size={14} />
                  Back
                </Back>
              )}

              <Title>Change password</Title>

              <Subtitle>
                Enter your new password below
              </Subtitle>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>New password</Label>

                <InputGroup>
                  <Lock size={16} />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    error={errors.newPassword}
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                    })}
                  />

                  <IconButton
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    sx={{
                      position: "absolute",
                      right: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputGroup>

                {errors.newPassword && (
                  <ErrorText>
                    {errors.newPassword.message}
                  </ErrorText>
                )}

                <Label>Repeat password</Label>

                <InputGroup>
                  <Lock size={16} />

                  <Input
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    placeholder="Repeat your password"
                    error={errors.confirmPassword}
                    {...register("confirmPassword", {
                      required: "Please repeat your password",
                      validate: (value) =>
                        value === password ||
                        "Passwords do not match",
                    })}
                  />

                  <IconButton
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    sx={{
                      position: "absolute",
                      right: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputGroup>

                {errors.confirmPassword && (
                  <ErrorText>
                    {errors.confirmPassword.message}
                  </ErrorText>
                )}

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "white" }}
                    />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>

              {message && <ServerError>{message}</ServerError>}

              {success && (
                <SuccessText>{success}</SuccessText>
              )}
            </Content>
          </div>

          <Footer>
            <span>© Taskflow 2026</span>

            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Support</a>
            </div>
          </Footer>
        </FormSide>
      </Card>
    </Wrapper>
  );
}

export default ResetPassword;