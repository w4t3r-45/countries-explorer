import { TextField } from "@/components/Atomic";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("TextField", () => {
  it("renders label and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <TextField
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Enter your username")).toBeTruthy();
  });

  it("calls onChangeText when typing", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField
        placeholder="Type something"
        value=""
        onChangeText={onChangeTextMock}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Type something"), "Hello");
    expect(onChangeTextMock).toHaveBeenCalledWith("Hello");
  });

  it("shows clear button when value exists", () => {
    const { getByText } = render(
      <TextField value="Test" onChangeText={() => {}} />
    );

    expect(getByText("×")).toBeTruthy();
  });

  it("clears input when clear button is pressed", () => {
    const onChangeTextMock = jest.fn();
    const { getByText } = render(
      <TextField value="Hello" onChangeText={onChangeTextMock} />
    );

    fireEvent.press(getByText("×"));
    expect(onChangeTextMock).toHaveBeenCalledWith("");
  });

  it("does not show clear button when value is empty", () => {
    const { queryByText } = render(
      <TextField value="" onChangeText={() => {}} />
    );

    expect(queryByText("×")).toBeNull();
  });
});
