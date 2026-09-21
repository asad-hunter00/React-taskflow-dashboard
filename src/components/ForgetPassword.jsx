import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Mail, ArrowLeft } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
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
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);

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
    width: 35px;
    height: 35px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 40px;
  }
`;

const FormContent = styled.div`
  max-width: 430px;
  width: 100%;
  margin: 0 auto;
`;

const Back = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
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
  line-height: 1.5;
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
  height: 40px;
  padding: 10px 12px 10px 38px;
  border: 1px solid
    ${({ error }) => (error ? "#e0433a" : "#e2e2e2")};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  font-family: sans-serif;

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

const Terms = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #888;
  margin: 10px 0 22px;
  cursor: pointer;
  font-family: sans-serif;

  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  span {
    color: #444;
    font-weight: 600;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 42px;
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

const ServerError = styled.p`
  text-align: center;
  font-size: 13px;
  color: #e0433a;
  margin: 10px 0 0;
  font-family: sans-serif;
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

function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/forgot-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setMessage(result.message || "Something went wrong");
                return;
            }

            navigate("/verify-otp", {
                state: {
                    email: data.email,
                },
            });
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

                        <FormContent>
                            <Back onClick={() => navigate("/login")}>
                                <ArrowLeft size={14} />
                                Back
                            </Back>

                            <Title>Forgot your password?</Title>

                            <Subtitle>
                                Type in your email and we will send you a code to reset
                                your password!
                            </Subtitle>

                            <form onSubmit={handleSubmit(onSubmit)}>
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

                                <Terms>
                                    <input type="checkbox" required />
                                    I accept the <span>Terms and Conditions</span>
                                </Terms>

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

                            {message && (
                                <ServerError>{message}</ServerError>
                            )}
                        </FormContent>
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

export default ForgotPassword;