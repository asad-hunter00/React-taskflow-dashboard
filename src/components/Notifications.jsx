import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import useAuth from "../store/useAuth";
import API_URL from "../store/api";

const Wrapper = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  width: 42px;
  height: 42px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 10px;
  background: #ff751f;
  color: white;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  position: absolute;
  top: 52px;
  right: 0;
  width: 360px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 500px) {
    position: fixed;
    top: 72px;
    left: 15px;
    right: 15px;
    width: auto;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #eeeeee;
`;

const MenuTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #222;
`;

const ReadAllButton = styled.button`
  border: none;
  background: transparent;
  color: #ff751f;
  font-size: 12px;
  cursor: pointer;
`;

const List = styled.div`
  max-height: 420px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 15px 16px;
  border-bottom: 1px solid #f1f1f1;
  background: ${({ $read }) => ($read ? "#fff" : "#fff8f3")};
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const NotificationTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #222;
  margin-bottom: 5px;
`;

const NotificationMessage = styled.div`
  font-size: 12px;
  color: #777;
  line-height: 1.5;
`;

const NotificationTime = styled.div`
  font-size: 10px;
  color: #aaa;
  margin-top: 7px;
`;

const Empty = styled.div`
  padding: 30px 16px;
  text-align: center;
  color: #999;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

function formatTime(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function Notifications() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {
        try {
            const response = await fetch(`${API_URL}/api/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (response.ok) {
                setNotifications(result?.data || []);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (token) {
            loadNotifications();
        }
    }, [token]);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const markAsRead = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/api/notifications/${id}/read`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setNotifications((prev) =>
                    prev.map((notification) =>
                        notification.id === id
                            ? { ...notification, read: true }
                            : notification
                    )
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/notifications/read-all`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setNotifications((prev) =>
                    prev.map((notification) => ({
                        ...notification,
                        read: true,
                    }))
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            const response = await fetch(
                `${API_URL}/api/notifications/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setNotifications((prev) =>
                    prev.filter((notification) => notification.id !== id)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openNotification = async (notification) => {
        try {
            if (!notification.read) {
                await markAsRead(notification.id);
            }

            setOpen(false);

            const match = notification.message?.match(/task "([^"]+)"/i);

            if (!match) {
                return;
            }

            const taskTitle = match[1];

            const response = await fetch(
                `${API_URL}/api/tasks?search=${encodeURIComponent(taskTitle)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                return;
            }

            const tasks = Array.isArray(result?.data)
                ? result.data
                : [];

            const task = tasks.find(
                (item) =>
                    item.title?.toLowerCase() ===
                    taskTitle.toLowerCase()
            );

            if (task?.projectId) {
                navigate(`/projects/${task.projectId}`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Wrapper>
            <BellButton onClick={() => setOpen(!open)}>
                <NotificationsNoneIcon />

                {unreadCount > 0 && (
                    <Badge>{unreadCount}</Badge>
                )}
            </BellButton>

            {open && (
                <Menu>
                    <MenuHeader>
                        <MenuTitle>Notifications</MenuTitle>

                        {unreadCount > 0 && (
                            <ReadAllButton onClick={markAllAsRead}>
                                Mark all as read
                            </ReadAllButton>
                        )}
                    </MenuHeader>

                    <List>
                        {notifications.length === 0 ? (
                            <Empty>No notifications yet.</Empty>
                        ) : (
                            notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    $read={notification.read}
                                    onClick={() =>
                                        openNotification(notification)
                                    }
                                >
                                    <NotificationTitle>
                                        {notification.title || "Notification"}
                                    </NotificationTitle>

                                    <NotificationMessage>
                                        {notification.message}
                                    </NotificationMessage>

                                    <NotificationTime>
                                        {formatTime(notification.createdAt)}
                                    </NotificationTime>

                                    <Actions>
                                        {!notification.read && (
                                            <ReadAllButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    markAsRead(notification.id);
                                                }}
                                            >
                                                Mark as read
                                            </ReadAllButton>
                                        )}

                                        <ReadAllButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notification.id);
                                            }}
                                        >
                                            Delete
                                        </ReadAllButton>
                                    </Actions>
                                </NotificationItem>
                            ))
                        )}
                    </List>
                </Menu>
            )}
        </Wrapper>
    );
}

export default Notifications;