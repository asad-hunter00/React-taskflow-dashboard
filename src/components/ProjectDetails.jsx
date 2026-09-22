import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import API_URL from "../store/api";
import useAuth from "../store/useAuth";

const Page = styled.div`
  min-height: 100vh;
  background: #f7f6f3;
  padding: 28px;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    color: #111;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  padding: 10px 14px;
  background: #fff;
  color: #444;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #d64545;
`;

const MainCard = styled.div`
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const TitleBox = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  color: #202020;
`;

const Description = styled.p`
  margin: 0;
  color: #858585;
  font-size: 14px;
  line-height: 1.6;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $type }) =>
        $type === "urgent"
            ? "#e0433a"
            : $type === "progress"
                ? "#6354d8"
                : "#b76d18"};

  background: ${({ $type }) =>
        $type === "urgent"
            ? "#fff0ef"
            : $type === "progress"
                ? "#f0edff"
                : "#fff5e8"};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 25px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  padding: 16px;
  border: 1px solid #eeeeee;
  border-radius: 14px;
  background: #fafafa;
`;

const InfoLabel = styled.div`
  font-size: 11px;
  color: #999;
  margin-bottom: 7px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #252525;
`;

const ProgressSection = styled.div`
  margin-top: 25px;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #f0f0f0;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  background: #ff751f;
  border-radius: 999px;
`;

const SectionCard = styled(MainCard)`
  margin-bottom: 20px;
`;

const SectionTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 19px;
  color: #222;
`;

const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 9px;
  background: #ff751f;
  color: white;
  padding: 9px 13px;
  cursor: pointer;

  &:hover {
    background: #e56617;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eeeeee;
  border-radius: 14px;
  background: #fff;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const TaskLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const TaskIcon = styled.div`
  color: ${({ $done }) => ($done ? "#1a9c5c" : "#888")};
`;

const TaskContent = styled.div`
  min-width: 0;
`;

const TaskTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`;

const TaskMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  color: #888;
  font-size: 11px;
