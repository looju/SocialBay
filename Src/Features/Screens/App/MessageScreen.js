import { View, Text, TextInput } from "react-native";
import React, { useContext } from "react";
import { GetMatchedUserInfo } from "./../../../Lib/GetMatchedUserInfo";
import { AuthContext } from "../../../Services/Auth/Auth";
import { Header } from "../../../Component/Header";

export const MessageScreen = ({ route, navigation }) => {
  const { matchedUser } = route.params;
  const { user } = useContext(AuthContext);

  return (
    <View>
      <Header
        navigation={navigation}
        title={GetMatchedUserInfo(matchedUser.users, user.user.uid).name}
        callEnabled={true}
      />
      <Text>MessageScreen</Text>
    </View>
  );
};
