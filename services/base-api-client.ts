import axios from "axios";

export const baseApiClient = axios.create({
  // this should be from env
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});
