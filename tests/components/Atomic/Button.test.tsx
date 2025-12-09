import { Button } from "@/components/Atomic";
import { fireEvent, render } from "@testing-library/react-native";

describe("Button", () => {
  it("renders correctly with text", () => {
    const { getByText } = render(<Button text="Click me" onPress={() => {}} />);
    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button text="Click me" onPress={onPressMock} />
    );
    fireEvent.press(getByTestId("button-pressable"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button text="Click me" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByTestId("button-pressable"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
