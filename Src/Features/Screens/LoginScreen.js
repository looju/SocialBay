import React, { useContext,useRef,useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../../Services/Auth/Auth";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from "../../Services/Config/Config";
import {
  PhoneAuthProvider,
} from "firebase/auth";
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
  const [recaptcha, setRecaptcha] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [message,setMessage]=useState(null)

  const sendVerification = async (number) => {
    const phoneProvider =  new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
  };

  const confirmCode = async (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    setUser(userCredential);
    setMessage("A verification message has been sent to your mobile device")
  };




  return (
    <View>
      <Text>LoginScreen</Text>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification
      />
      <TextInput
        placeholder="Phone Number"
        style={{ marginVertical: 10, fontSize: 17 }}
        onChangeText={(value) => setPhoneNumber(value)}
        keyboardType="phone-pad"
        autoCompleteType="tel"
      />
      <TouchableOpacity onPress={()=>sendVerification(phoneNumber)}>
        <Text>Send Verification</Text>
      </TouchableOpacity>
      {/* Verification Code Input */}
      <TextInput
        placeholder="Confirmation Code"
        style={{ marginVertical: 10, fontSize: 17 }}
        onChangeText={(value) => setInputCode(value)}
        keyboardType="number-pad"
      />
      <TouchableOpacity onPress={() => confirmCode(inputCode)}>
        <Text>Send Verification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
