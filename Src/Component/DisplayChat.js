import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../Services/Auth/Auth";

export const DisplayChat = ({ matchedUser, navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <TouchableOpacity>
      {/* <Image source={{ uri: `${matchedUser.users.photo}` }} /> */}
      <Text>hiiiiiiiii</Text>
    </TouchableOpacity>
  );
};
export default DisplayChat;
