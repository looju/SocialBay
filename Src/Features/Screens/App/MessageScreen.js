import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { ReceiverMessage } from "../../../Component/ReceiverMessage";
import { SenderMessage } from "../../../Component/SenderMessage";
import React, { useContext, useState } from "react";
import { GetMatchedUserInfo } from "./../../../Lib/GetMatchedUserInfo";
import { AuthContext } from "../../../Services/Auth/Auth";
import { Header } from "../../../Component/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Services/Config/Config";

export const MessageScreen = ({ route, navigation }) => {
  const { matchedUser } = route.params; // recall that matchedUser is an array that contains the user matched object values
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");

  const sendMessage = async () => {
    await addDoc(collection(db, "Matches", matchedUser.id, "Messages"), {
      timeStamp: serverTimestamp(),
      userId: user.user.uid,
      userPhoneNumber: user._tokenResponse.phoneNumber,
      photoURL:matchedUser.users[user.user.uid].photo
    });
  };

  return (
    <View style={Styles.container}>
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            style={Styles.messageList}
            renderItem={({ item: message }) =>
              message.userId === user.user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

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
    border: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderColor: "#808080",
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 10,
  },
  messageList: {},
});
