import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { User, Mail, Lock } from "lucide-react";
import API_URL from "../store/api";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  margin-bottom: 36px;
  font-family: sans-serif;

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 28px;
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
  margin: 0 0 28px;
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
  padding: 11px 45px 11px 38px;
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
  margin: -10px 0 12px;
  font-family: sans-serif;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: none;
  border-radius: 8px;
  background: #ff6b1a;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: sans-serif;
  transition: background 0.15s ease;

  &:hover {
    background: #e85f13;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: #aaa;
  font-size: 13px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
  }
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 22px;
`;

const showPass = styled.div`
  right: 10px;
`

const SocialButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #eee;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f7f7f7;
  }
`;

const LoginText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #888;
  margin: 0;
  font-family: sans-serif;

  span {
    color: #1a1a1a;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ServerError = styled.p`
  text-align: center;
  font-size: 13px;
  color: #e0433a;
  margin: 8px 0 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-top: 32px;

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

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Registration failed");
        return;
      }

      navigate("/login");
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
            <Logo><img src={taskflowLogo} style={{ width: "50px", height: "50px",  }} alt="" />TaskFlow</Logo>

            <Title>Create your Taskflow account</Title>

            <Subtitle>
              Please enter your details to create your account
            </Subtitle>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>Your Name</Label>

              <InputGroup>
                <User size={16} />

                <Input
                  placeholder="Enter your name"
                  error={errors.name}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </InputGroup>

              {errors.name && (
                <ErrorText>{errors.name.message}</ErrorText>
              )}

              <Label>Your email</Label>

              <InputGroup>
                <Mail size={16} />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </InputGroup>

              {errors.email && (
                <ErrorText>{errors.email.message}</ErrorText>
              )}

              <Label>Password</Label>

              <InputGroup>
                <Lock size={16} />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  error={errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" style={{ position: "absolute", right: 5 }} />
                  ) : (
                    <Visibility fontSize="small" style={{ position: "absolute", right: 5 }} />
                  )}
                </IconButton>
              </InputGroup>

              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress
                    size={20}
                    sx={{ color: "white" }}
                  />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {message && <ServerError>{message}</ServerError>}

            <Divider>or</Divider>

            <SocialRow>
              <SocialButton type="button">
                <img
                  src="https://cdn-icons-png.magnific.com/256/152/152752.png?semt=ais_white_label"
                  width={25}
                  alt="Apple"
                />
              </SocialButton>

              <SocialButton type="button">
                <img
                  src="https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png"
                  width={25}
                  alt="Facebook"
                />
              </SocialButton>

              <SocialButton type="button">
                <img
                  src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/250px-Google_%22G%22_logo.svg.png"
                  width={25}
                  alt="Google"
                />
              </SocialButton>
            </SocialRow>

            <LoginText>
              Do you have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </LoginText>
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

export default Register;