import { StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigation } from "./Src/Navigation/MainNavigation/MainNavigation";
import { AuthProvider } from "./Src/Services/Auth/Auth";
import {
  useFonts,
  Oswald_400Regular,
  Lato_400Regular,
  Anton_400Regular,
  Griffy_400Regular,
  Tangerine_400Regular,
  Arizonia_400Regular,
  BebasNeue_400Regular
} from "@expo-google-fonts/dev";

export default function App() {
  const tailwind = useTailwind();
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Anton_400Regular,
    BebasNeue_400Regular,
    Tangerine_400Regular
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
