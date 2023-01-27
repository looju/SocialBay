import React, { useState, createContext } from "react";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../Config/Config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [code, setCode] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const sendVerification = async (number) => {
    const applicationVerifier =  new RecaptchaVerifier();
    const phoneProvider =  PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      number,
      applicationVerifier
    );
    setVerificationId(verificationId);
  };

  const confirmCode = async (code) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    setUser(userCredential);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        phoneNumber,
        inputCode,
        setPhoneNumber,
        setInputCode,
        sendVerification,
        confirmCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
