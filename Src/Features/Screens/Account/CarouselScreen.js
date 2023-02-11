import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../../Services/Auth/Auth";
import React, { useRef, useEffect, useContext } from "react";

export const CarouselScreen = ({ navigation }) => {
 
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/people2.jpg")}
      resizeMode="cover"
    >
      <View style={styles.iconView}>
        <Image
          source={require("../../../../assets/icon.jpg")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Sign in and connect</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    top: Dimensions.get("screen").height * 0.75,
    backgroundColor: "#ff5349",
    height: 60,
    width: Dimensions.get("screen").width,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Carousel: {
    marginTop: Dimensions.get("screen").height * 0.15,
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  iconView: {
    backgroundColor: "rgba(255,255,255)",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
});
