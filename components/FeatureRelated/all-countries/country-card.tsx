import { Country } from "@/types/types";
import { router } from "expo-router";
import React, { FC, memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CountryCardProps = {
  country: Country;
};

const CountryCardComponent: FC<CountryCardProps> = ({ country }) => {
  const { name, flags, capital, population, region } = country;

  // Memoize capital (array → string)
  const capitalText = useMemo(() => capital?.join(", "), [capital]);

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.navigate(`/country/${name.common}`)}
    >
      <Image
        source={{ uri: flags.png }}
        style={styles.flag}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name.common}</Text>

        <Text style={styles.label}>
          Capital: <Text style={styles.value}>{capitalText}</Text>
        </Text>

        <Text style={styles.label}>
          Population:{" "}
          <Text style={styles.value}>{population.toLocaleString()}</Text>
        </Text>

        <Text style={styles.label}>
          Region: <Text style={styles.value}>{region}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

export const CountryCard = memo(CountryCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  flag: {
    width: 90,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  label: {
    fontSize: 14,
    color: "#555",
  },

  value: {
    fontWeight: "600",
    color: "#000",
  },
});
