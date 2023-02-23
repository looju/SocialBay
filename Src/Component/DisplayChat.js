import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Services/Auth/Auth";
import { GetMatchedUserInfo } from "../Lib/GetMatchedUserInfo";

export const DisplayChat = ({ matchedUser, navigation }) => {
  const { user } = useContext(AuthContext);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(GetMatchedUserInfo(matchedUser.users, user.user.uid));
  }, [matchedUser, user]);

  console.log(matchedUserInfo);

  return (
    <TouchableOpacity style={Styles.userOverview}>
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          marginRight: 4,
        }}
        source={{ uri: matchedUserInfo?.photo }}
      />
      <View>
        <Text style={Styles.userNameText}>{matchedUser?.name}</Text>
        <Text>{lastMessage || "Say hi "}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  userOverview: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    marginTop: 10,
    marginBottom: 20,
    height: 60,
    width: "100%",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 2,
  },
  userNameText:{
    fontSize:15,
    fontWeight:"bold"
  }
});
