import React, { PropsWithChildren } from "react";
import styled from "styled-components";
const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-inline: 2rem;
  @media only screen and (min-width: 768px) {
    padding-inline: 10rem;
  }
`;
export const Layout = ({ children }: PropsWithChildren) => {
  return <StyledDiv>{children}</StyledDiv>;
};
