import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./Src/Navigation/MainNavigation/MainNavigation";

export default function App() {
  const tailwind = useTailwind();

  return (
    <NavigationContainer>
      <MainNavigation />
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
