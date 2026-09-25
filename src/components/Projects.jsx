import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API_URL from "../store/api";
import useAuth from "../store/useAuth";

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  background: rgb(255, 255, 255);
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
`;

const Content = styled.div`
  padding: 28px;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  margin: 0 0 5px;
  font-size: 24px;
  color: #1a1a1a;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #888;
  font-size: 13px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: #ff6b1a;
  color: white;
  padding: 10px 15px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e85f13;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #ececec;
  margin-bottom: 24px;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  padding: 10px 0;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#ff6b1a" : "#9a9a9a")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#ff6b1a" : "transparent")};

  &:hover {
    color: ${({ $active }) => ($active ? "#ff6b1a" : "#555")};
  }

  svg {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  background: white;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 20px 20px 18px;
  padding-top: 24px;
  cursor: pointer;
  transition: 0.2s;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ $tone }) =>
    $tone === "urgent" ? "#e0433a" : $tone === "medium" ? "#f6a623" : "#6a4fd9"};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
`;

const ProjectName = styled.h2`
  margin: 0;
  font-size: 17px;
  color: #222;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`;

const Status = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 5px 9px;
  border-radius: 20px;
  background: #f5f5f5;
  color: #777;
  white-space: nowrap;
`;

const PriorityBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 5px 9px;
  border-radius: 20px;
  white-space: nowrap;
  color: ${({ $tone }) =>
    $tone === "urgent" ? "#e0433a" : $tone === "medium" ? "#c9781a" : "#6a4fd9"};
  background: ${({ $tone }) =>
    $tone === "urgent" ? "#fbe6e5" : $tone === "medium" ? "#fbedd9" : "#ece8fb"};
`;

const Description = styled.p`
  margin: 0 0 18px;
  color: #888;
  font-size: 12px;
  line-height: 1.5;
  min-height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #999;
  font-size: 11px;

  svg {
    font-size: 14px;
  }
`;

const ProgressBox = styled.div`
  margin-top: 16px;
`;

const ProgressTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 11px;
  color: #888;
`;

const Progress = styled.div`
  width: 100%;
  height: 6px;
  background: #eeeeee;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressValue = styled.div`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: #ff6b1a;
  border-radius: 10px;
`;

const TableWrapper = styled.div`
  border: 1px solid #ececec;
  border-radius: 16px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
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

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const ProjectCell = styled.div`
  font-weight: 600;
  color: #1a1a1a;
`;

const State = styled.div`
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const ModalBox = styled.div`
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 18px;
  padding: 24px 26px;
  box-sizing: border-box;
`;

const ModalTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #9a9a9a;
  cursor: pointer;
  display: flex;

  &:hover {
    color: #222;
  }
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
`;

const FieldGroup = styled.div`
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const inputStyle = `
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  font-family: sans-serif;
  background: white;

  &:focus {
    border-color: #ff6b1a;
  }
`;

const TextInput = styled.input`
  ${inputStyle}
  height: 42px;
`;

const TextArea = styled.textarea`
  ${inputStyle}
  padding: 10px 12px;
  height: 80px;
  resize: none;
  font-family: sans-serif;
`;

const Select = styled.select`
  ${inputStyle}
  height: 42px;
  color: ${({ value }) => (value ? "#1a1a1a" : "#999")};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
`;

const CancelButton = styled.button`
  border: 1px solid #e2e2e2;
  background: white;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: #ff6b1a;
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e85f13;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: 16px;
  }
`;

const FormError = styled.p`
  color: #e0433a;
  font-size: 12px;
  margin: -6px 0 14px;
