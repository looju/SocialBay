import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export const MatchScreen = ({ route }) => {
  const { loggedInProfiles, userSwiped } = route.params;
  return (
    <View style={Styles.container}>
      <View style={Styles.headerTitle}>
        <Image source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>
      <Text style={Styles.matchText}>
        You and {userSwiped.name} have matched each other!
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,76,48,0.89)",
    paddingTop: 15,
  },
  headerTitle: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  matchText: {
    marginTop: 5,
    color: "#fff",
    textAlign: "center",
  },
});
