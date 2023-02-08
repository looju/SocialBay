import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Services/Config/Config";

export const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "Users", user.uid), {
      id: user.uid,
      photo: image,
      occupation: job,
      Age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => navigation.goBack())
      .catch((error) =>
        console.log(
          "Problem updating user profile at ProfileScreen.js: " + error
        )
      );
  };

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
      <View style={styles.inputView}>
        <View style={styles.inputStyle}>
          <Text style={styles.dirText}>Step 1: The profile pic</Text>
          <TextInput
            placeholder="Enter a photo url"
            style={styles.placeholder}
            value={image}
            onChangeText={(text) => setImage(text)}
            keyboardType="url"
          />
        </View>
        <View style={styles.inputStyle}>
          <View style={styles.inputTextView}>
            <Text style={styles.dirText}>Step 2: The job</Text>
          </View>

          <TextInput
            placeholder="Enter your occupation"
            style={styles.placeholder}
            value={job}
            onChangeText={(text) => setJob(text)}
            keyboardType="default"
            keyboardAppearance="light"
          />
        </View>
        <View style={styles.inputStyle}>
          <View style={styles.inputTextView}>
            <Text style={styles.dirText}>Step 3:The age</Text>
          </View>

          <TextInput
            placeholder="Enter your age"
            style={styles.placeholder}
            value={age}
            onChangeText={(text) => setAge(text)}
            maxLength={2}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <TouchableOpacity
        style={incompleteForm ? styles.disabledButton : styles.button}
        disabled={incompleteForm}
      >
        <Text style={styles.buttonText}>Update profile</Text>
      </TouchableOpacity>
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
  inputView: {
    marginTop: 20,
  },
  textView: {
    right: 15,
  },
  inputStyle: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
  },
  inputTextView: {
    right: 10,
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
  button: {
    backgroundColor: "#FF0000",
    backfaceVisibility: "hidden",
    width: Dimensions.get("screen").width * 0.7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    left: Dimensions.get("screen").width * 0.15,
    top: Dimensions.get("screen").height * 0.25,
  },
  disabledButton: {
    backgroundColor: "#808080",
    backfaceVisibility: "hidden",
    width: Dimensions.get("screen").width * 0.7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    left: Dimensions.get("screen").width * 0.15,
    top: Dimensions.get("screen").height * 0.25,
  },
  buttonText: {
    color: "#fff",
  },
});
