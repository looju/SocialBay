import React, { useContext, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AuthContext } from "../../../Services/Auth/Auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../Services/Config/Config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../../Services/Config/Config";

export const LoginScreen = () => {
  const { setUser, user } = useContext(AuthContext);
  const bouncyCheckboxRef = useRef(BouncyCheckbox);

  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState(null);
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const sendVerification = async (number) => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
    setMessage("A verification message has been sent to your mobile device");
  };

  const confirmCode = async (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    setUser(userCredential);
    setLoading(true);
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {}
  };

  useEffect(() => {
    storeData(user);
  }, []);

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
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {verificationId ? (
        <View>
          <View style={styles.inputView}>
            <View style={styles.message}>
              <Text style={{ fontSize: 15 }}>
                Enter the confirmation code sent to your device
              </Text>
            </View>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={(text) => setValue(text)}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="Enter the confirmation code"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View style={styles.termsView}>
            <View style={styles.tc}>
              <Text style={{ fontSize: 15 }}>
                I have read and accept the privacy policy and agree that my
                personal data would be processed
              </Text>
            </View>
            <View style={styles.checkboxView}>
              <BouncyCheckbox
                style={{
                  marginTop: 16,
                  borderColor: "#ff5349",
                  borderWidth:1
                }}
                ref={bouncyCheckboxRef}
                isChecked={agreeTerms}
                fillColor="#ff5349"
                unfillColor="#FFFFFF"
                disableBuiltInState
                bounceEffectIn={0.9}
                bounceEffectOut={1}
                bouncinessIn={40}
                onPress={() => setAgreeTerms(!agreeTerms)}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.Indicator}>
          <ActivityIndicator size={25} color={"#ff5349"} />
        </View>
      )}

      {loading && (
        <View style={styles.message}>
          <ActivityIndicator size={25} color="#ff5349" />
        </View>
      )}
      {agreeTerms && (
        <TouchableOpacity
          onPress={() => confirmCode(value)}
          style={styles.proceedButton}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}
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
  proceedButton: {
    marginTop: 50,
    backgroundColor: "#ff5349",
    height: 60,
    width: Dimensions.get("screen").width,
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
    marginVertical: 15,
  },
  messageText: {
    color: "#00FF00",
    fontSize: 15,
  },
  termsView: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  tc: {
    width: Dimensions.get("screen").width * 0.9,
    marginRight: 5,
  },
  checkboxView: {
    width: Dimensions.get("screen").width * 0.1,
  },
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
  Indicator: {
    marginTop: Dimensions.get("window").height * 0.6,
  },
});

export default LoginScreen;
