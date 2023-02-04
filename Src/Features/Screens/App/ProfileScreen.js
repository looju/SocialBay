import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
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
        <Text style={styles.dirText}>Step 1: The profile pic</Text>
        <TextInput placeholder="Enter a photo url" style={styles.placeholder} />
      </View>
      <View style={styles.inputStyle}>
        <Text style={styles.dirText}>Step 2: The job</Text>
        <TextInput
          placeholder="Enter your occupation"
          style={styles.placeholder}
        />
      </View>
      <View style={styles.inputStyle}>
        <Text style={styles.dirText}>Step 3:The age</Text>
        <TextInput placeholder="Enter your age" style={styles.placeholder} />
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
    fontSize: 20,
    fontWeight: "900",
  },
  textView: {
    right: 15,
  },
  inputStyle: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
  },
  dirText: {
    color: "#FF0000",
    fontSize: 15,
  },
  placeholder: {
    width: "100%",
    height: 70,
    alignItems: "center",
    left: Dimensions.get("screen").width * 0.35,
  },
});
