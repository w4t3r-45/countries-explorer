import { Button, TextField } from "@/components/Atomic";
import { CountryCard } from "@/components/FeatureRelated/all-countries/country-card";
import { useGetAllCountries } from "@/hooks/api/useCountries";
import { MAX_PER_PAGE } from "@/utils/constants";

import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export const AllCountriesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedValue(value);
        setCurrentPage(0); // reset pagination on new search
      }, 500),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const { data, isLoading, isFetching, isError, refetch } = useGetAllCountries(
    currentPage,
    MAX_PER_PAGE,
    debouncedValue
  );

  return (
    <View style={{ flex: 1, marginHorizontal: 16, paddingTop: 16 }}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
        Countries Explorer
      </Text>

      {/* SEARCH FIELD */}
      <TextField
        onChangeText={handleSearchChange}
        value={searchText}
        label="Search by Name"
        placeholder="Algeria..."
      />

      {/* LOADING OVERLAY (does not unmount component) */}
      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* ERROR MESSAGE (still keep screen mounted) */}
      {isError && (
        <View style={{ marginTop: 20, alignItems: "center", gap: 20 }}>
          <Text>Error loading data</Text>
          <Button text="Retry" onPress={() => refetch()} disabled={isLoading} />
        </View>
      )}

      {/* LIST */}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CountryCard country={item} />}
        ListEmptyComponent={() =>
          !isLoading && !isFetching ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No results found
            </Text>
          ) : null
        }
        ListFooterComponent={() => (
          <>
            <View style={{ paddingVertical: 20 }}>
              {/* PAGINATION */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Button
                  text="Previous"
                  disabled={currentPage === 0}
                  onPress={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                />

                <Button
                  text="Next"
                  onPress={() => setCurrentPage((p) => p + 1)}
                />
              </View>
            </View>

            {/* spacing item */}
            <View
              style={{
                height: 30,
                width: "100%",
              }}
            />
          </>
        )}
      />
    </View>
  );
};
