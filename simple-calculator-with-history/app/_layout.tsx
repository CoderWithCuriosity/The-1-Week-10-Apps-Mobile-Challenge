import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import { usePathname } from "expo-router";

function AppHeader() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/": "OCHEX LEARN JAVASCRIPT",
    "/levels": "Learning Levels",
  };

  // Fallback for dynamic routes
  let title = titles[pathname] ?? "OCHEX";

  if (pathname.startsWith("/levels/")) title = "Level Details";
  if (pathname.startsWith("/lesson/")) title = "Lesson";
  if (pathname.startsWith("/quiz/")) title = "Quiz";

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />

        {/* Custom Header */}
        <AppHeader />
        
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F8F9FA",
            },
          }}
        >
          <Stack.Screen name="index" />
          
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  header: {
    height: 60,
    backgroundColor: "#4A6FA5",
    justifyContent: "flex-end",
    paddingBottom: 16,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});