`;

const TaskRight = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SmallButton = styled.button`
  border: 1px solid #e5e5e5;
  background: white;
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 11px;
  cursor: pointer;
  color: #666;

  &:hover {
    background: #f8f8f8;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityDot = styled.div`
  width: 9px;
  height: 9px;
  margin-top: 5px;
  border-radius: 50%;
  background: #ff751f;
  flex-shrink: 0;
`;

const ActivityText = styled.div`
  flex: 1;
`;

const ActivityMain = styled.div`
  font-size: 13px;
  color: #333;
`;

const ActivityTime = styled.div`
  font-size: 11px;
  color: #999;
  margin-top: 4px;
`;

const Empty = styled.div`
  padding: 30px;
  text-align: center;
  color: #999;
`;

function statusText(status) {
    const map = {
        PLANNING: "Planning",
        IN_PROGRESS: "In progress",
        COMPLETED: "Completed",
        ON_HOLD: "On hold",
    };

    return map[status] || status;
}

function priorityText(priority) {
    const map = {
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High",
        URGENT: "Urgent",
    };

    return map[priority] || priority;
}

function formatDate(dateValue) {
    if (!dateValue) return "No date";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "No date";
    }

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatDateTime(dateValue) {
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

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [taskSaving, setTaskSaving] = useState(false);

    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("PLANNING");
    const [editPriority, setEditPriority] = useState("MEDIUM");
    const [editProgress, setEditProgress] = useState(0);
    const [editDueDate, setEditDueDate] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("TODO");
    const [taskPriority, setTaskPriority] = useState("MEDIUM");
    const [taskDueDate, setTaskDueDate] = useState("");

    const loadProject = async () => {
        try {
            setLoading(true);
            setError("");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [projectResponse, tasksResponse, activityResponse] =
                await Promise.all([
                    fetch(`${API_URL}/api/projects/${id}`, {
                        headers,
                    }),
                    fetch(`${API_URL}/api/tasks?projectId=${id}`, {
                        headers,
                    }),
                    fetch(`${API_URL}/api/activities`, {
                        headers,
                    }),
                ]);

            const projectResult = await projectResponse.json();

            if (!projectResponse.ok) {
                throw new Error(
                    projectResult?.message || "Failed to load project"
                );
            }

            const projectData = projectResult.data || projectResult;

            let tasksData = [];
            let activityData = [];

            if (tasksResponse.ok) {
                const result = await tasksResponse.json();
                tasksData = Array.isArray(result)
                    ? result
                    : result?.data || [];
            }

            if (activityResponse.ok) {
                const result = await activityResponse.json();
                activityData = Array.isArray(result)
                    ? result
                    : result?.data || [];
            }

            setProject(projectData);
            setTasks(tasksData);

            setActivities(
                activityData.filter(
                    (activity) =>
                        String(activity.projectId) === String(id)
                )
            );
        } catch (err) {
            console.log(err);
            setError(err.message || "Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && id) {
            loadProject();
        }
    }, [token, id]);

    const openEditDialog = () => {
        setEditName(project?.name || "");
        setEditDescription(project?.description || "");
        setEditStatus(project?.status || "PLANNING");
        setEditPriority(project?.priority || "MEDIUM");
        setEditProgress(project?.progress || 0);
        setEditDueDate(
            project?.dueDate
                ? new Date(project.dueDate)
                    .toISOString()
                    .split("T")[0]
                : ""
        );
        setEditOpen(true);
    };

    const updateProject = async () => {
        try {
            setSaving(true);

            const response = await fetch(
                `${API_URL}/api/projects/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: editName.trim(),
                        description: editDescription.trim(),
                        status: editStatus,
                        priority: editPriority,
                        progress: Number(editProgress),
                        dueDate: editDueDate || null,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result?.message || "Failed to update project");
                return;
            }

            setEditOpen(false);
            await loadProject();
        } catch (err) {
            console.log(err);
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async () => {
        try {
            setDeleting(true);

            const response = await fetch(
                `${API_URL}/api/projects/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result?.message || "Failed to delete project");
                return;
            }

            navigate("/main");
        } catch (err) {
            console.log(err);
        } finally {
            setDeleting(false);
        }
    };

    const createTask = async () => {
        if (!taskTitle.trim()) {
            return;
        }

        try {
            setTaskSaving(true);

            const response = await fetch(`${API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: taskTitle.trim(),
                    description: taskDescription.trim(),
                    status: taskStatus,
                    priority: taskPriority,
                    dueDate: taskDueDate || null,
                    projectId: id,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result?.message || "Failed to create task");
                return;
            }

            setTaskTitle("");
            setTaskDescription("");
            setTaskStatus("TODO");
            setTaskPriority("MEDIUM");
            setTaskDueDate("");
            setTaskOpen(false);

            await loadProject();
        } catch (err) {
            console.log(err);
        } finally {
            setTaskSaving(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(
                `${API_URL}/api/tasks/${taskId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                await loadProject();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const completeTask = async (taskId) => {
        try {
            const response = await fetch(
                `${API_URL}/api/tasks/${taskId}/complete`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                await loadProject();
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <Page>
                <Box
                    sx={{
                        minHeight: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress sx={{ color: "#ff751f" }} />
                </Box>
            </Page>
        );
    }

    if (error || !project) {
        return (
            <Page>
                <BackButton onClick={() => navigate("/main")}>
                    <ArrowBackIcon />
                    Back
                </BackButton>

                <MainCard>
                    <Typography color="error">
                        {error || "Project not found"}
                    </Typography>
                </MainCard>
            </Page>
        );
    }

    const progress = Math.min(
        100,
        Math.max(0, Number(project.progress) || 0)
    );

    return (
        <Page>
            <TopBar>
                <BackButton onClick={() => navigate("/main")}>
                    <ArrowBackIcon />
                    Back to Dashboard
                </BackButton>

                <Actions>
                    <ActionButton onClick={openEditDialog}>
                        <EditOutlinedIcon fontSize="small" />
                        Edit
                    </ActionButton>

                    <DeleteButton onClick={() => setDeleteOpen(true)}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </DeleteButton>
                </Actions>
            </TopBar>

            <MainCard>
                <Header>
                    <TitleBox>
                        <Title>{project.name}</Title>

                        <Description>
                            {project.description || "No description"}
                        </Description>
                    </TitleBox>

                    <Badges>
                        <Badge
                            $type={
                                project.priority === "URGENT"
                                    ? "urgent"
                                    : "normal"
                            }
                        >
                            {priorityText(project.priority)}
                        </Badge>

                        <Badge
                            $type={
                                project.status === "IN_PROGRESS"
                                    ? "progress"
                                    : "normal"
                            }
                        >
                            {statusText(project.status)}
                        </Badge>
                    </Badges>
                </Header>

                <InfoGrid>
                    <InfoCard>
                        <InfoLabel>Status</InfoLabel>
                        <InfoValue>
                            {statusText(project.status)}
                        </InfoValue>
                    </InfoCard>

                    <InfoCard>
                        <InfoLabel>Priority</InfoLabel>
                        <InfoValue>
                            {priorityText(project.priority)}
                        </InfoValue>
                    </InfoCard>

                    <InfoCard>
                        <InfoValue>
                            {formatDate(project.dueDate)}
                        </InfoValue>
                    </InfoCard>

                    <InfoCard>
                        <InfoLabel>Created</InfoLabel>
                        <InfoValue>
                            {formatDate(project.createdAt)}
                        </InfoValue>
                    </InfoCard>
                </InfoGrid>

                <ProgressSection>
                    <ProgressHeader>
                        <InfoValue>Project Progress</InfoValue>
                        <InfoValue>{progress}%</InfoValue>
                    </ProgressHeader>

                    <ProgressBar>
                        <ProgressFill $value={progress} />
                    </ProgressBar>
                </ProgressSection>
            </MainCard>

            <SectionCard>
                <SectionTop>
                    <SectionTitle>Tasks</SectionTitle>

                    <AddTaskButton onClick={() => setTaskOpen(true)}>
                        <AddIcon fontSize="small" />
                        Add Task
                    </AddTaskButton>
                </SectionTop>

                {tasks.length === 0 ? (
                    <Empty>
                        No tasks in this project yet.
                    </Empty>
                ) : (
                    <TaskList>
                        {tasks.map((task) => (
                            <TaskItem key={task.id}>
                                <TaskLeft>
                                    <TaskIcon $done={task.status === "DONE"}>
                                        {task.status === "DONE" ? (
                                            <TaskAltOutlinedIcon />
                                        ) : (
                                            <TaskAltOutlinedIcon />
                                        )}
                                    </TaskIcon>

                                    <TaskContent>
                                        <TaskTitle>{task.title}</TaskTitle>

                                        <TaskMeta>
                                            <span>
                                                {task.status}
                                            </span>

                                            <span>
                                                {task.priority}
                                            </span>

                                            {task.dueDate && (
                                                <span>
                                                    <CalendarTodayOutlinedIcon
                                                        sx={{
                                                            fontSize: 11,
                                                            verticalAlign: "middle",
                                                            mr: 0.3,
                                                        }}
                                                    />
                                                    {formatDate(task.dueDate)}
                                                </span>
                                            )}

                                            {task.assignedTo?.name && (
                                                <span>
                                                    {task.assignedTo.name}
                                                </span>
                                            )}
                                        </TaskMeta>
                                    </TaskContent>
                                </TaskLeft>

                                <TaskRight>
                                    {task.status !== "DONE" && (
                                        <SmallButton
                                            onClick={() =>
                                                completeTask(task.id)
                                            }
                                        >
                                            Complete
                                        </SmallButton>
                                    )}

                                    <SmallButton
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </SmallButton>
                                </TaskRight>
                            </TaskItem>
                        ))}
                    </TaskList>
                )}
            </SectionCard>

            <SectionCard>
                <SectionTop>
                    <SectionTitle>Recent Activity</SectionTitle>
                </SectionTop>

                {activities.length === 0 ? (
                    <Empty>
                        No recent activity.
                    </Empty>
                ) : (
                    <ActivityList>
                        {activities.map((activity) => (
                            <ActivityItem key={activity.id}>
                                <ActivityDot />

                                <ActivityText>
                                    <ActivityMain>
                                        <strong>
                                            {activity.user?.name || "User"}
                                        </strong>{" "}
                                        {activity.action}
                                        {activity.details
                                            ? ` ${activity.details}`
                                            : ""}
                                    </ActivityMain>

                                    <ActivityTime>
                                        {formatDateTime(activity.createdAt)}
                                    </ActivityTime>
                                </ActivityText>
                            </ActivityItem>
                        ))}
                    </ActivityList>
                )}
            </SectionCard>

            <Dialog
                open={editOpen}
                onClose={() => !saving && setEditOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Edit Project</DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            pt: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="Project Name"
                            value={editName}
                            onChange={(e) =>
                                setEditName(e.target.value)
                            }
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            value={editDescription}
                            onChange={(e) =>
                                setEditDescription(e.target.value)
                            }
                        />

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>

                            <Select
                                value={editStatus}
                                label="Status"
                                onChange={(e) =>
                                    setEditStatus(e.target.value)
                                }
                            >
                                <MenuItem value="PLANNING">
                                    Planning
                                </MenuItem>
                                <MenuItem value="IN_PROGRESS">
                                    In progress
                                </MenuItem>
                                <MenuItem value="COMPLETED">
                                    Completed
                                </MenuItem>
                                <MenuItem value="ON_HOLD">
                                    On hold
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>

                            <Select
                                value={editPriority}
                                label="Priority"
                                onChange={(e) =>
                                    setEditPriority(e.target.value)
                                }
                            >
                                <MenuItem value="LOW">Low</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                                <MenuItem value="URGENT">Urgent</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            type="number"
                            label="Progress"
                            value={editProgress}
                            onChange={(e) =>
                                setEditProgress(e.target.value)
                            }
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
                        />

                        <TextField
                            fullWidth
                            type="date"
                            label="Due Date"
                            value={editDueDate}
                            onChange={(e) =>
                                setEditDueDate(e.target.value)
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setEditOpen(false)}
                        disabled={saving}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={updateProject}
                        disabled={saving}
                        sx={{
                            background: "#ff751f",
                            "&:hover": {
                                background: "#e56617",
                            },
                        }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteOpen}
                onClose={() => !deleting && setDeleteOpen(false)}
            >
                <DialogTitle>Delete project?</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this project?
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setDeleteOpen(false)}
                        disabled={deleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={deleteProject}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={taskOpen}
                onClose={() => !taskSaving && setTaskOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add Task</DialogTitle>

                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            pt: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="Task Title"
                            value={taskTitle}
                            onChange={(e) =>
                                setTaskTitle(e.target.value)
                            }
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            value={taskDescription}
                            onChange={(e) =>
                                setTaskDescription(e.target.value)
                            }
                        />

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>

                            <Select
                                value={taskStatus}
                                label="Status"
                                onChange={(e) =>
                                    setTaskStatus(e.target.value)
                                }
                            >
                                <MenuItem value="TODO">
                                    To do
                                </MenuItem>

                                <MenuItem value="IN_PROGRESS">
                                    In progress
                                </MenuItem>

                                <MenuItem value="IN_REVIEW">
                                    In review
                                </MenuItem>

                                <MenuItem value="DONE">
                                    Done
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>

                            <Select
                                value={taskPriority}
                                label="Priority"
                                onChange={(e) =>
                                    setTaskPriority(e.target.value)
                                }
                            >
                                <MenuItem value="LOW">Low</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                                <MenuItem value="URGENT">
                                    Urgent
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            type="date"
                            value={taskDueDate}
                            onChange={(e) =>
                                setTaskDueDate(e.target.value)
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setTaskOpen(false)}
                        disabled={taskSaving}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={createTask}
                        disabled={taskSaving}
                        sx={{
                            background: "#ff751f",
                            "&:hover": {
                                background: "#e56617",
                            },
                        }}
                    >
                        {taskSaving ? "Creating..." : "Create Task"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Page>
    );
}

export default ProjectDetails;