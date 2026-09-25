import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../store/useAuth";
import API_URL from "../store/api";

const Page = styled.div`
  min-height: 100vh;
  padding: 30px;
  background: #f7f6f3;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
`;

const TopBar = styled.div`
  max-width: 900px;
  margin: 0 auto 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: transparent;
  color: #555;
  cursor: pointer;
  font-size: 13px;
  padding: 8px 0;

  &:hover {
    color: #111;
  }
`;

const Card = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 22px;
  overflow: hidden;
`;

const Cover = styled.div`
  height: 120px;
  background: linear-gradient(135deg, #ff751f, #ff9a5c);
`;

const ProfileTop = styled.div`
  padding: 0 30px 25px;
  margin-top: -55px;
`;

const AvatarBox = styled.div`
  position: relative;
  width: 105px;
  height: 105px;
`;

const Avatar = styled.img`
  width: 105px;
  height: 105px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  background: #eee;
  box-sizing: border-box;
`;

const ImageButton = styled.label`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ff751f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  cursor: pointer;

  &:hover {
    background: #e56617;
  }

  input {
    display: none;
  }
`;

const Name = styled.h1`
  margin: 14px 0 4px;
  font-size: 25px;
  color: #222;
`;

const Email = styled.p`
  margin: 0;
  color: #888;
  font-size: 13px;
`;

const Role = styled.span`
  display: inline-block;
  margin-top: 10px;
  padding: 6px 11px;
  border-radius: 999px;
  background: #fff0e8;
  color: #ff751f;
  font-size: 11px;
  font-weight: 600;
`;

const ImageText = styled.div`
  margin-top: 9px;
  color: #888;
  font-size: 11px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eeeeee;
`;

const Content = styled.div`
  padding: 25px 30px 30px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 17px;
  color: #222;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  padding: 16px;
  border: 1px solid #eeeeee;
  border-radius: 14px;
  background: #fafafa;
`;

const Label = styled.div`
  color: #999;
  font-size: 11px;
  margin-bottom: 6px;
`;

const Value = styled.div`
  color: #222;
  font-size: 14px;
  font-weight: 600;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
`;

const EditButton = styled(Button)`
  border: none;
  background: #ff751f;
  color: white;

  &:hover {
    background: #e56617;
  }
`;

const PasswordButton = styled(Button)`
  border: 1px solid #e1e1e1;
  background: white;
  color: #555;

  &:hover {
    background: #fafafa;
  }
`;

const LogoutButton = styled(Button)`
  border: 1px solid #ffd5d5;
  background: #fff5f5;
  color: #d64545;

  &:hover {
    background: #ffeaea;
  }
`;

const Form = styled.div`
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #eeeeee;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  padding: 0 13px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  outline: none;
  font-size: 13px;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #ff751f;
  }
`;

const SaveButton = styled.button`
  border: none;
  background: #ff751f;
  color: white;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background: #e56617;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 18px;
  padding: 28px;
  box-sizing: border-box;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const ModalIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #fff1f1;
  color: #d64545;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #eeeeee;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  color: #222;
`;

const ModalText = styled.p`
  margin: 0 0 25px;
  color: #888;
  font-size: 13px;
  line-height: 1.5;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 42px;
  border: 1px solid #dddddd;
  background: white;
  color: #555;
  border-radius: 9px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #f8f8f8;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  height: 42px;
  border: none;
  background: #d64545;
  color: white;
  border-radius: 9px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #c53a3a;
  }
