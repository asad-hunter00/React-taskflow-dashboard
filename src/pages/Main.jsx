import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardOverview from "../components/DashboardView.jsx";
import styled from "styled-components";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: #ffffff;
  border-top-left-radius: 30px;
`;

const Content = styled.main`
  flex: 1;
  min-width: 0;
`;

const Dashboard = styled.div`
  padding: 24px 28px;
`;

function Main() {
  return (
    <Page>
      <Sidebar />

      <Content>
        <Header />

        <Dashboard>
          <DashboardOverview />
        </Dashboard>
      </Content>
    </Page>
  );
}

export default Main;
