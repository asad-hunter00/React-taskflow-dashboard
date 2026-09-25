import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../store/useAuth";
import API_URL from "../store/api";

const Page = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f7f6f3;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
`;

const TopBar = styled.div`
  max-width: 1200px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: transparent;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    color: #111;
  }
`;

const ChatCard = styled.div`
  max-width: 1200px;
  height: calc(100vh - 150px);
  margin: 0 auto;
  display: flex;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 20px;
  overflow: hidden;
`;

const Channels = styled.div`
  width: 240px;
  border-right: 1px solid #eeeeee;
  background: #fafafa;
  padding: 18px 12px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ChannelsTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #333;
  padding: 0 8px 12px;
`;

const ChannelButton = styled.button`
  width: 100%;
  border: none;
  text-align: left;
  background: ${({ $active }) =>
        $active ? "#fff0e8" : "transparent"};
  color: ${({ $active }) =>
        $active ? "#ff751f" : "#555"};
  border-radius: 10px;
  padding: 11px 10px;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 5px;

  &:hover {
    background: ${({ $active }) =>
        $active ? "#fff0e8" : "#f1f1f1"};
  }
`;

const ChatArea = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #eeeeee;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #222;
`;

const ChannelName = styled.p`
  margin: 5px 0 0;
  font-size: 12px;
  color: #999;
`;

const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $mine }) =>
        $mine ? "flex-end" : "flex-start"};
`;

const Message = styled.div`
  position: relative;
  max-width: 72%;
  min-width: 90px;
  padding: 10px 40px 10px 13px;
  border-radius: 15px;
  background: ${({ $mine }) =>
        $mine ? "#ff751f" : "#f1f1f1"};
  color: ${({ $mine }) =>
        $mine ? "#fff" : "#333"};

  @media (max-width: 600px) {
    max-width: 85%;
  }
`;

const UserName = styled.div`
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 4px;
  opacity: 0.75;
`;

const MessageText = styled.div`
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
`;

const MessageTime = styled.div`
  margin-top: 6px;
  font-size: 9px;
  opacity: 0.65;
  text-align: right;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 35px;
  right: 7px;
  width: 130px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: white;
  padding: 10px 12px;
  color: ${({ $danger }) =>
        $danger ? "#d64545" : "#555"};
  font-size: 12px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $danger }) =>
        $danger ? "#fff3f3" : "#f7f7f7"};
  }
`;

const Empty = styled.div`
  margin: auto;
  color: #999;
  font-size: 13px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid #eeeeee;
`;

const Input = styled.input`
  flex: 1;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  outline: none;
  font-size: 13px;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #ff751f;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background: #ff751f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e56617;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #222;
`;

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 9px;
  background: #f5f5f5;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EditInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 12px;
  padding: 12px;
  outline: none;
  font-size: 13px;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #ff751f;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

const CancelButton = styled.button`
  height: 40px;
  padding: 0 15px;
  border: 1px solid #dddddd;
  background: white;
  border-radius: 10px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  height: 40px;
  padding: 0 17px;
  border: none;
  background: #ff751f;
  color: white;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #e56617;
  }
