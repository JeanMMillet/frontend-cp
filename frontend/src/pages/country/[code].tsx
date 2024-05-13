import { useRouter } from "next/router";
import { GET_COUNTRY_DETAILS } from "@/graphql/client";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const CountryDetails = () => {
  const router = useRouter();
  console.log("router", router.query.code);
  const [getCountry, { data, error, loading }] =
    useLazyQuery(GET_COUNTRY_DETAILS);

  useEffect(() => {
    if (router.query.code)
      getCountry({
        variables: {
          code: router.query.code,
        },
      });
  }, [router.query.code]);

  if (loading) {
    return <div>Loading data</div>;
  }
  if (error) {
    <div>
      An error occurred while loading the data <br />
      {error.message}
    </div>;
  }
  if (data) {
    return (
      data && (
        <Container>
          <span style={{ fontSize: "5rem" }}>{data.country.emoji}</span>
          <span>Name : {`${data.country.name} (${data.country.code})`}</span>
          <span>
            {data.country.continent &&
              `Continent : ${data.country.continent.name}`}
          </span>
        </Container>
      )
    );
  }
};

export default CountryDetails;
