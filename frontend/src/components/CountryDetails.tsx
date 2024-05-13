import { GET_COUNTRY_DETAILS } from "@/graphql/client";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CountryDetails = () => {
  const router = useRouter();
  const [getCountry, { data, error, loading }] =
    useLazyQuery(GET_COUNTRY_DETAILS);
  useEffect(() => {
    getCountry({
      variables: {
        code: router.query.code,
      },
    });
  }, [router.query.code]);
  useEffect(() => {}, []);

  return data && <div>CountryDetails : {data.country.name}</div>;
};

export default CountryDetails;
