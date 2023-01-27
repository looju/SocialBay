import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./Src/Navigation/MainNavigation/MainNavigation";
import { AuthProvider } from "./Src/Services/Auth/Auth";

export default function App() {
  const tailwind = useTailwind();

  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
