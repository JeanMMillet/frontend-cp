import { LIST_COUNTRIES } from "@/graphql/client";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import CountryItem from "./CountryItem";
import styled from "styled-components";
import { AddCountry } from "./AddCountry";
import { Country } from "@/types/graphql";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  gap: auto;
`;

type CountryData = {
  countries: Country[];
};
const ListCountries = () => {
  const [getCountries, { data, error, loading }] =
    useLazyQuery<CountryData>(LIST_COUNTRIES);
  useEffect(() => {
    getCountries();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return (
      <div>
        An error occured while loading the data <br /> {error.message}
      </div>
    );
  }
  if (data?.countries) {
    const { countries } = data;
    return (
      <div>
        {countries.length > 0 ? (
          <Container>
            {countries.map((country) => {
              return <CountryItem country={country} key={country.code} />;
            })}
          </Container>
        ) : (
          <div>Aucun pays enregistré pour le moment</div>
        )}
        <AddCountry />
      </div>
    );
  }
};

export default ListCountries;