`;

function formatMessageDate(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatMessageTime(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function Messages() {
    const navigate = useNavigate();
    const { token, user } = useAuth();

    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [openMenu, setOpenMenu] = useState(null);

    const [editOpen, setEditOpen] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [editText, setEditText] = useState("");
    const [editSaving, setEditSaving] = useState(false);

    useEffect(() => {
        const loadChannels = async () => {
            try {
                const response = await fetch(`${API_URL}/api/channels`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    const data = result?.data || [];
                    setChannels(data);

                    if (data.length > 0) {
                        setSelectedChannel(data[0]);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (token) {
            loadChannels();
        }
    }, [token]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedChannel) return;

            try {
                const response = await fetch(
                    `${API_URL}/api/channels/${selectedChannel.id}/messages?limit=50`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    setMessages(result?.data || []);
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadMessages();
    }, [selectedChannel, token]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim() || !selectedChannel) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/channels/${selectedChannel.id}/messages`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                setMessages((prev) => [...prev, result.data]);
                setMessage("");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            const response = await fetch(
                `${API_URL}/api/messages/${messageId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setMessages((prev) =>
                    prev.filter((item) => item.id !== messageId)
                );
                setOpenMenu(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openEdit = (item) => {
        setEditingMessage(item);
        setEditText(item.message || "");
        setEditOpen(true);
        setOpenMenu(null);
    };

    const updateMessage = async () => {
        if (!editText.trim() || !editingMessage) {
            return;
        }

        try {
            setEditSaving(true);

            const response = await fetch(
                `${API_URL}/api/messages/${editingMessage.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: editText.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                setMessages((prev) =>
                    prev.map((item) =>
                        item.id === editingMessage.id
                            ? {
                                ...item,
                                ...result.data,
                                message: result.data?.message || editText.trim(),
                            }
                            : item
                    )
                );

                setEditOpen(false);
                setEditingMessage(null);
                setEditText("");
            } else {
                alert(
                    result?.message || "Failed to update message"
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setEditSaving(false);
        }
    };

    return (
        <Page>
            <TopBar>
                <BackButton onClick={() => navigate("/main")}>
                    <ArrowBackIcon fontSize="small" />
                    Back to Dashboard
                </BackButton>
            </TopBar>

            <ChatCard>
                <Channels>
                    <ChannelsTitle>Channels</ChannelsTitle>

                    {channels.map((channel) => (
                        <ChannelButton
                            key={channel.id}
                            $active={selectedChannel?.id === channel.id}
                            onClick={() => {
                                setSelectedChannel(channel);
                                setOpenMenu(null);
                            }}
                        >
                            # {channel.name}
                        </ChannelButton>
                    ))}
                </Channels>

                <ChatArea>
                    <Header>
                        <Title>Messages</Title>

                        <ChannelName>
                            {selectedChannel?.name
                                ? `# ${selectedChannel.name}`
                                : "No channel"}
                        </ChannelName>
                    </Header>

                    <MessagesList>
                        {messages.length === 0 ? (
                            <Empty>
                                No messages yet.
                                <br />
                                Start the conversation.
                            </Empty>
                        ) : (
                            messages.map((item) => {
                                const mine = item.userId === user?.id;

                                return (
                                    <MessageRow
                                        key={item.id}
                                        $mine={mine}
                                    >
                                        <Message $mine={mine}>
                                            {!mine && (
                                                <UserName>
                                                    {item.user?.name || "User"}
                                                </UserName>
                                            )}

                                            <MessageText>
                                                {item.message}
                                            </MessageText>

                                            <MessageTime>
                                                {formatMessageDate(item.createdAt)} ·{" "}
                                                {formatMessageTime(item.createdAt)}
                                            </MessageTime>

                                            {mine && (
                                                <>
                                                    <MenuButton
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                openMenu === item.id
                                                                    ? null
                                                                    : item.id
                                                            )
                                                        }
                                                    >
                                                        <MoreVertIcon fontSize="small" />
                                                    </MenuButton>

                                                    {openMenu === item.id && (
                                                        <Menu>
                                                            <MenuItem
                                                                type="button"
                                                                onClick={() =>
                                                                    openEdit(item)
                                                                }
                                                            >
                                                                <EditOutlinedIcon fontSize="small" />
                                                                Edit
                                                            </MenuItem>

                                                            <MenuItem
                                                                type="button"
                                                                $danger
                                                                onClick={() =>
                                                                    deleteMessage(item.id)
                                                                }
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                                Delete
                                                            </MenuItem>
                                                        </Menu>
                                                    )}
                                                </>
                                            )}
                                        </Message>
                                    </MessageRow>
                                );
                            })
                        )}
                    </MessagesList>

                    <Form onSubmit={sendMessage}>
                        <Input
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />

                        <SendButton type="submit">
                            <SendIcon fontSize="small" />
                        </SendButton>
                    </Form>
                </ChatArea>
            </ChatCard>

            {editOpen && (
                <ModalOverlay>
                    <Modal>
                        <ModalTop>
                            <ModalTitle>Edit Message</ModalTitle>

                            <CloseButton
                                type="button"
                                onClick={() => {
                                    if (!editSaving) {
                                        setEditOpen(false);
                                    }
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </CloseButton>
                        </ModalTop>

                        <EditInput
                            value={editText}
                            onChange={(e) =>
                                setEditText(e.target.value)
                            }
                            autoFocus
                        />

                        <ModalActions>
                            <CancelButton
                                type="button"
                                onClick={() => {
                                    if (!editSaving) {
                                        setEditOpen(false);
                                    }
                                }}
                            >
                                Cancel
                            </CancelButton>

                            <SaveButton
                                type="button"
                                onClick={updateMessage}
                                disabled={editSaving}
                            >
                                {editSaving ? "Saving..." : "Save"}
                            </SaveButton>
                        </ModalActions>
                    </Modal>
                </ModalOverlay>
            )}
        </Page>
    );
}

export default Messages;