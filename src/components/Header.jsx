import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  Search,
  ForumOutlined,
} from "@mui/icons-material";
import Notifications from "./Notifications";
import API_URL from "../store/api";
import useAuth from "../store/useAuth";

const HeaderBox = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 24px;
  background: rgb(240, 239, 235);
  box-sizing: border-box;

  @media (max-width: 700px) {
    height: 70px;
    padding: 0 14px;
    gap: 10px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchBox = styled.div`
  width: 310px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  color: #777;
  box-sizing: border-box;
  background: #ffffff;

  input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 900px) {
    width: 240px;
  }

  @media (max-width: 700px) {
    width: 150px;
  }

  @media (max-width: 500px) {
    width: 40px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;

    input {
      display: none;
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  min-width: 280px;
  max-height: 340px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  box-sizing: border-box;
  padding: 8px 0;

  @media (max-width: 700px) {
    right: 0;
    left: auto;
  }
`;

const DropdownSection = styled.div`
  padding: 4px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const DropdownSectionTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  padding: 6px 14px 4px;
  letter-spacing: 0.5px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  cursor: pointer;
  gap: 8px;

  &:hover {
    background: #f7f7f7;
  }
`;

const ItemTitle = styled.span`
  font-size: 13px;
  color: #1a1a1a;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemStatus = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #666;
  background: #f1f1f1;
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const DropdownMessage = styled.div`
  padding: 14px;
  font-size: 13px;
  color: #8a8a8a;
  text-align: center;
`;

const HeaderButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  flex-shrink: 0;
  background: #ffffff;

  svg {
    font-size: 20px;
  }

  &:hover {
    background: #f8f8f8;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const statusMap = {
  PLANNING: "Planning",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  ON_HOLD: "On hold",
  TODO: "To do",
  IN_REVIEW: "In review",
  DONE: "Done",
};

function formatStatus(status) {
  return statusMap[status] || status || "";
}

function getArray(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.projects)) return res.projects;
  if (Array.isArray(res?.tasks)) return res.tasks;
  return [];
}

function Header() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setProjects([]);
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      Promise.all([
        fetch(
          `${API_URL}/api/projects?search=${encodeURIComponent(
            query.trim()
          )}`,
          { headers }
        ),
        fetch(
          `${API_URL}/api/tasks?search=${encodeURIComponent(
            query.trim()
          )}`,
          { headers }
        ),
      ])
        .then(async ([projectsRes, tasksRes]) => {
          if (!projectsRes.ok || !tasksRes.ok) {
            throw new Error("Search failed");
          }

          const [projectsData, tasksData] =
            await Promise.all([
              projectsRes.json(),
              tasksRes.json(),
            ]);

          setProjects(getArray(projectsData));
          setTasks(getArray(tasksData));
          setLoading(false);
        })
        .catch(() => {
          setProjects([]);
          setTasks([]);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const hasResults =
    projects.length > 0 || tasks.length > 0;

  const showDropdown =
    isOpen && query.trim().length > 0;

  const avatarSrc =
    user?.avatar ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <HeaderBox>
      <SearchWrapper ref={searchRef}>
        <SearchBox
          onClick={() => setIsOpen(true)}
        >
          <Search />

          <input
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </SearchBox>

        {showDropdown && (
          <Dropdown>
            {loading && (
              <DropdownMessage>
                Loading...
              </DropdownMessage>
            )}

            {!loading && !hasResults && (
              <DropdownMessage>
                No results found
              </DropdownMessage>
            )}

            {!loading && hasResults && (
              <>
                {projects.length > 0 && (
                  <DropdownSection>
                    <DropdownSectionTitle>
                      Projects
                    </DropdownSectionTitle>

                    {projects.map(
                      (project) => (
                        <DropdownItem
                          key={project.id}
                          onClick={() => {
                            navigate(
                              `/projects/${project.id}`
                            );
                            setIsOpen(false);
                          }}
                        >
                          <ItemTitle>
                            {
                              project.name
                            }
                          </ItemTitle>

                          <ItemStatus>
                            {formatStatus(
                              project.status
                            )}
                          </ItemStatus>
                        </DropdownItem>
                      )
                    )}
                  </DropdownSection>
                )}

                {tasks.length > 0 && (
                  <DropdownSection>
                    <DropdownSectionTitle>
                      Tasks
                    </DropdownSectionTitle>

                    {tasks.map((task) => (
                      <DropdownItem
                        key={task.id}
                        onClick={() => {
                          navigate(
                            `/tasks/${task.id}`
                          );
                          setIsOpen(false);
                        }}
                      >
                        <ItemTitle>
                          {task.title}
                        </ItemTitle>

                        <ItemStatus>
                          {formatStatus(
                            task.status
                          )}
                        </ItemStatus>
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                )}
              </>
            )}
          </Dropdown>
        )}
      </SearchWrapper>

      <Notifications />

      <HeaderButton
        onClick={() => navigate("/messages")}
      >
        <ForumOutlined />
      </HeaderButton>

      <Avatar
        src={avatarSrc}
        alt={user?.name || "Profile"}
        onClick={() => navigate("/profile")}
      />
    </HeaderBox>
  );
}

export default Header;