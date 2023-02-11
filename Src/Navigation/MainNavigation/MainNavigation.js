import React,{useContext,useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountNavigation } from "../AccountNavigation/AccountNavigation";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import { AuthContext } from "../../Services/Auth/Auth";

export const MainNavigation = () => {
  const {user,setUser}=useContext(AuthContext)

 
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);



return user? <AppNavigation/> : <AccountNavigation/>;
};
