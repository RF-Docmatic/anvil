import styled from "styled-components";
import { rfLogoLight } from "../../../../assets/images";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ff6b6b;
  display: grid;
  place-items: center;
`;

export const Logo = styled.img.attrs({
  src: rfLogoLight,
})`
  width: 500px;
`;

export const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  color: #ededed;
  max-width: 700px;
  margin-top: 2em;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
`;
