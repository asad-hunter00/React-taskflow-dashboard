import {
  Dashboard,
  Folder,
  CheckBox,
  CalendarMonth,
  Tag,
  Groups,
  Settings,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router";

const SidebarBox = styled.aside`
  width: 260px;
  min-width: 260px;
  min-height: 100vh;
  background: rgb(240, 239, 235);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 220px;
    min-width: 220px;
    padding: 24px 14px;
  }

  @media (max-width: 700px) {
    width: 75px;
    min-width: 75px;
    padding: 24px 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  @media (max-width: 700px) {
    justify-content: center;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const StyledSpan = styled.span`
  font-size: 20px;
  font-family: sans-serif;
  font-weight: 600;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;

  p {
    font-size: 14px;
    color: #555;
    margin: 0 0 12px;
  }

  @media (max-width: 700px) {
    p {
      display: none;
    }
  }
`;

const Item = styled.div`
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  color: ${({ active }) => (active ? "#3d3834" : "#777")};
  background: ${({ active }) => (active ? "#fff" : "transparent")};
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 6px;
  transition: 0.2s;

  &:hover {
    background: #fff;
  }

  svg {
    font-size: 22px;
  }

  @media (max-width: 700px) {
    justify-content: center;
    padding: 0;

    span {
      display: none;
    }
  }
`;

const Bottom = styled.div`
  margin-top: auto;
`;

function Sidebar() {
  return (
    <SidebarBox>
      <Logo>
        <img src="/src/img/taskflow.png" alt="Taskflow" />
        <StyledSpan>TaskFlow</StyledSpan>
      </Logo>

      <Section>
        <p>General</p>

       <Link to="/main" style={{ textDecoration: "none", color: "inherit" }}>
         <Item>
           <Dashboard />
           <span>Dashboard</span>
         </Item>
       </Link>

        <Link to="/projects" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Folder />

            <span>Projects</span>

          </Item>
        </Link>

        <Item>
          <CheckBox />
          <span>My Tasks</span>
        </Item>

        <Item>
          <CalendarMonth />
          <span>Calendar</span>
        </Item>
      </Section>

      <Section>
        <p>All Channels</p>

        <Item>
          <Tag />
          <span>General</span>
        </Item>
      </Section>

      <Bottom>
        <Item>
          <Groups />
          <span>Team</span>
        </Item>

        <Item>
          <Settings />
          <span>Setting</span>
        </Item>
      </Bottom>
    </SidebarBox>
  );
}

export default Sidebar;