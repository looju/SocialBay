import React,{useContext} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountNavigation } from "../AccountNavigation/AccountNavigation";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { AuthContext } from "../../Services/Auth/Auth";

export const MainNavigation = () => {
  const {user}=useContext(AuthContext)

return !user? <AppNavigation/> : <AccountNavigation/>;
};
