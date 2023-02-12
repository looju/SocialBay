import React, { useContext, useEffect, useState } from "react";
import { AccountNavigation } from "../AccountNavigation/AccountNavigation";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { AuthContext } from "../../Services/Auth/Auth";


export const MainNavigation = () => {
  const [user,setUser]=useState(null)


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;   
    } catch (e) {
      console.log("problem loading user data" + e);
    }
  };


  useEffect(() => {
    getData();
  }, []);

 
  return user ? <AppNavigation /> : <AccountNavigation />;
};
