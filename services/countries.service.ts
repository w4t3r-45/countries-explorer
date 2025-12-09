import { baseApiClient } from "./base-api-client";

const ALL_COUNTRIES_FIELDS = "name,flags,capital,population,region";

export const getCountries = async () => {
  const response = await baseApiClient.get("/all", {
    params: {
      fields: ALL_COUNTRIES_FIELDS,
    },
  });
  return response.data;
};

export const getCountryByName = async (countryName: string) => {
  const response = await baseApiClient.get(`/name/${countryName}`);
  return response.data;
};
