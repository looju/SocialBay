import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Services/Auth/Auth";
import { collection, doc, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../Services/Config/Config";
import { DisplayChat } from "./DisplayChat";
import Lottie from "lottie-react-native";

export const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "Matches"),
          where("userMatched", "array-contains", user.user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),

    [user]
  );

  console.log(matches);

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <DisplayChat matchedUser={item} />}
      style={Styles.container}
    />
  ) : (
    <View style={Styles.noMatchedUser}>
      <View style={Styles.lottieTextView}>
        <Text style={Styles.lottieText}>No matches yet</Text>
      </View>
      <View>
        <Lottie
          style={Styles.lottie}
          source={require("../../assets/chat.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noMatchedUser: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  lottieTextView: {
    marginTop: Dimensions.get("screen").height * 0.05,
    marginBottom: Dimensions.get("screen").height * 0.1,
  },
  lottieText: {
    fontSize: 35,
    fontFamily: "Tangerine_400Regular",
  },
  lottie:{
    width:Dimensions.get("screen").height * 0.5,
    height:Dimensions.get("screen").height * 0.5,
  }
});
