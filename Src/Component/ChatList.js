import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Services/Auth/Auth";
import { collection, doc, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../Services/Config/Config";
import { DisplayChat } from "./DisplayChat";

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

console.log(matches)

  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <DisplayChat matchedUser={item} />}
      style={Styles.container}
    />
  ) : (
    <View></View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
