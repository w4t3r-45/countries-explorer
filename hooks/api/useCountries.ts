import { getCountries, getCountryByName } from "@/services/countries.service";
import { Country } from "@/types/types";
import { REACT_QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCountries = (
  page: number,
  pageSize: number,
  search: string
) => {
  return useQuery<Country[], Error>({
    queryKey: [REACT_QUERY_KEYS.COUNTRIES, search, page],
    queryFn: getCountries,

    select: (data) => {
      const filtered = search
        ? data.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
        : data;

      const start = page * pageSize;
      const end = start + pageSize;

      return filtered.slice(start, end);
    },
  });
};

export const useGetCountryByName = (name: string) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.COUNTRY_BY_NAME, name],
    queryFn: () => getCountryByName(name),
    enabled: !!name,
  });
};
