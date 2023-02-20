import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Services/Auth/Auth";
import { GetMatchedUserInfo } from "../Lib/GetMatchedUserInfo";

export const DisplayChat = ({ matchedUser, navigation }) => {
  const { user } = useContext(AuthContext);
  const [matchedUserInfo, setMatchedUserInfo] = useState([]);

  useEffect(() => {
    setMatchedUserInfo(GetMatchedUserInfo(matchedUser.user, user.user.uid));
  }, [matchedUser, user]);

  return (
    <TouchableOpacity>
      {/* <Image source={{ uri: `${matchedUser.users.photo}` }} /> */}
      <Text>hiiiiiiiii</Text>
    </TouchableOpacity>
  );
};
