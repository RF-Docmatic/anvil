import React from "react";
import { Container, Logo, CenterSection, Title } from "./styles";

const InitialScreen: React.FC = () => {
  return (
    <Container>
      <CenterSection>
        <Logo />
        <Title>Create Random Forest App</Title>
      </CenterSection>
    </Container>
  );
};

export default InitialScreen;
