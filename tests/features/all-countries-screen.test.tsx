import { AllCountriesScreen } from "@/screens/all-countries";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

jest.mock("@/hooks/api/useCountries", () => ({
  useGetAllCountries: jest.fn(),
}));

import { useGetAllCountries } from "@/hooks/api/useCountries";

describe("AllCountriesScreen", () => {
  it("renders loading indicator", () => {
    (useGetAllCountries as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isFetching: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<AllCountriesScreen />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders error message and retry button", () => {
    const refetchMock = jest.fn();
    (useGetAllCountries as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: true,
      refetch: refetchMock,
    });

    const { getByTestId } = render(<AllCountriesScreen />);
    expect(getByTestId("error-message")).toBeTruthy();

    fireEvent.press(getByTestId("retry-btn"));
    expect(refetchMock).toHaveBeenCalled();
  });

  it("renders country cards and pagination buttons", () => {
    const countries = [
      {
        name: { common: "Algeria" },
        flags: { png: "" },
        capital: ["Algiers"],
        population: 100,
        region: "Africa",
      },
      {
        name: { common: "Spain" },
        flags: { png: "" },
        capital: ["Madrid"],
        population: 200,
        region: "Europe",
      },
    ];

    (useGetAllCountries as jest.Mock).mockReturnValue({
      data: countries,
      isLoading: false,
      isFetching: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(<AllCountriesScreen />);

    expect(getByTestId("country-card-Algeria")).toBeTruthy();
    expect(getByTestId("country-card-Spain")).toBeTruthy();

    fireEvent.press(getByTestId("btn-next"));
    fireEvent.press(getByTestId("btn-previous"));
  });

  it("switches languages", () => {
    const { getByTestId } = render(<AllCountriesScreen />);

    fireEvent.press(getByTestId("btn-en"));
    fireEvent.press(getByTestId("btn-es"));
  });
});
