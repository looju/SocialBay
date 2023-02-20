import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot, where } from "firebase/firestore";

export const ChatList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("userMatched", "array-contains", user.user.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, []);

  return (
    <View style={Styles.container}>
      <Text>ChatList</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
