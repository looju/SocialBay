import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const IdScreen = ({navigation}) => {
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    try {
      await AsyncStorage.setItem("userId", userId);

      navigation.navigate("VideoCallScreen");
    } catch (error) {
      console.log("Error saving userId" + error);

      setErrorMessage("Oops an error occured creating that room ID");
    }
  };

  return (
    <ImageBackground
      style={styles.root}
      source={require("../../../../assets/splash.png")}
      resizeMode="cover"
      blurRadius={5}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          Create a unique room id or enter a unique room id
        </Text>
      </View>
      <View>
        <TextInput
          label="Your  ID"
          onChangeText={(text) => setUserId(text)}
          placeholder="Enter Id"
          placeholderTextColor={"#808080"}
          style={styles.input}
          mode="outlined"
          keyboardAppearance="email-address"
          autoComplete="name"
          blurOnSubmit={true}
          multiline
          selectionColor={"#FF0000"}
          textAlign="center"
        />
      </View>
      <View>
        <Button
          mode="contained"
          title="PROCEED"
          onPress={login}
          loading={userId.length === 0 ? true : false}
          style={styles.btn}
          contentStyle={styles.btnContent}
          disabled={userId.length === 0}
          buttonColor={"#fdfff5"}
          textColor="#000"
        >
          PROCEED
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 15,
  },
  heading: {
    fontSize: 15,
    marginBottom: 10,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    left: Dimensions.get("screen").width * 0.05,
    fontFamily: "Lato_400Regular",
  },
  input: {
    height: 60,
    marginBottom: 10,
    borderWidth:1,
    borderColor:"#000",
    backgroundColor: "#fdfff5",
    borderRadius:5
  },
  btn: {
    height: Dimensions.get("screen").height * 0.07,
    width: Dimensions.get("screen").width * 0.8,
    alignItems: "stretch",
    top: 10,
    justifyContent: "center",
    left: Dimensions.get("screen").width * 0.1,
    borderWidth:1,
    borderColor:"#ff0000"
  },
  btnContent: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: Dimensions.get("screen").width * 0.8,
  },
});
