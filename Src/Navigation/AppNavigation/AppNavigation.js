import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../Features/Screens/App/HomeScreen";
import { ChatScreen } from "../../Features/Screens/App/ChatScreen";
import { ProfileScreen } from "../../Features/Screens/App/ProfileScreen";
import { MatchScreen } from "../../Features/Screens/App/MatchScreen";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Chat" component={ChatScreen} />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ presentation: "modal", headerShown: false }}
      />

      <Stack.Screen
        name="MatchScreen"
        component={MatchScreen}
        options={{ presentation: "transparentModal", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
