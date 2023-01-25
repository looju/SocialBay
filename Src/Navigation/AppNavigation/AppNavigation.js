import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../Features/Screens/HomeScreen";
import { ChatScreen } from "../../Features/Screens/ChatScreen";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};