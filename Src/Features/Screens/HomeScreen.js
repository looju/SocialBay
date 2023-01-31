import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-deck-swiper"

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageView}>
          <Image
            style={styles.image}
            source={require("../../../assets/sample.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../../../assets/icon.jpg")}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatLogoView}>
          <MaterialCommunityIcons size={35} color="#000" name="wechat" />
        </TouchableOpacity>
      </View>

      <Swiper/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: Dimensions.get("screen").height * 0.1,
  },
  imageView: {
    backgroundColor: "#000",
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  logoView: {
    height: 90,
    width: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  chatLogoView: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
