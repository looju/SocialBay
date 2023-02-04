import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../../assets/icon.jpg")}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyles}>Socialbay</Text>
        </View>
      </View>
      <View style={styles.inputStyle}>
        <Text style={styles.dirText}>hii</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    heigth: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  textStyles: {
    fontFamily: " BebasNeue_400Regular",
    fontSize:20,
    fontWeight:"900",
  },
  inputStyle:{
    backgroundColor:"#ff0",
    alignItems:"center",

  }
});
