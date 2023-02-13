import React, { useContext, useEffect, useState } from "react";
import { AccountNavigation } from "../AccountNavigation/AccountNavigation";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { AuthContext } from "../../Services/Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainNavigation = () => {
  const { user } = useContext(AuthContext);

  return user ? <AppNavigation /> : <AccountNavigation />;
};
