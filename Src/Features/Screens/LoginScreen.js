import React, { useContext, useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { AuthContext } from "../../Services/Auth/Auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../Services/Config/Config";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../Services/Config/Config";

export const LoginScreen = () => {
  // const {
  //   error,
  //   phoneNumber,
  //   setPhoneNumber,
  //   inputCode,
  //   setInputCode,
  //   sendVerification,
  //   confirmCode,
  // } = useContext(AuthContext);

  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [loading,setLoading]=useState(null)
  const [verificationId, setVerificationId] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const sendVerification = async (number) => {

    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
    setLoading(true)
  };

  const confirmCode = async (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    setUser(userCredential);
    setMessage("A verification message has been sent to your mobile device");
    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <View style={styles.number}>
        <Text style={styles.numberText}>Your phone number</Text>
      </View>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter your Phone Number"
          placeholderTextColor="#fff"
          style={styles.numberInput}
          onChangeText={(value) => setPhoneNumber(value)}
          keyboardType="phone-pad"
          autoComplete="tel"
          textAlign="center"
        />
        <TouchableOpacity
          onPress={() => sendVerification(phoneNumber)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
      </View>
      {message && (
        <View style={styles.message}>
          <Text style={styles.messageText}>hi</Text>
        </View>
      )}

      <View style={styles.inputView}>
        <TextInput
          placeholder="Enter the Confirmation Code"
          style={styles.numberInput}
          onChangeText={(value) => setInputCode(value)}
          keyboardType="number-pad"
          textAlign="center"
          multiline
          placeholderTextColor="#fff"
        />
      </View>
      <TouchableOpacity onPress={() => confirmCode(inputCode)}>
        <Text>Send Verification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inputView: {
    marginVertical: 30,
  },
  number: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 20,
    fontWeight: "800",
  },
  numberInput: {
    marginTop: 20,
    fontSize: 17,
    backgroundColor: "#808080",
    height: 60,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff5349",
    height: 40,
    width: 250,
    left: Dimensions.get("screen").width * 0.2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  message: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    color: "#00FF00",
    fontSize: 15,
  },
});

export default LoginScreen;
