import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QuotesProvider } from "../hooks/useQuotes";
import { theme } from "../theme/theme";

function CustomHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getHeaderTitle = () => {
    if (pathname === "/") return "Discover";
    if (pathname === "/favorites") return "Favorites";
    if (pathname === "/categories") return "Categories";
    if (pathname.includes("/quote/")) return "Quote";
    return "Quote Generator";
  };

  const title = getHeaderTitle();
  const showBackButton = pathname.includes("/quote/");

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, showBackButton && styles.headerTitleWithBack]}>
          {title}
        </Text>
        <View style={styles.headerRight} />
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <QuotesProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" backgroundColor={theme.colors.neutrals.white} />
          <CustomHeader />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.colors.neutrals.gray50,
              },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="quote/[id]" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </QuotesProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.white,
  },
  header: {
    backgroundColor: theme.colors.neutrals.white,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutrals.gray200,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.scales.md,
    height: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 28,
    color: theme.colors.neutrals.gray900,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    letterSpacing: 0.5,
  },
  headerTitleWithBack: {
    flex: 1,
    textAlign: "center",
    marginLeft: -40,
  },
  headerRight: {
    width: 40,
  },
});