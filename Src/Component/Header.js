import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";

export const Header = ({ title, callEnabled }) => {
  return (
    <View style={Styles.header}>
      <Text>Header</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:10
  },
});
