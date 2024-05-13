import { Country } from "@/types/graphql";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";
type Props = {
  country: Country;
};
const Container = styled.div`
  display: flex;
  border: 1px gray solid;
  flex-direction: column;
  aligns-items: center;
  justify-content: center;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border-radius: 4px;

  cursor: pointer;
`;
const CountryItem = ({ country }: Props): ReactNode => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/country/${country.code}`)}>
      <span style={{ fontSize: "1.5rem" }}>{country.emoji}</span>
      <span>{country.name}</span>
    </Container>
  );
};

export default CountryItem;