`;

function formatStatus(status) {
  const statuses = {
    PLANNING: "Planning",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    ON_HOLD: "On hold",
  };

  return statuses[status] || status || "Planning";
}

function formatPriority(priority) {
  const map = { LOW: "Low", MEDIUM: "Medium", HIGH: "High", URGENT: "Urgent" };
  return map[priority] || "No priority";
}

function priorityTone(priority) {
  if (priority === "URGENT" || priority === "HIGH") return "urgent";
  if (priority === "MEDIUM") return "medium";
  return "progress";
}

function formatDate(date) {
  if (!date) return "No due date";

  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const emptyForm = {
  name: "",
  description: "",
  status: "PLANNING",
  priority: "",
  dueDate: "",
};

function Projects() {
  const navigate = useNavigate();
  const token = useAuth((state) => state.token);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("board");

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/api/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        setProjects(result.data ?? result ?? []);
      })
      .catch(() => {
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const openModal = () => {
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError("");
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormError("Project name is required");
      return;
    }

    setCreating(true);
    setFormError("");

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
          status: form.status,
          priority: form.priority || undefined,
          dueDate: form.dueDate || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormError(result.message || "Failed to create project");
        return;
      }

      const createdProject = result.data ?? result;
      setProjects((prev) => [createdProject, ...prev]);
      setModalOpen(false);
      setForm(emptyForm);
    } catch {
      setFormError("Server bilan bog'lanishda xatolik");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout>
      <Sidebar />

      <Main>
        <Header />

        <Content>
          <Top>
            <div>
              <Title>Projects</Title>
              <Subtitle>Manage and track all your projects</Subtitle>
            </div>

            <AddButton type="button" onClick={openModal}>
              <AddIcon fontSize="small" />
              New Project
            </AddButton>
          </Top>

          <Tabs>
            <Tab $active={activeTab === "board"} onClick={() => setActiveTab("board")}>
              <ViewKanbanOutlinedIcon />
              Board
            </Tab>
            <Tab $active={activeTab === "list"} onClick={() => setActiveTab("list")}>
              <ListOutlinedIcon />
              List
            </Tab>
            <Tab $active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
              <HistoryOutlinedIcon />
              Activity
            </Tab>
            <Tab $active={activeTab === "files"} onClick={() => setActiveTab("files")}>
              <FolderOutlinedIcon />
              Files
            </Tab>
          </Tabs>

          {loading ? (
            <State>
              <CircularProgress sx={{ color: "#ff751f" }} fontSize="medium" />
            </State>
          ) : projects.length === 0 ? (
            <State>No projects found</State>
          ) : activeTab === "board" ? (
            <Grid>
              {projects.map((project) => (
                <Card
                  key={project.id}
                  $tone={priorityTone(project.priority)}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <CardTop>
                    <ProjectName>{project.name}</ProjectName>

                    <BadgeRow>
                      <Status>{formatStatus(project.status)}</Status>
                    </BadgeRow>
                  </CardTop>

                  <Description>{project.description || "No project description"}</Description>

                  <InfoRow>
                    <Info>
                      <CalendarTodayOutlinedIcon />
                      {formatDate(project.dueDate)}
                    </Info>

                    {project.priority && (
                      <PriorityBadge $tone={priorityTone(project.priority)}>
                        {formatPriority(project.priority)}
                      </PriorityBadge>
                    )}
                  </InfoRow>

                  <ProgressBox>
                    <ProgressTop>
                      <span>Progress</span>
                      <span>{project.progress || 0}%</span>
                    </ProgressTop>

                    <Progress>
                      <ProgressValue value={project.progress || 0} />
                    </Progress>
                  </ProgressBox>
                </Card>
              ))}
            </Grid>
          ) : activeTab === "list" ? (
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Project</Th>
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>Due Date</Th>
                    <Th>Progress</Th>
                    <Th>Tasks</Th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <TableRow key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                      <Td>
                        <ProjectCell>{project.name}</ProjectCell>
                      </Td>
                      <Td>
                        <Status>{formatStatus(project.status)}</Status>
                      </Td>
                      <Td>
                        {project.priority ? (
                          <PriorityBadge $tone={priorityTone(project.priority)}>
                            {formatPriority(project.priority)}
                          </PriorityBadge>
                        ) : (
                          "-"
                        )}
                      </Td>
                      <Td>{formatDate(project.dueDate)}</Td>
                      <Td>{project.progress || 0}%</Td>
                      <Td>
                        <Info>
                          <TaskAltOutlinedIcon />
                          {project.tasksCount || 0}
                        </Info>
                      </Td>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          ) : (
            <State>This section is coming soon.</State>
          )}
        </Content>
      </Main>

      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTopRow>
              <ModalTitle>New Project</ModalTitle>
              <CloseButton type="button" onClick={closeModal}>
                <CloseIcon />
              </CloseButton>
            </ModalTopRow>

            <form onSubmit={handleCreateProject}>
              <FieldGroup>
                <FieldLabel>Project Name</FieldLabel>
                <TextInput
                  placeholder="Type the project name"
                  value={form.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Description</FieldLabel>
                <TextArea
                  placeholder="Short project description"
                  value={form.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />
              </FieldGroup>

              <Row>
                <FieldGroup>
                  <FieldLabel>Status</FieldLabel>
                  <Select value={form.status} onChange={(e) => handleFieldChange("status", e.target.value)}>
                    <option value="PLANNING">Planning</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On hold</option>
                  </Select>
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Priority</FieldLabel>
                  <Select value={form.priority} onChange={(e) => handleFieldChange("priority", e.target.value)}>
                    <option value="">Add priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </Select>
                </FieldGroup>
              </Row>

              <FieldGroup>
                <FieldLabel>Due Date</FieldLabel>
                <TextInput
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                />
              </FieldGroup>

              {formError && <FormError>{formError}</FormError>}

              <ModalFooter>
                <CancelButton type="button" onClick={closeModal}>
                  Cancel
                </CancelButton>

                <SubmitButton type="submit" disabled={creating}>
                  {creating ? (
                    <CircularProgress size={16} sx={{ color: "white" }} />
                  ) : (
                    <>
                      <AddIcon />
                      Create Project
                    </>
                  )}
                </SubmitButton>
              </ModalFooter>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}
    </Layout>
  );
}

export default Projects;