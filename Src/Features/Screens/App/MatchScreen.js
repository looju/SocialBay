import { View, Text } from "react-native";
import React from "react";

export const MatchScreen = ({ route }) => {
  const { loggedInProfiles, userSwiped } = route.params;
  return (
    <View>
      <Text>MatchScreen</Text>
    </View>
  );
};
