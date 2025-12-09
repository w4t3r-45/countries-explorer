// i18n.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// JSON translation imports
import en from "../assets/locales/en.json";
import es from "../assets/locales/es.json";

const LANGUAGE_PERSISTENCE_KEY = "APP_LANGUAGE";

const resources = { en: { translation: en }, es: { translation: es } };

// Custom language detector
const RNLanguageDetector = {
  type: "languageDetector" as const,
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    try {
      // 1. Check cached language first
      const cachedLang = await AsyncStorage.getItem(LANGUAGE_PERSISTENCE_KEY);
      if (cachedLang) {
        callback(cachedLang);
        return;
      }

      // 2. Detect device language
      const locales = getLocales();
      const deviceLang = locales[0].languageTag.split("-")[0]; // e.g., "en-US" -> "en"
      if (resources[deviceLang as keyof typeof resources]) {
        callback(deviceLang);
        return;
      }

      // 3. Fallback
      callback("en");
    } catch (error) {
      console.warn("Language detection failed:", error);
      callback("en");
    }
  },
  cacheUserLanguage: async (lang: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lang);
    } catch (error) {
      console.warn("Failed to cache language:", error);
    }
  },
};

// Initialize i18n
i18n
  .use(RNLanguageDetector) // use our custom detector
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export const changeLanguage = async (lang: string) => {
  if (!resources[lang as keyof typeof resources]) return;
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_PERSISTENCE_KEY, lang);
};

export default i18n;
