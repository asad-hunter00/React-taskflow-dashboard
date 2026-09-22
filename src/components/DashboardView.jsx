import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import API_URL from "../store/api";
import useAuth from "../store/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Welcome = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #8a8a8a;
  margin: 0;
`;

const NewProjectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 10px;
  background: #ff6b1a;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 18px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #e85f13;
  }

  svg {
    font-size: 18px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  border-radius: 16px;
  padding: 20px;
  background: ${({ $gradient }) => $gradient};
  border: 1px solid rgba(0, 0, 0, 0.04);
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 18px;

  svg {
    font-size: 17px;
    color: #666;
  }
`;

const StatValue = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
`;

const StatChangeRow = styled.div`
  font-size: 12px;
  color: #8a8a8a;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const ViewAll = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #8a8a8a;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #1a1a1a;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  min-height: 190px;
  padding: 18px;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  background: #ffffff;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    border-color: #e5e5e5;
  }
`;

const ProjectTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
`;

const ProjectDate = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  color: #8f8f8f;

  svg {
    font-size: 15px;
  }
`;

const StatusBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;

  color: ${({ $tone }) =>
    $tone === "urgent"
      ? "#ef5350"
      : $tone === "progress"
        ? "#6757d9"
        : "#c77a22"};

  background: ${({ $tone }) =>
    $tone === "urgent"
      ? "#fff0ef"
      : $tone === "progress"
        ? "#f1efff"
        : "#fff5e8"};
`;

const ProjectTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #252525;
  margin: 0 0 7px;
`;

const ProjectDesc = styled.p`
  font-size: 12px;
  color: #8d8d8d;
  line-height: 1.5;
  margin: 0 0 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 7px;
  border-radius: 999px;
  background: #f1f1f1;
  overflow: hidden;
  margin-top: auto;
  margin-bottom: 7px;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: #ff751f;
  width: ${({ $value }) => `${$value}%`};
`;

const ProgressBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
`;

const ProgressLabel = styled.span`
  font-size: 11px;
  color: #8f8f8f;
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`;

const AvatarMore = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #777;
  font-size: 10px;
  font-weight: 600;
  border: 2px solid #ffffff;
  margin-left: -8px;
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #777;
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding: 5px 9px;
  border-radius: 999px;
`;

const TableWrapper = styled.div`
  border: 1px solid #ececec;
  border-radius: 16px;
  overflow-x: auto;
  background: #ffffff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;
`;

const Th = styled.th`
  text-align: left;
  font-size: 12px;
  color: #9a9a9a;
  font-weight: 600;
  padding: 14px 18px;
  border-bottom: 1px solid #ececec;
  white-space: nowrap;
`;

const Td = styled.td`
  font-size: 13px;
  color: #4a4a4a;
  padding: 14px 18px;
  border-bottom: 1px solid #f2f2f2;
  white-space: nowrap;
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #1a1a1a;
`;

const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  background: ${({ $color }) => $color};
`;

const EmptyState = styled.div`
  padding: 32px 20px;
  text-align: center;
  color: #8a8a8a;
  font-size: 14px;
`;

const statusMap = {
  PLANNING: "Planning",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  ON_HOLD: "On hold",
};

const priorityMap = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

function getTodayString() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStatusTone(status) {
  if (status === "URGENT") return "urgent";
  if (status === "ON_HOLD") return "urgent";
  if (status === "IN_PROGRESS") return "progress";

  return "medium";
}

function initials(name) {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function isToday(dateStr) {
  if (!dateStr) return false;

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function formatProjectDate(dateStr) {
  if (!dateStr) return "No date";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return "No date";

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (isToday(dateStr)) {
    return `Today, ${formattedDate}`;
  }

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return `${weekday}, ${formattedDate}`;
}

function formatTime(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAvatarColor(name) {
  const colors = [
    "#6fa8dc",
    "#e06666",
    "#f6b26b",
    "#7c9ef0",
    "#1a9c5c",
  ];

  if (!name) return colors[0];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return colors[Math.abs(hash) % colors.length];
}

function getArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.projects)) return response.projects;
  if (Array.isArray(response?.tasks)) return response.tasks;
  if (Array.isArray(response?.activities)) return response.activities;

  return [];
}

function getProjectAvatars(project, user) {
  const members =
    project.members ||
    project.teamMembers ||
    project.projectMembers ||
    [];

  if (Array.isArray(members) && members.length) {
    return members
      .map((member) => member.user || member)
      .filter(Boolean)
      .slice(0, 3)
      .map((member, index) => ({
        id: member.id || index,
        name: member.name || "User",
        image:
          member.avatar ||
          member.image ||
          `https://i.pravatar.cc/80?img=${index + 12}`,
      }));
  }

  if (project.createdBy) {
    const creator =
      project.createdBy.user || project.createdBy;

    return [
      {
        id: creator.id || 1,
        name: creator.name || user?.name || "User",
        image:
          creator.avatar ||
          creator.image ||
          "https://i.pravatar.cc/80?img=12",
      },
      {
        id: "default-2",
        name: "Member",
        image: "https://i.pravatar.cc/80?img=32",
      },
    ];
  }

  return [
    {
      id: "default-1",
      name: user?.name || "User",
      image:
        user?.avatar ||
        "https://i.pravatar.cc/80?img=12",
    },
    {
      id: "default-2",
      name: "Member",
      image: "https://i.pravatar.cc/80?img=32",
    },
  ];
}

