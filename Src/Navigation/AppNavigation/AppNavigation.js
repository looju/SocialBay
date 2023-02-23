import React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../Features/Screens/App/HomeScreen";
import { ChatScreen } from "../../Features/Screens/App/ChatScreen";
import { ProfileScreen } from "../../Features/Screens/App/ProfileScreen";
import { MatchScreen } from "../../Features/Screens/App/MatchScreen";
import { MessageScreen } from "../../Features/Screens/App/MessageScreen";
import { IdScreen } from "../../Features/Screens/App/IdScreen";
import { VideoCallScreen } from "../../Features/Screens/App/VideoCallScreen";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

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
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerBackImage: () => (
            <Image
              source={require("../../../assets/backarrow.png")}
              style={{ height: 25, width: 25, right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{
         headerShown:false
        }}
      />
      <Stack.Screen
        name="IdScreen"
        component={IdScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
    </Stack.Navigator>
  );
};
