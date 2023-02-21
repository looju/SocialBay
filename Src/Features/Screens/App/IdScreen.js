import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const IdScreen = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("userId", userId);
      setLoading(false);
      navigation.navigate("VideoCallScreen");
    } catch (error) {
      console.log("Error saving userId" + error);
    }
  };

  return (
    <View>
      <Text>IdScreen</Text>
    </View>
  );
};
