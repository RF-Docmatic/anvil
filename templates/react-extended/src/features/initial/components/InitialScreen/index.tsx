import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Logo, CenterSection, Title } from "./styles";
import { initialActions } from "../../slices";
import { Spin } from "antd";
import { RootState } from "../../../../app/types";
const InitialScreen: React.FC = () => {
  const dispatch = useDispatch();
  const randomFactText = useSelector((state: RootState) => state.initial.randomFactText);
  const isRandomFactFetching = useSelector((state: RootState) => state.initial.isRandomFactFetching);

  useEffect(() => {
    dispatch(initialActions.fetchRandomFactStart());
  }, [dispatch]);

  return (
    <Container>
      <CenterSection>
        <Logo />
        <Spin tip="Loading..." spinning={isRandomFactFetching}>
          <Title>{randomFactText}</Title>
        </Spin>
      </CenterSection>
    </Container>
  );
};

export default InitialScreen;
