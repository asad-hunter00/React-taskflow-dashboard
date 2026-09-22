import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: sans-serif;
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
  font-family: sans-serif;

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
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #8a8a8a;
`;

const StatChange = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: 700;
  color: ${({ $positive }) => ($positive ? "#1a9c5c" : "#e0433a")};

  svg {
    font-size: 13px;
  }
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
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 18px;
  background: white;
`;

const ProjectTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ProjectDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #9a9a9a;

  svg {
    font-size: 15px;
  }
`;

const StatusBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  color: ${({ $tone }) =>
        $tone === "urgent" ? "#e0433a" : $tone === "progress" ? "#6a4fd9" : "#c9781a"};
  background: ${({ $tone }) =>
        $tone === "urgent" ? "#fbe6e5" : $tone === "progress" ? "#ece8fb" : "#fbedd9"};
`;

const ProjectTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
`;

const ProjectDesc = styled.p`
  font-size: 13px;
  color: #9a9a9a;
  line-height: 1.5;
  margin: 0 0 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 6px;
  background: #f1f1f1;
  margin-bottom: 6px;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 6px;
  background: #ff6b1a;
  width: ${({ $value }) => `${$value}%`};
`;

const ProgressLabel = styled.div`
  text-align: right;
  font-size: 11px;
  color: #9a9a9a;
  margin-bottom: 16px;
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const Avatars = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  border: 2px solid white;
  margin-left: -8px;
  background: ${({ $color }) => $color};

  &:first-child {
    margin-left: 0;
  }
`;

const AvatarMore = styled(Avatar)`
  background: #f1f1f1;
  color: #8a8a8a;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #8a8a8a;
  background: #f5f5f5;
  padding: 4px 10px;
  border-radius: 20px;
`;

const TableWrapper = styled.div`
  border: 1px solid #ececec;
  border-radius: 16px;
  overflow-x: auto;
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

const PriorityPill = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  color: ${({ $tone }) => ($tone === "progress" ? "#6a4fd9" : "#c9781a")};
  background: ${({ $tone }) => ($tone === "progress" ? "#ece8fb" : "#fbedd9")};
