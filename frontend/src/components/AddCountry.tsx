import { ADD_COUNTRY, LIST_CONTINENTS } from "@/graphql/client";
import { Continent, NewCountryInput } from "@/types/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: #f7146b;
  border: none;
  border-radius: 4px;
  color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 0.5rem 1rem;
  align-items: center;
  gap: 2rem;
  border: 1px #bfbfbf solid;
  border-radius: 4px;
  background-color: #ededed;
  margin: 2rem auto 2rem auto;
  width: 80%;
  @media only screen and (min-width: 800px) {
    width: 100%;
  }
  @media only screen and (min-width: 1200px) {
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @media only screen and (min-width: 1400px) {
    width: 85%;
  }
`;
type ContinentData = {
  continents: Continent[];
};
export const AddCountry = () => {
  const router = useRouter();
  const [getContinents, { data, error, loading }] =
    useLazyQuery<ContinentData>(LIST_CONTINENTS);
  useEffect(() => {
    getContinents();
  }, []);

  const [dataForm, setDataForm] = useState<NewCountryInput>({
    name: "",
    code: "",
    emoji: "",
  });
  const [addCountry] = useMutation(ADD_COUNTRY, {
    onCompleted(data) {
      router.reload();
      resetForm();
    },
    onError(error) {
      console.log("error", error);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const resetForm = () => {
    setDataForm({
      name: "",
      code: "",
      emoji: "",
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataForm((prevState) => ({
      ...prevState,
      continent: { id: +e.target.value },
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("dataForm", dataForm);
    addCountry({
      variables: {
        data: dataForm,
      },
    });
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInputWrapper>
        <label>
          Name <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={dataForm.name}
          />
        </label>
        <label>
          Emoji <br />
          <input
            type="text"
            name="emoji"
            id="emoji"
            onChange={handleChange}
            value={dataForm.emoji}
          />
        </label>
        <label>
          Code <br />
          <input
            type="text"
            name="code"
            id="code"
            onChange={handleChange}
            value={dataForm.code}
          />
        </label>
        <label>
          Continent <br />
          <select
            name="continent"
            id="continent"
            onChange={handleSelect}
            value={dataForm.continent?.id || ""}
          >
            <option value="">- Select a continent - </option>
            {loading
              ? "Loading"
              : error
              ? "Error fetching continent"
              : data?.continents &&
                data.continents.map((continent) => {
                  return <option value={continent.id}>{continent.name}</option>;
                })}
          </select>
        </label>
      </StyledInputWrapper>

      <StyledButton type="submit">Add Country</StyledButton>
    </StyledForm>
  );
};
