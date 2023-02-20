import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ChatList } from "../../../Component/ChatList";

export const ChatScreen = () => {
  return (
    <View style={Styles.container}>
      <ChatList />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
