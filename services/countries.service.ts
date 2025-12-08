import { baseApiClient } from "./base-api-client";

export const getCountries = async () => {
  const response = await baseApiClient.get("/all");
  return response.data;
};

export const getCountryByName = async (countryName: string) => {
  const response = await baseApiClient.get(`/name/${countryName}`);
  return response.data;
};
