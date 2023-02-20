import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Services/Auth/Auth";
import { collection, doc, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../Services/Config/Config";

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




  return (
    matches.length>0?(
      <FlatList
      data={matches}
      keyExtractor={item=>item.id}
      renderItem={(item) => <DisplayChat matchedUser={item}/>}
    />
    ):(
      <View>

      </View>
    )
   
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
