import styled from "styled-components";

const Page = styled.div`
  min-height: 100vh;
  background: #f5f7fb;
  padding: 40px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #111827;
`;

const Text = styled.p`
  color: #6b7280;
`;

function Main() {
  return (
    <Page>
      <Container>
        <Title>Welcome to Taskflow 👋</Title>
        <Text>Manage your tasks, projects and team in one place.</Text>
      </Container>
    </Page>
  );
}

export default Main;