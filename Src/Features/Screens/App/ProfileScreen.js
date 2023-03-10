import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../Services/Auth/Auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Services/Config/Config";

export const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(null);
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const { user } = useContext(AuthContext);

  const incompleteForm = !userName || !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "Users", user.user.uid), {
      id: user.user.uid,
      name: userName,
      photo: image,
      occupation: job,
      Age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => navigation.navigate("Home"))
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
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>
          Welcome {user._tokenResponse.phoneNumber}
        </Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputStyle}>
          <Text style={styles.dirText}> The username</Text>
          <TextInput
            placeholder="Enter a username"
            style={styles.placeholder}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            keyboardType="url"
            textAlign="center"
          />
        </View>
        <View style={styles.inputStyle}>
          <Text style={styles.dirText}>The profile pic</Text>
          <TextInput
            placeholder="Enter a photo url"
            style={styles.placeholder}
            multiline
            value={image}
            onChangeText={(text) => setImage(text)}
            keyboardType="url"
            textAlign="center"
          />
        </View>
        <View style={styles.inputStyle}>
          <View style={styles.inputTextView}>
            <Text style={styles.dirText}> The job</Text>
          </View>

          <TextInput
            placeholder="Enter your occupation"
            style={styles.placeholder}
            value={job}
            onChangeText={(text) => setJob(text)}
            keyboardType="default"
            keyboardAppearance="light"
            textAlign="center"
          />
        </View>
        <View style={styles.inputStyle}>
          <View style={styles.inputTextView}>
            <Text style={styles.dirText}>The age</Text>
          </View>

          <TextInput
            placeholder="Enter your age"
            style={styles.placeholder}
            value={age}
            onChangeText={(text) => setAge(text)}
            maxLength={2}
            keyboardType="phone-pad"
            textAlign="center"
          />
        </View>
      </View>

      <TouchableOpacity
        style={incompleteForm ? styles.disabledButton : styles.button}
        disabled={incompleteForm}
        onPress={() => updateUserProfile()}
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
  
    height: 100,
  },
  inputTextView: {
    right: 10,
  },
  dirText: {
    color: "#000",
    fontSize: 15,
  },
  placeholder: {
    width: "100%",
    height: 40,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor:"#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FF0000",
    backfaceVisibility: "hidden",
    width: Dimensions.get("screen").width * 0.7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    left: Dimensions.get("screen").width * 0.15,
    
  },
  disabledButton: {
    backgroundColor: "#808080",
    backfaceVisibility: "hidden",
    width: Dimensions.get("screen").width * 0.7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    left: Dimensions.get("screen").width * 0.15,
    
  },
  buttonText: {
    color: "#fff",
  },
  welcomeView: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 17,
    fontWeight: "300",
    textShadowColor: "#ff0",
    textShadowOffset: {
      height: 0.5,
      width: 0.9,
    },
    elevation: 5,
  },
});
