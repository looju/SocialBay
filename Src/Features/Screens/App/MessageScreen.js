import { View, Text } from "react-native";
import React from "react";
import { GetMatchedUserInfo } from "./../../../Lib/GetMatchedUserInfo";

export const MessageScreen = ({ route }) => {
  const { matchedUser } = route.params;

  return (
    <View>
      <Text>MessageScreen</Text>
    </View>
  );
};
