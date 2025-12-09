import { FC, memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = memo(({ text, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2F80ED",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: "#BDBDBD",
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