`;

const stats = [
    {
        label: "Active Projects",
        value: "32",
        change: "+16%",
        positive: true,
        previous: "10 last week",
        icon: <FolderCopyOutlinedIcon />,
        gradient: "linear-gradient(135deg, #eaf1ff 0%, #f3eefc 100%)",
    },
    {
        label: "Tasks Due Today",
        value: "14",
        change: "-12%",
        positive: false,
        previous: "15 last week",
        icon: <AccessTimeOutlinedIcon />,
        gradient: "linear-gradient(135deg, #e9f3fb 0%, #eef6f2 100%)",
    },
    {
        label: "Completed Tasks",
        value: "50+",
        change: "+16%",
        positive: true,
        previous: "10 last week",
        icon: <TaskAltOutlinedIcon />,
        gradient: "linear-gradient(135deg, #eefaf1 0%, #fdf6e8 100%)",
    },
    {
        label: "Active Tasks",
        value: "13",
        change: "+12%",
        positive: true,
        previous: "10 last week",
        icon: <BoltOutlinedIcon />,
        gradient: "linear-gradient(135deg, #fdeef1 0%, #fdf0e6 100%)",
    },
];

const projects = [
    {
        id: 1,
        date: "Today, 12 May",
        status: "Medium",
        tone: "medium",
        title: "Product Redesign",
        description: "Discuss with UX Designer to develop the concept...",
        progress: 90,
        tags: ["UI", "Design"],
        avatars: [
            { initials: "AL", color: "#f28b82" },
            { initials: "MK", color: "#7c9ef0" },
        ],
        more: "+16",
    },
    {
        id: 2,
        date: "Today, 12 May",
        status: "In progress",
        tone: "progress",
        title: "Mobile App Beta",
        description: "Migrate all services to REST API v3 with improved...",
        progress: 60,
        tags: ["Design", "Development"],
        avatars: [
            { initials: "SD", color: "#f6b26b" },
            { initials: "RT", color: "#8a8a8a" },
        ],
        more: "+10",
    },
    {
        id: 3,
        date: "Monday, 12 Mar",
        status: "Urgent",
        tone: "urgent",
        title: "Marketing Site",
        description: "Rebuild marketing site with better SEO and conv...",
        progress: 80,
        tags: ["UI", "Marketing"],
        avatars: [
            { initials: "JD", color: "#6fa8dc" },
            { initials: "PB", color: "#e06666" },
        ],
        more: "+15",
    },
];

const activity = [
    {
        id: 1,
        user: "John Doe",
        color: "#6fa8dc",
        action: "has a deadline tomorrow for",
        task: "Social media content plan",
        project: "Marketing Campaign",
        priority: "Medium",
        tone: "medium",
        time: "Just now",
    },
    {
        id: 2,
        user: "Sarah Smith",
        color: "#e06666",
        action: "started working on",
        task: "Design homepage mockup",
        project: "Website Redesign",
        priority: "In progress",
        tone: "progress",
        time: "2d ago",
    },
    {
        id: 3,
        user: "Sarah Smith",
        color: "#e06666",
        action: "started working on",
        task: "Design homepage mockup",
        project: "Website Redesign",
        priority: "In progress",
        tone: "progress",
        time: "2d ago",
    },
];

function initials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function DashboardOverview() {
    return (
        <Wrapper>
            <TopRow>
                <div>
                    <Welcome>Welcome back, John!</Welcome>
                    <Subtitle>Here's what's happening with your projects today.</Subtitle>
                </div>

                <NewProjectButton type="button">
                    <AddIcon />
                    New Project
                </NewProjectButton>
            </TopRow>

            <StatsGrid>
                {stats.map((stat) => (
                    <StatCard key={stat.label} $gradient={stat.gradient}>
                        <StatHeader>
                            {stat.icon}
                            {stat.label}
                        </StatHeader>

                        <StatValue>{stat.value}</StatValue>

                        <StatChangeRow>
                            <StatChange $positive={stat.positive}>
                                {stat.positive ? <NorthEastIcon /> : <SouthEastIcon />}
                                {stat.change}
                            </StatChange>
                            {stat.previous}
                        </StatChangeRow>
                    </StatCard>
                ))}
            </StatsGrid>

            <SectionHeader>
                <SectionTitle>Recent Projects</SectionTitle>
                <ViewAll>View all</ViewAll>
            </SectionHeader>

            <ProjectsGrid>
                {projects.map((project) => (
                    <ProjectCard key={project.id}>
                        <ProjectTopRow>
                            <ProjectDate>
                                <CalendarTodayOutlinedIcon />
                                {project.date}
                            </ProjectDate>

                            <StatusBadge $tone={project.tone}>{project.status}</StatusBadge>
                        </ProjectTopRow>

                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDesc>{project.description}</ProjectDesc>

                        <ProgressTrack>
                            <ProgressFill $value={project.progress} />
                        </ProgressTrack>
                        <ProgressLabel>{project.progress}%</ProgressLabel>

                        <ProjectFooter>
                            <Avatars>
                                {project.avatars.map((avatar, index) => (
                                    <Avatar key={index} $color={avatar.color}>
                                        {avatar.initials}
                                    </Avatar>
                                ))}
                                <AvatarMore>{project.more}</AvatarMore>
                            </Avatars>

                            <Tags>
                                {project.tags.map((tag) => (
                                    <Tag key={tag}>#{tag}</Tag>
                                ))}
                            </Tags>
                        </ProjectFooter>
                    </ProjectCard>
                ))}
            </ProjectsGrid>

            <SectionHeader>
                <SectionTitle>Recent Activity</SectionTitle>
                <ViewAll>View all</ViewAll>
            </SectionHeader>

            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>User</Th>
                            <Th>Action</Th>
                            <Th>Task</Th>
                            <Th>Project</Th>
                            <Th>Priority</Th>
                            <Th>Time</Th>
                        </tr>
                    </thead>

                    <tbody>
                        {activity.map((row) => (
                            <tr key={row.id}>
                                <Td>
                                    <UserCell>
                                        <UserAvatar $color={row.color}>
                                            {initials(row.user)}
                                        </UserAvatar>
                                        {row.user}
                                    </UserCell>
                                </Td>
                                <Td>{row.action}</Td>
                                <Td>{row.task}</Td>
                                <Td>{row.project}</Td>
                                <Td>
                                    <PriorityPill $tone={row.tone}>{row.priority}</PriorityPill>
                                </Td>
                                <Td>{row.time}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableWrapper>
        </Wrapper>
    );
}

export default DashboardOverview;