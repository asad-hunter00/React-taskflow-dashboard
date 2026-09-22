import {
    Search,
    NotificationsNone,
    ForumOutlined,
} from "@mui/icons-material";
import styled from "styled-components";

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

const HeaderButton = styled.div`
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

  svg {
    font-size: 20px;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

function Header() {
    return (
        <HeaderBox>
            <SearchBox>
                <Search />
                <input placeholder="Search" />
            </SearchBox>

            <HeaderButton>
                <NotificationsNone />
            </HeaderButton>

            <HeaderButton>
                <ForumOutlined />
            </HeaderButton>

            <Avatar
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
            />
        </HeaderBox>
    );
}

export default Header;