function getProjectTags(project) {
  if (Array.isArray(project.tags) && project.tags.length) {
    return project.tags.slice(0, 2);
  }

  return [
    priorityMap[project.priority] || "General",
    statusMap[project.status] || "Project",
  ].slice(0, 2);
}

function DashboardOverview() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PLANNING");
  const [priority, setPriority] = useState("MEDIUM");
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState(getTodayString());

  const loadDashboard = async () => {
    try {
      setError(false);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        projectsResponse,
        tasksResponse,
        activitiesResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/projects`, { headers }),
        fetch(`${API_URL}/api/tasks`, { headers }),
        fetch(`${API_URL}/api/activities?limit=5`, {
          headers,
        }),
      ]);

      let projectsData = [];
      let tasksData = [];
      let activitiesData = [];

      if (projectsResponse.ok) {
        const result = await projectsResponse.json();
        projectsData = getArray(result);
      }

      if (tasksResponse.ok) {
        const result = await tasksResponse.json();
        tasksData = getArray(result);
      }

      if (activitiesResponse.ok) {
        const result = await activitiesResponse.json();
        activitiesData = getArray(result);
      }

      setProjects(projectsData);
      setTasks(tasksData);
      setActivities(activitiesData);
    } catch (error) {
      console.log("Dashboard error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(true);
      return;
    }

    loadDashboard();
  }, [token]);

  const handleOpenDialog = () => {
    setName("");
    setDescription("");
    setStatus("PLANNING");
    setPriority("MEDIUM");
    setProgress(0);
    setDueDate(getTodayString());
    setFormError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (creating) return;

    setOpenDialog(false);
    setFormError("");
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    setFormError("");

    if (!name.trim()) {
      setFormError("Project name is required.");
      return;
    }

    if (!description.trim()) {
      setFormError("Description is required.");
      return;
    }

    if (!status) {
      setFormError("Status is required.");
      return;
    }

    if (!priority) {
      setFormError("Priority is required.");
      return;
    }

    if (progress === "" || progress === null) {
      setFormError("Progress is required.");
      return;
    }

    if (!dueDate) {
      setFormError("Due date is required.");
      return;
    }

    const progressNumber = Number(progress);

    if (
      Number.isNaN(progressNumber) ||
      progressNumber < 0 ||
      progressNumber > 100
    ) {
      setFormError("Progress must be between 0 and 100.");
      return;
    }

    try {
      setCreating(true);

      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          status,
          priority,
          progress: progressNumber,
          dueDate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormError(
          result?.message || "Failed to create project."
        );
        return;
      }

      setOpenDialog(false);

      setName("");
      setDescription("");
      setStatus("PLANNING");
      setPriority("MEDIUM");
      setProgress(0);
      setDueDate(getTodayString());

      await loadDashboard();
    } catch (error) {
      console.log("Create project error:", error);
      setFormError("Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#ff751f" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Box
          sx={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "#d32f2f",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Failed to load dashboard data
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              setLoading(true);
              loadDashboard();
            }}
          >
            Retry
          </Button>
        </Box>
      </Wrapper>
    );
  }

  const activeProjectsCount = projects.filter(
    (project) => project.status !== "COMPLETED"
  ).length;

  const tasksDueTodayCount = tasks.filter((task) =>
    isToday(task.dueDate)
  ).length;

  const completedTasksCount = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const activeTasksCount = tasks.filter(
    (task) => task.status !== "DONE"
  ).length;

  const stats = [
    {
      label: "Active Projects",
      value: activeProjectsCount,
      icon: <FolderCopyOutlinedIcon />,
      gradient:
        "linear-gradient(135deg, #eaf1ff 0%, #f3eefc 100%)",
    },
    {
      label: "Tasks Due Today",
      value: tasksDueTodayCount,
      icon: <AccessTimeOutlinedIcon />,
      gradient:
        "linear-gradient(135deg, #e9f3fb 0%, #eef6f2 100%)",
    },
    {
      label: "Completed Tasks",
      value: completedTasksCount,
      icon: <TaskAltOutlinedIcon />,
      gradient:
        "linear-gradient(135deg, #eefaf1 0%, #fdf6e8 100%)",
    },
    {
      label: "Active Tasks",
      value: activeTasksCount,
      icon: <BoltOutlinedIcon />,
      gradient:
        "linear-gradient(135deg, #fdeef1 0%, #fdf0e6 100%)",
    },
  ];

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 3);

  return (
    <Wrapper>
      <TopRow>
        <div>
          <Welcome>
            Welcome back, {user?.name || "User"}!
          </Welcome>

          <Subtitle>
            Here's what's happening with your projects today.
          </Subtitle>
        </div>

        <NewProjectButton
          type="button"
          onClick={handleOpenDialog}
        >
          <AddIcon />
          New Project
        </NewProjectButton>
      </TopRow>

      <StatsGrid>
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            $gradient={stat.gradient}
          >
            <StatHeader>
              {stat.icon}
              {stat.label}
            </StatHeader>

            <StatValue>{stat.value}</StatValue>

            <StatChangeRow>
              From your current data
            </StatChangeRow>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Recent Projects</SectionTitle>

        <ViewAll onClick={() => navigate("/projects")}>
          View all
        </ViewAll>
      </SectionHeader>

      {recentProjects.length === 0 ? (
        <EmptyState>
          No projects found. Click "New Project" to create one.
        </EmptyState>
      ) : (
        <ProjectsGrid>
          {recentProjects.map((project) => {
            const projectProgress = Math.min(
              100,
              Math.max(0, Number(project.progress) || 0)
            );

            const avatars = getProjectAvatars(
              project,
              user
            );

            const tags = getProjectTags(project);

            return (
              <ProjectCard
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <ProjectTopRow>
                  <ProjectDate>
                    <CalendarTodayOutlinedIcon />

                    {formatProjectDate(
                      project.createdAt
                    )}
                  </ProjectDate>

                  <StatusBadge
                    $tone={
                      project.priority === "URGENT"
                        ? "urgent"
                        : getStatusTone(project.status)
                    }
                  >
                    {priorityMap[project.priority] ||
                      statusMap[project.status] ||
                      "Project"}
                  </StatusBadge>
                </ProjectTopRow>

                <ProjectTitle>
                  {project.name}
                </ProjectTitle>

                <ProjectDesc>
                  {project.description ||
                    "No description provided."}
                </ProjectDesc>

                <ProgressTrack>
                  <ProgressFill
                    $value={projectProgress}
                  />
                </ProgressTrack>

                <ProgressBottom>
                  <ProgressLabel>
                    Progress
                  </ProgressLabel>

                  <ProgressLabel>
                    {projectProgress}%
                  </ProgressLabel>
                </ProgressBottom>

                <ProjectFooter>
                  <AvatarGroup>
                    {avatars.map((avatar) => (
                      <AvatarImage
                        key={avatar.id}
                        src={avatar.image}
                        alt={avatar.name}
                      />
                    ))}
                  </AvatarGroup>

                  <TagGroup>
                    {tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </TagGroup>
                </ProjectFooter>
              </ProjectCard>
            );
          })}
        </ProjectsGrid>
      )}

      <SectionHeader>
        <SectionTitle>Recent Activity</SectionTitle>
      </SectionHeader>

      <TableWrapper>
        {activities.length === 0 ? (
          <EmptyState>
            No recent activity found.
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>User</Th>
                <Th>Action</Th>
                <Th>Details</Th>
                <Th>Time</Th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <Td>
                    <UserCell>
                      <UserAvatar
                        $color={getAvatarColor(
                          activity.user?.name
                        )}
                      >
                        {initials(
                          activity.user?.name || "User"
                        )}
                      </UserAvatar>

                      {activity.user?.name || "User"}
                    </UserCell>
                  </Td>

                  <Td>{activity.action}</Td>
                  <Td>{activity.details}</Td>

                  <Td>
                    {formatTime(activity.createdAt)}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Create New Project
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="form"
            id="project-form"
            noValidate
            onSubmit={handleCreateProject}
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
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <TextField
              fullWidth
              required
              multiline
              rows={3}
              label="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                required
                onChange={(e) =>
                  setStatus(e.target.value)
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

            <FormControl fullWidth required>
              <InputLabel>Priority</InputLabel>

              <Select
                value={priority}
                label="Priority"
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                required
              >
                <MenuItem value="LOW">
                  Low
                </MenuItem>

                <MenuItem value="MEDIUM">
                  Medium
                </MenuItem>

                <MenuItem value="HIGH">
                  High
                </MenuItem>

                <MenuItem value="URGENT">
                  Urgent
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              type="number"
              label="Progress"
              value={progress}
              onChange={(e) =>
                setProgress(e.target.value)
              }
              inputProps={{
                min: 0,
                max: 100,
              }}
            />

            <TextField
              fullWidth
              required
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          {formError && (
            <Typography
              sx={{
                color: "#d32f2f",
                fontSize: 14,
                mt: 2,
              }}
            >
              {formError}
            </Typography>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            disabled={creating}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="project-form"
            variant="contained"
            disabled={creating}
            sx={{
              background: "#ff6b1a",
              "&:hover": {
                background: "#e85f13",
              },
            }}
          >
            {creating
              ? "Creating..."
              : "Create Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
}

export default DashboardOverview;