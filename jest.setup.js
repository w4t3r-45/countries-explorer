// Mock AsyncStorage
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo", () => ({}));

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useGlobalSearchParams: jest.fn(() => ({})),
  useLocalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  Link: ({ children }) => children,
}));

jest.mock("i18next", () => {
  return {
    use: jest.fn().mockReturnThis(), // allows chaining use().use()
    init: jest.fn(),
    t: (key) => key,
    changeLanguage: jest.fn(),
  };
});

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
}));

jest.mock("expo/src/winter/ImportMetaRegistry", () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (object) => JSON.parse(JSON.stringify(object));
}
