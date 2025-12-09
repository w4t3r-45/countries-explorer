import { Button, TextField } from "@/components/Atomic";
import { CountryCard } from "@/components/FeatureRelated/all-countries/country-card";
import { useGetAllCountries } from "@/hooks/api/useCountries";
import { MAX_PER_PAGE } from "@/utils/constants";

import { changeLanguage } from "@/utils/i18n";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export const AllCountriesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { t } = useTranslation();

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Button
          text={t("English")}
          onPress={() => changeLanguage("en")}
          testID="btn-en"
        />
        <Button
          text={t("Spanish")}
          onPress={() => changeLanguage("es")}
          testID="btn-es"
        />
      </View>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
        {t("countries_explorer")}
      </Text>

      {/* SEARCH FIELD */}
      <TextField
        onChangeText={handleSearchChange}
        value={searchText}
        label={t("search_by_name")}
        placeholder={t("search_placeholder")}
        testID="search-input"
      />

      {/* LOADING OVERLAY (does not unmount component) */}
      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" testID="loading-indicator" />
        </View>
      )}

      {/* ERROR MESSAGE (still keep screen mounted) */}
      {isError && (
        <View
          style={{ marginTop: 20, alignItems: "center", gap: 20 }}
          testID="error-message"
        >
          <Text>{t("error")}</Text>
          <Button
            text={t("retry")}
            onPress={() => refetch()}
            disabled={isLoading}
            testID="retry-btn"
          />
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
              {t("no_results")}
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
                  text={t("previous")}
                  disabled={currentPage === 0}
                  onPress={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                  testID="btn-previous"
                />

                <Button
                  text={t("next")}
                  onPress={() => setCurrentPage((p) => p + 1)}
                  testID="btn-next"
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
        keyExtractor={(item) => item.name.common}
      />
    </View>
  );
};
