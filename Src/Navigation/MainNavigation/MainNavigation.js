import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountNavigation } from "../AccountNavigation/AccountNavigation";
import { AppNavigation } from "../AppNavigation/AppNavigation";

export const MainNavigation = () => {
  const user=false

return user? <AccountNavigation/> : <AppNavigation/>;
};
