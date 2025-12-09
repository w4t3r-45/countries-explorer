import "@/utils/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    // i18n detector will run automatically, just wait a bit
    const initI18n = async () => {
      try {
        // For safety, wait a tick to let detector cache/load
        await new Promise((resolve) => setTimeout(resolve, 50));
      } finally {
        setLoading(false);
      }
    };
    initI18n();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
