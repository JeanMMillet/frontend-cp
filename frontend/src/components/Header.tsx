import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  background-color: #f7146b;
  align-items: center;
  padding-bottom: 2rem;
  text-align: center;
  color: white;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Checkpoint : frontend</h1>
      <Link href="/">Countries</Link>
    </StyledHeader>
  );
}
