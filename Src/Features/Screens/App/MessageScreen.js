import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { GetMatchedUserInfo } from "./../../../Lib/GetMatchedUserInfo";
import { AuthContext } from "../../../Services/Auth/Auth";
import { Header } from "../../../Component/Header";

export const MessageScreen = ({ route, navigation }) => {
  const { matchedUser } = route.params;
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");

  return (
    <View>
      <Header
        navigation={navigation}
        title={GetMatchedUserInfo(matchedUser.users, user.user.uid).name}
        callEnabled={true}
      />
      <Text>MessageScreen</Text>
      <View>
        <TextInput
          style={Styles.messageInput}
          placeholder="Send a message..."
          value={input}
          onChangeText={(text) => setInput(text)}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  messageInput: {
    height: 10,
  },
});
