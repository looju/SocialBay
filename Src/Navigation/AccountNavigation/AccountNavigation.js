import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from './../../Features/Screens/LoginScreen';

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
