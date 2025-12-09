import { Button } from "@/components/Atomic";
import { useGetCountryByName } from "@/hooks/api/useCountries";
import { useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export const CountryDetailsScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>();

  const { data, isError, isLoading, refetch } = useGetCountryByName(id);

  const country = data?.[0];

  return (
    <ScrollView
      style={{ flex: 1, marginHorizontal: 16, paddingTop: 16 }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}>
        Country Details
      </Text>

      {/* LOADING */}
      {isLoading && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* ERROR */}
      {isError && (
        <View style={{ marginTop: 20, alignItems: "center", gap: 20 }}>
          <Text>Error loading data</Text>
          <Button text="Retry" onPress={() => refetch()} disabled={isLoading} />
        </View>
      )}

      {/* SUCCESS — SHOW DETAILS */}
      {country && (
        <View style={{ gap: 16 }}>
          {/* FLAG */}
          <Image
            source={{ uri: country.flags.png }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              marginBottom: 20,
            }}
            resizeMode="cover"
          />

          {/* NAME */}
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {country.name.common}
          </Text>

          {/* CAPITAL */}
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Capital:</Text>{" "}
            {country.capital[0]}
          </Text>

          {/* REGION */}
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Region:</Text> {country.region}
          </Text>

          {/* POPULATION */}
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: "bold" }}>Population:</Text>{" "}
            {country.population.toLocaleString()}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