`;

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 700;

        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round(
              (height * maxSize) / width
            );
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round(
              (width * maxSize) / height
            );
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );

        resolve(
          canvas.toDataURL("image/jpeg", 0.8)
        );
      };

      image.onerror = reject;
      image.src = reader.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Profile() {
  const navigate = useNavigate();
  const { user, token, logout, login } = useAuth();

  const fileRef = useRef(null);

  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(
    user?.avatar ||
    "https://i.pravatar.cc/150?img=12"
  );
  const [saving, setSaving] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    try {
      const image = await resizeImage(file);

      setAvatar(image);

      const response = await fetch(
        `${API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user?.name || "",
            avatar: image,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result?.message ||
          "Failed to save image"
        );
        return;
      }

      const updatedUser =
        result?.data || result;

      if (login) {
        login(token, updatedUser);
      }

      localStorage.setItem(
        "taskflow-user",
        JSON.stringify(updatedUser)
      );

      setAvatar(
        updatedUser.avatar ||
        "https://i.pravatar.cc/150?img=12"
      );

      alert("Profile photo saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save image");
    }
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            avatar,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result?.message ||
          "Failed to update profile"
        );
        return;
      }

      const updatedUser =
        result?.data || result;

      if (login) {
        login(token, updatedUser);
      }

      localStorage.setItem(
        "taskflow-user",
        JSON.stringify(updatedUser)
      );

      setName(updatedUser.name || "");

      setAvatar(
        updatedUser.avatar ||
        "https://i.pravatar.cc/150?img=12"
      );

      setEditOpen(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(
        `${API_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setLogoutOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <Page>
      <TopBar>
        <BackButton
          onClick={() => navigate("/main")}
        >
          <ArrowBackIcon fontSize="small" />
          Back to Dashboard
        </BackButton>
      </TopBar>

      <Card>
        <Cover />

        <ProfileTop>
          <AvatarBox>
            <Avatar
              src={avatar}
              alt={user?.name || "Profile"}
            />

            <ImageButton>
              <CameraAltOutlinedIcon fontSize="small" />

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </ImageButton>
          </AvatarBox>

          <ImageText>
            Click the camera to change your photo
          </ImageText>

          <Name>
            {user?.name || "User"}
          </Name>

          <Email>
            {user?.email || "No email"}
          </Email>

          <Role>
            {user?.role || "Member"}
          </Role>
        </ProfileTop>

        <Divider />

        <Content>
          <SectionTitle>
            Profile Information
          </SectionTitle>

          <InfoGrid>
            <InfoBox>
              <Label>Full Name</Label>

              <Value>
                {user?.name || "Not set"}
              </Value>
            </InfoBox>

            <InfoBox>
              <Label>Email</Label>

              <Value>
                {user?.email || "Not set"}
              </Value>
            </InfoBox>

            <InfoBox>
              <Label>Role</Label>

              <Value>
                {user?.role || "Member"}
              </Value>
            </InfoBox>

            <InfoBox>
              <Label>User ID</Label>

              <Value>
                {user?.id || "Not available"}
              </Value>
            </InfoBox>
          </InfoGrid>

          <Actions>
            <EditButton
              onClick={() =>
                setEditOpen(!editOpen)
              }
            >
              <EditOutlinedIcon fontSize="small" />
              Edit Profile
            </EditButton>

            <PasswordButton
              onClick={() =>
                navigate("/forget", {
                  state: {
                    from: "profile",
                    email: user?.email,
                  },
                })
              }
            >
              <LockOutlinedIcon fontSize="small" />
              Change Password
            </PasswordButton>

            <LogoutButton
              onClick={() => setLogoutOpen(true)}
            >
              <LogoutIcon fontSize="small" />
              Log out
            </LogoutButton>
          </Actions>

          {editOpen && (
            <Form>
              <SectionTitle>
                Edit Profile
              </SectionTitle>

              <InputGroup>
                <Label>Name</Label>

                <Input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </InputGroup>

              <SaveButton
                onClick={saveProfile}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </SaveButton>
            </Form>
          )}
        </Content>
      </Card>

      {logoutOpen && (
        <ModalOverlay
          onClick={() => setLogoutOpen(false)}
        >
          <Modal
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTop>
              <ModalIcon>
                <LogoutIcon />
              </ModalIcon>

              <CloseButton
                onClick={() =>
                  setLogoutOpen(false)
                }
              >
                <CloseIcon fontSize="small" />
              </CloseButton>
            </ModalTop>

            <ModalTitle>
              Log out?
            </ModalTitle>

            <ModalText>
              Are you sure you want to log out
              of your Taskflow account?
            </ModalText>

            <ModalActions>
              <CancelButton
                onClick={() =>
                  setLogoutOpen(false)
                }
              >
                Cancel
              </CancelButton>

              <ConfirmButton
                onClick={handleLogout}
              >
                Log out
              </ConfirmButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Page>
  );
}

export default Profile;