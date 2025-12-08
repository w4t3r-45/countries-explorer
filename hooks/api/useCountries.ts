import { getCountries, getCountryByName } from "@/services/countries.service";
import { REACT_QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCountries = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.COUNTRIES],
    queryFn: () => getCountries(),
  });
};

export const useGetCountryByName = (name: string) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.COUNTRY_BY_NAME, name],
    queryFn: () => getCountryByName(name),
    enabled: !!name,
  });
};
