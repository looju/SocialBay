import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./../../Features/Screens/LoginScreen";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerTitle: () => (
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../../assets/icon.jpg")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
