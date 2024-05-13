import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
  query Country($code: String!) {
    country(code: $code) {
      name
      id
      emoji
      continent {
        name
      }
      code
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      emoji
      code
    }
  }
`;

export const LIST_CONTINENTS = gql`
  query Continents {
    continents {
      name
      id
    }
  }
`;
