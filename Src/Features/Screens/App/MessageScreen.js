import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { GetMatchedUserInfo } from "./../../../Lib/GetMatchedUserInfo";
import { AuthContext } from "../../../Services/Auth/Auth";
import { Header } from "../../../Component/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const MessageScreen = ({ route, navigation }) => {
  const { matchedUser } = route.params;
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const sendMessage = () => {};

  return (
    <View>
      <Header
        navigation={navigation}
        title={GetMatchedUserInfo(matchedUser.users, user.user.uid).name}
        callEnabled={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Styles.container}
        keyboardVerticalOffset={10}
      >
        <View style={Styles.inputView}>
          <TextInput
            style={Styles.messageInput}
            placeholder="Send a message..."
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={() => sendMessage()}
          />
          <MaterialCommunityIcons
            color="#FF5864"
            size={30}
            name="send"
            onPress={() => sendMessage()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderColor: "#808080",
  },
  messageInput: {
    height: 10,
  },
});
