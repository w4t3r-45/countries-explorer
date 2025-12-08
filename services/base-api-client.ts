import axios from "axios";

// remark : this is a very basic implementation generally here we will have header and other configurations , interceptors for refresh tokens ...

export const baseApiClient = axios.create({
  // this should be from env
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
});
