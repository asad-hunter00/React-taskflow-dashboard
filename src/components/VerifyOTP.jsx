import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
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

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
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
    min-height: 300px;
    height: 300px;
  }

  @media (max-width: 480px) {
    min-height: 220px;
    height: 220px;
  }
`;

const FormSide = styled.div`
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 1100px) {
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
  margin-bottom: 80px;
  font-family: sans-serif;
  color: #1a1a1a;

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

    img {
      width: 32px;
      height: 32px;
    }
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
  margin: 0 0 6px;
  color: #1a1a1a;
  font-family: sans-serif;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: #888;
  line-height: 1.5;
  margin: 0 0 28px;
  font-family: sans-serif;

  strong {
    color: #444;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const OTPRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 480px) {
    gap: 7px;
  }
`;

const OTPInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  outline: none;
  color: #222;
  box-sizing: border-box;

  &:focus {
    border-color: #ff6b1a;
  }

  @media (max-width: 480px) {
    height: 44px;
    font-size: 18px;
    border-radius: 7px;
  }
`;

const Resend = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0 0 22px;
  font-family: sans-serif;

  span {
    color: #1a1a1a;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 11px;
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

const ErrorText = styled.p`
  color: #e0433a;
  text-align: center;
  font-size: 13px;
  font-family: sans-serif;
  margin: 10px 0 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  font-family: sans-serif;
  margin-top: 32px;

  a {
    color: #999;
    text-decoration: none;
    margin-left: 16px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    gap: 10px;

    a {
      margin-left: 8px;
    }
  }
`;

function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer === 0) return;

        const time = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(time);
    }, [timer]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otp = code.join("");

        if (otp.length !== 6) {
            setMessage("Enter the 6-digit code!");
            return;
        }

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/verify-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setMessage(result.message || "Invalid OTP");
                return;
            }

            navigate("/reset-password", { state: { email, otp } });

        } catch {
            setMessage("Server bilan bog'lanishda xatolik");
        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {
        if (timer > 0) return;

        await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });

        setCode(["", "", "", "", "", ""]);
        setTimer(30);
        setMessage("");

        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 0);
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
                            <Back onClick={() => navigate("/forget")}>
                                <ArrowLeft size={14} />
                                Back
                            </Back>

                            <Title>Two-factor authentication</Title>

                            <Text>
                                Check your email! We've sent a 6-digit code to{" "}
                                <strong>{email}</strong>. Enter it below to continue.
                            </Text>

                            <form onSubmit={handleSubmit}>
                                <OTPRow>
                                    {code.map((item, index) => (
                                        <OTPInput
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            value={item}
                                            maxLength={1}
                                            inputMode="numeric"
                                            onChange={(e) =>
                                                handleChange(e.target.value, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                        />
                                    ))}
                                </OTPRow>

                                <Resend>
                                    Didn't receive the code?{" "}
                                    {timer > 0 ? (
                                        `Resend in 00:${String(timer).padStart(2, "0")}`
                                    ) : (
                                        <span onClick={resendCode}>Resend</span>
                                    )}
                                </Resend>

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

                                {message && <ErrorText>{message}</ErrorText>}
                            </form>
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

export default VerifyOTP;